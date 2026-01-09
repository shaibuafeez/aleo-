import { NextRequest, NextResponse } from 'next/server';
import { LiveKitController } from '@/app/lib/livekit/controller';
import { createClient } from '@/app/lib/supabase/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: class_id } = await params;
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get class from database
    const { data, error: classError } = await supabase
      .from('classes')
      .select('*')
      .eq('id', class_id)
      .eq('id', class_id)
      .single();

    const classData = data as unknown as { status: string; livekit_room_name: string | null } | null;

    if (classError || !classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    // Check if class is live
    if (classData.status !== 'live') {
      return NextResponse.json(
        { error: 'Class is not live yet' },
        { status: 400 }
      );
    }

    if (!classData.livekit_room_name) {
      return NextResponse.json(
        { error: 'Class room not created' },
        { status: 400 }
      );
    }

    // Get user profile
    const { data: userData } = await supabase
      .from('users')
      .select('username, avatar_url')
      .eq('id', user.id)
      .single();

    const userProfile = userData as unknown as { username?: string; avatar_url?: string } | null;

    // Join LiveKit room
    const controller = new LiveKitController();
    const response = await controller.joinClass({
      room_name: classData.livekit_room_name,
      user_id: user.id,
      username: userProfile?.username || user.email || 'Anonymous',
      avatar_url: userProfile?.avatar_url,
    });

    // Create or update booking
    const { error: bookingError } = await supabase
      .from('class_bookings')
      // @ts-expect-error Supabase types mismatch
      .upsert({
        user_id: user.id,
        class_id: class_id,
        status: 'attended',
      });

    if (bookingError) {
      console.error('Error creating booking:', bookingError);
    }

    // Increment participant count
    // @ts-expect-error Supabase types mismatch
    const { error: countError } = await supabase.rpc('increment', {
      row_id: class_id,
      table_name: 'classes',
      column_name: 'participant_count',
    });

    if (countError) {
      console.error('Error updating participant count:', countError);
    }

    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error('Error joining class:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

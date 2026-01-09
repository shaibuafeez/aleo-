import { NextRequest, NextResponse } from 'next/server';
import { LiveKitController, ClassMetadata } from '@/app/lib/livekit/controller';
import { createClient } from '@/app/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { class_id } = body;

    if (!class_id) {
      return NextResponse.json(
        { error: 'class_id is required' },
        { status: 400 }
      );
    }

    // Get class from database
    const { data, error: classError } = await supabase
      .from('classes')
      .select('*')
      .eq('id', class_id)
      .eq('id', class_id)
      .single();

    const classData = data as unknown as { instructor_id: string; chat_enabled?: boolean; qa_enabled?: boolean; donations_enabled?: boolean } | null;

    if (classError || !classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    // Verify user is the instructor
    if (classData.instructor_id !== user.id) {
      return NextResponse.json(
        { error: 'Only the instructor can start the class' },
        { status: 403 }
      );
    }

    // Create LiveKit room
    const controller = new LiveKitController();
    const metadata: ClassMetadata = {
      instructor_id: user.id,
      class_id: class_id,
      chat_enabled: classData.chat_enabled ?? true,
      qa_enabled: classData.qa_enabled ?? true,
      donations_enabled: classData.donations_enabled ?? true,
    };

    const response = await controller.createClass({
      class_id,
      instructor_id: user.id,
      metadata,
    });

    // Update class in database with LiveKit room info
    const { error: updateError } = await supabase
      .from('classes')
      // @ts-expect-error Supabase types mismatch
      .update({
        livekit_room_name: response.room_name,
        livekit_metadata: metadata,
        status: 'live',
        started_at: new Date().toISOString(),
      })
      .eq('id', class_id);

    if (updateError) {
      console.error('Error updating class:', updateError);
      return NextResponse.json(
        { error: 'Failed to update class' },
        { status: 500 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error creating class:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

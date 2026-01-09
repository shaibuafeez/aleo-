import { NextRequest, NextResponse } from 'next/server';
import { LiveKitController, getSessionFromReq } from '@/app/lib/livekit/controller';
import { createClient } from '@/app/lib/supabase/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: class_id } = await params;
    const supabase = await createClient();

    // Get session from auth token
    const session = getSessionFromReq(req);

    // Get class from database
    const { data, error: classError } = await supabase
      .from('classes')
      .select('*')
      .eq('id', class_id)
      .eq('id', class_id)
      .single();

    const classData = data as unknown as { instructor_id: string; livekit_room_name: string | null } | null;

    if (classError || !classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    // Verify user is the instructor
    if (classData.instructor_id !== session.user_id) {
      return NextResponse.json(
        { error: 'Only the instructor can end the class' },
        { status: 403 }
      );
    }

    if (!classData.livekit_room_name) {
      return NextResponse.json(
        { error: 'Class room not created' },
        { status: 400 }
      );
    }

    // End LiveKit room
    const controller = new LiveKitController();
    await controller.endClass({
      user_id: session.user_id,
      class_id: session.class_id,
      room_name: classData.livekit_room_name,
    });

    // Update class in database
    const { error: updateError } = await supabase
      .from('classes')
      // @ts-expect-error Supabase types mismatch
      .update({
        status: 'completed',
        ended_at: new Date().toISOString(),
      })
      .eq('id', class_id);

    if (updateError) {
      console.error('Error updating class:', updateError);
      return NextResponse.json(
        { error: 'Failed to update class' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error ending class:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

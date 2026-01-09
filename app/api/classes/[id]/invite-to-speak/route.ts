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

    const body = await req.json();
    const { student_id } = body;

    if (!student_id) {
      return NextResponse.json(
        { error: 'student_id is required' },
        { status: 400 }
      );
    }

    // Get class from database
    const { data: classData, error: classError } = await supabase
      .from('classes')
      .select('*')
      .eq('id', class_id)
      .single();

    if (classError || !classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    if (!classData.livekit_room_name) {
      return NextResponse.json(
        { error: 'Class room not created' },
        { status: 400 }
      );
    }

    // Invite student to speak
    const controller = new LiveKitController();
    await controller.inviteToSpeak(
      {
        user_id: session.user_id,
        class_id: session.class_id,
        room_name: classData.livekit_room_name,
      },
      { student_id }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error inviting to speak:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

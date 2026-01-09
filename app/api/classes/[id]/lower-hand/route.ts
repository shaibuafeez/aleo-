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
      .select('livekit_room_name')
      .eq('id', class_id)
      .eq('id', class_id)
      .single();

    const classData = data as unknown as { livekit_room_name: string | null } | null;

    if (classError || !classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    if (!classData.livekit_room_name) {
      return NextResponse.json(
        { error: 'Class room not created' },
        { status: 400 }
      );
    }

    // Lower hand
    const controller = new LiveKitController();
    await controller.lowerHand({
      user_id: session.user_id,
      class_id: session.class_id,
      room_name: classData.livekit_room_name,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error lowering hand:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

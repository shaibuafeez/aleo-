import LessonView from '@/app/components/lessons/LessonView';
import { lesson1 } from '@/app/lib/lessons/lesson1';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // For now, we only have lesson 1
  // Later, we'll fetch from a lessons database
  const lessonMap: Record<string, any> = {
    '1': lesson1,
  };

  const lesson = lessonMap[id];

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Lesson Not Found</h1>
          <p className="text-gray-400 mb-8">This lesson doesn&apos;t exist yet!</p>
          <a
            href="/"
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return <LessonView lesson={lesson} />;
}

import Link from 'next/link';
import LessonView from '@/app/components/lessons/LessonView';
import { leoLesson1 } from '@/app/lib/lessons/leo-lesson1';
import { leoLesson2 } from '@/app/lib/lessons/leo-lesson2';
import { leoLesson3 } from '@/app/lib/lessons/leo-lesson3';
import { leoLesson4 } from '@/app/lib/lessons/leo-lesson4';
import { leoLesson5 } from '@/app/lib/lessons/leo-lesson5';
import { leoLesson6 } from '@/app/lib/lessons/leo-lesson6';
import { leoLesson7 } from '@/app/lib/lessons/leo-lesson7';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Lesson map - all Leo lessons
  const lessonMap: Record<string, typeof leoLesson1> = {
    'leo-1': leoLesson1,
    'leo-2': leoLesson2,
    'leo-3': leoLesson3,
    'leo-4': leoLesson4,
    'leo-5': leoLesson5,
    'leo-6': leoLesson6,
    'leo-7': leoLesson7,
  };

  const lesson = lessonMap[id];

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Lesson Not Found</h1>
          <p className="text-gray-400 mb-8">This lesson doesn&apos;t exist yet!</p>
          <Link
            href="/"
            className="px-6 py-3 bg-aleo-green text-aleo-navy font-bold rounded-lg hover:bg-aleo-green/90 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return <LessonView lesson={lesson} />;
}

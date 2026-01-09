import { createClient } from '@/app/lib/supabase/server';
import Link from 'next/link';
import { format } from 'date-fns';

export const metadata = {
  title: 'Live Classes - Move By Practice',
  description: 'Join live classes and learn Move programming from experienced instructors',
};

export default async function ClassesPage() {
  const supabase = await createClient();

  // Fetch all upcoming and live classes
  const { data: classes, error } = await supabase
    .from('classes')
    .select(`
      *,
      instructor:users!instructor_id (
        username,
        avatar_url
      )
    `)
    .in('status', ['scheduled', 'live'])
    .order('scheduled_at', { ascending: true });

  if (error) {
    console.error('Error fetching classes:', error);
  }

  const liveClasses = classes?.filter((c) => c.status === 'live') || [];
  const upcomingClasses = classes?.filter((c) => c.status === 'scheduled') || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-sui-navy mb-2">Live Classes</h1>
            <p className="text-sui-gray-600">
              Learn Move programming from experienced instructors in real-time
            </p>
          </div>
          <Link
            href="/classes/schedule"
            className="px-6 py-3 bg-sui-ocean hover:bg-sui-ocean-dark text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-sui-ocean/30"
          >
            Schedule a Class
          </Link>
        </div>

        {/* Live Now */}
        {liveClasses.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <h2 className="text-2xl font-bold text-sui-navy">Live Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveClasses.map((classItem) => (
                <Link
                  key={classItem.id}
                  href={`/classes/watch/${classItem.id}`}
                  className="bg-white border-2 border-sui-ocean rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-sui-ocean/30 transition-all"
                >
                  <div className="relative h-48 bg-gradient-to-br from-sui-ocean to-sui-ocean-dark flex items-center justify-center">
                    <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 rounded-full text-white text-sm font-semibold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      LIVE
                    </div>
                    <div className="text-white text-6xl">📹</div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-sui-navy mb-2">{classItem.title}</h3>
                    <p className="text-sui-gray-600 text-sm mb-4 line-clamp-2">
                      {classItem.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-sui-ocean flex items-center justify-center text-white font-semibold">
                          {(classItem.instructor as any)?.username?.[0]?.toUpperCase() || 'I'}
                        </div>
                        <span className="text-sui-gray-700">
                          {(classItem.instructor as any)?.username || 'Instructor'}
                        </span>
                      </div>
                      <span className="text-sui-gray-500">
                        {classItem.participant_count} watching
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Classes */}
        <div>
          <h2 className="text-2xl font-bold text-sui-navy mb-4">Upcoming Classes</h2>
          {upcomingClasses.length === 0 ? (
            <div className="bg-sui-navy rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-white mb-2">No upcoming classes</h3>
              <p className="text-white/70 mb-6">
                Be the first to schedule a class and share your knowledge!
              </p>
              <Link
                href="/classes/schedule"
                className="inline-block px-6 py-3 bg-sui-ocean hover:bg-sui-ocean-dark text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-sui-ocean/30"
              >
                Schedule a Class
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="bg-white border-2 border-sui-gray-200 rounded-2xl overflow-hidden hover:border-sui-ocean hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 bg-gradient-to-br from-sui-sky to-sui-mist flex items-center justify-center">
                    <div className="text-sui-ocean text-6xl">🎓</div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-sui-navy mb-2">{classItem.title}</h3>
                    <p className="text-sui-gray-600 text-sm mb-4 line-clamp-2">
                      {classItem.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-sui-gray-700">
                        <span>📅</span>
                        <span>
                          {format(new Date(classItem.scheduled_at), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-sui-gray-700">
                        <span>⏰</span>
                        <span>
                          {format(new Date(classItem.scheduled_at), 'h:mm a')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-sui-gray-700">
                        <span>⏱️</span>
                        <span>{classItem.duration_minutes} minutes</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-sui-ocean flex items-center justify-center text-white font-semibold">
                        {(classItem.instructor as any)?.username?.[0]?.toUpperCase() || 'I'}
                      </div>
                      <span className="text-sui-gray-700 text-sm">
                        {(classItem.instructor as any)?.username || 'Instructor'}
                      </span>
                    </div>
                    <button className="w-full px-4 py-2 bg-sui-ocean hover:bg-sui-ocean-dark text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-sui-ocean/30">
                      Book Class
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

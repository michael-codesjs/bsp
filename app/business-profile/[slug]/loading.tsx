export default function BusinessProfileLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner Skeleton */}
      <div className="h-[50vh] w-full bg-zinc-100 animate-pulse" />
      
      <div className="max-w-6xl mx-auto px-6 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {/* Main Content Skeleton */}
            <div className="bg-white rounded-5xl p-12 border border-zinc-100 shadow-sm space-y-6">
              <div className="h-10 w-48 bg-zinc-100 rounded-lg animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-zinc-100 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-zinc-100 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-zinc-100 rounded animate-pulse" />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 space-y-8">
            {/* Sidebar Skeleton */}
            <div className="h-64 bg-zinc-100 rounded-4xl animate-pulse" />
            <div className="h-48 bg-zinc-100 rounded-4xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

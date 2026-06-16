export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
      </div>
    </div>
  )
}

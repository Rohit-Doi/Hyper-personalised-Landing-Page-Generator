export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-16 w-16 rounded-full bg-pink-100 mb-4"></div>
        <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-24 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
}

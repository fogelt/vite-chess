export function LoadingSpinner() {
  return (
    <div className="flex gap-4">
      <div className="h-10 w-10 rounded-full border-t-[3px] border-b border-b-[3px] border-t border-gray-500 animate-spin">
      </div>
      <p className="mt-2 uppercase font-bold tracking-[0.2em] text-sm text-gray-500">Loading...</p>
    </div>
  );
}
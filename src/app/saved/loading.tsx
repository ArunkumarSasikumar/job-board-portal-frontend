export default function Loading() {
  return (
    <main>
     <div className="flex h-[100%] w-full flex-col items-center justify-center rounded-lg p-5 dark:bg-gray-900">
        <div className="h-10 justify-center w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400" />
        <p className="mt-[15px] text-[1.2em] text-[#555] dark:text-gray-300">
          Loading...
        </p>
      </div>
    </main>
  );
}

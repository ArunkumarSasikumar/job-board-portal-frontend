'use client';
import { getStatusColor } from '@/features/helper';
import { useSavedJobsStore } from '@/hooks/useSavedJobs';
import { formatSalary } from '@/types';
import Link from 'next/link';

export default function SavedJobs() {
  const savedJobs = useSavedJobsStore((state) => state.jobs);
  const removeJob = useSavedJobsStore((state) => state.removeJob);
  const clearAll = useSavedJobsStore((state) => state.clearAll);
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className='mt-4 flex flex-wrap justify-between align-center'>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Saved Jobs
        </h1>
        <button className='btn float-right' onClick={() => clearAll()}>Clear All</button>
        </div>
        {savedJobs?.length !== 0 ? (
          <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {savedJobs?.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[rgba(0,0,0,0.08)_0px_3px_8px] transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <button
                  onClick={() => removeJob(item)}
                  className="mb-4 text-[var(--text-color)] cursor-pointer float-right"
                  aria-label="Close filters"
                >
                  ✕
                </button>
                <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h2>

                <h3 className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                  {item.companyName}
                </h3>

                <div
                  className="mb-4 inline-flex rounded-full border px-3 py-1 text-sm font-medium"
                  style={{
                    backgroundColor: getStatusColor(item?.status ?? 'Draft')
                      .boxStyle,
                    borderColor: getStatusColor(item?.status ?? 'Draft')
                      .boxStyle,
                  }}
                >
                  <span
                    style={{
                      color: getStatusColor(item?.status ?? 'Draft').fontStyle,
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Salary:{' '}
                  {formatSalary(item?.salary?.min ?? 0, item?.salary?.max ?? 0)}
                </p>
                <button className='btn mt-3'>
                  <Link href={`/jobs/${item.id}`}>View Details</Link>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Jobs you save will appear here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

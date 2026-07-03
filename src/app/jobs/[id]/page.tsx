'use client';

import { formatJobType } from '@/features/helper';
import { GET_JOBS } from '@/graphql/queries';
import { Job } from '../../../generated/graphql';
import { formatSalary } from '@/types';
import { useQuery } from '@apollo/client/react';
import React from 'react';

export const dynamic = "force-dynamic";

type JobParams = {
  params: Promise<{
    id: string;
  }>;
};

type JobData = {
  jobs: Job[];
};

type JobVariables = {
  filter: {
    location?: string;
    type?: string;
    status?: string;
    search?: string;
  };
};

export default function JobDetail({ params }: JobParams) {
  const id = React.use(params);
  const { data } = useQuery<JobData, JobVariables>(GET_JOBS, {
    variables: { filter: {} },
  });

  const jobs = data?.jobs ?? [];
  const jobdetail = jobs.find((job) => job.id === id.id);

  if (!jobdetail) {
    return (<main><h2 className="text-center text-[var(--text-color)}">Job Not Found</h2></main>);
  }
  return (
    <main>
      <div className="my-3 mt-12 rounded-xl border bg-[var(--card-bg)] px-5 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
        <h1 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
          {jobdetail.title}
        </h1>

        <h2 className="mb-2.5 text-base font-medium text-indigo-600 dark:text-white">
          {jobdetail.companyName}
        </h2>

        <p className="mb-2 text-sm text-gray-700 dark:text-white">
          Status: {jobdetail.status}
        </p>

        <p className="my-0.5 text-sm font-normal text-gray-500 dark:text-white">
          Job Type: {formatJobType(jobdetail.type ?? "")}
        </p>

        <p className="my-0.5 text-sm font-normal text-gray-500 dark:text-white">
          Location: {jobdetail.location}
        </p>

        <h3 className="mt-2.5 font-semibold text-gray-900 dark:text-white">
          Salary:{" "}
          {formatSalary(
            jobdetail?.salary?.min ?? 0,
            jobdetail?.salary?.max ?? 0
          )}
        </h3>
      </div>
    </main>
  );
}

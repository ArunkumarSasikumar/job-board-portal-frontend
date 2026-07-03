'use client';

import { formatSalary } from '../types';
import type { Job } from '../generated/graphql';
import { formatJobType, getStatusColor } from '../features/helper';
import React from 'react';
import { useStore } from 'zustand';
import SaveButton from './SaveButton';
import Link from 'next/link';
import { lastViewedJobStore } from '../store/lastViewedJobStore';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAppliedJobStore } from '../store/useAppliedJobStore';

interface JobCardProps {
  job: Job;
}

export const JobCard = React.memo(({ job }: JobCardProps) => {
  const setLastViewedJob = useStore(
    lastViewedJobStore,
    (state) => state.setLastViewedJob
  );

  const handleViewDetail = (id: string) => {
    id=id;
    setLastViewedJob(job);
  };

  const isAppliedstore = useAppliedJobStore((state) => state.isJobApplied);

  const isApplied = job.isApplied ?? isAppliedstore(job.id);

  const router = useRouter();

  const { data: session, status } = useSession();

  const handleApplyClick = () => {
    if (!session) {
      signIn(undefined, {
        callbackUrl: `/apply/${job.id}`,
      });
      return;
    }

    router.push(`/apply/${job.id}`);
  };

  return (
    <div className=" bg-[var(--card-bg)] w-[300px] border-2 border-solid border-[var(--border-color)] rounded-[20px] p-[12px] mb-2 shadow-[rgba(0,0,0,0.24)_0px_3px_8px]">
      <h1 className="font-medium mb-2 text-[var(--text-color)]">{job.title}</h1>
      <h2 className="font-medium mt-4 mb-4 text-[var(--text-color)]">
        {job.companyName}
      </h2>
      <div className="flex flex-row justify-evenly">
        <div
          className="w-fit border px-[7px] py-1 rounded-xl border-solid"
          style={{
            backgroundColor: job.status
              ? getStatusColor(job.status).boxStyle
              : 'black',
            borderColor: job.status
              ? getStatusColor(job.status).boxStyle
              : 'black',
          }}
        >
          <span
            className="text-center text-[13px] text-[var(--text-color)]"
            style={{
              color: `${job.status ? getStatusColor(job.status).fontStyle : 'white'}`,
            }}
            aria-label={job.status ?? 'Unknown'}
          >
            {job.status ?? 'Unknown'}
          </span>
        </div>
        <p
          className="text-sm md:text-base text-[var(--text-color)] bg-gray-200 dark:bg-gray-700
                    border border-[var(--border-color)] px-3 py-1.5 rounded-xl whitespace-nowrap"
        >
          {formatJobType(job.type ?? '')}
        </p>
        <p
          className="text-sm md:text-base text-[var(--text-color)] bg-gray-200 dark:bg-gray-700
                    border border-[var(--border-color)] px-3 py-1.5 rounded-xl whitespace-nowrap"
        >
          {job.location}
        </p>
      </div>
      <h3 className="font-medium mt-4 mb-4 text-[var(--text-color)]">
        Salary: {formatSalary(job.salary?.min ?? 0, job.salary?.max ?? 0)}
      </h3>
      <div className="flex justify-between">
        <SaveButton job={job} />
        <Link
          href={`jobs/${job.id}`}
          onClick={() => handleViewDetail(job.id)}
          className="btn text-[var(--button-text)]"
        >
          View Details
        </Link>
        <button
          className="btn text-[var(--button-text)] disabled:cursor-not-allowed disabled:bg-gray-700"
          onClick={handleApplyClick}
          disabled={isApplied || status === 'loading'}
        >
          {isApplied ? 'Applied' : 'Apply Job'}
        </button>
      </div>
    </div>
  );
});
JobCard.displayName='JobCard';
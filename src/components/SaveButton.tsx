'use client';

import { useSavedJobsStore } from '../hooks/useSavedJobs';
import { Job } from '../generated/graphql';

interface SaveButtonProps {
  job: Job;
}

export default function SaveButton({ job }: SaveButtonProps) {
  const savedJobs = useSavedJobsStore((state) => state.jobs);
  const saveJob = useSavedJobsStore((state) => state.saveJob);
  const removeJob = useSavedJobsStore((state) => state.removeJob);
  const saved = savedJobs.some((save) => save.id === job.id);

  const handleClick = () => {
    if (saved) {
      removeJob(job);
    } else {
      saveJob(job);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn text-[var(--button-text)]"
      tabIndex={0}
    >
      {saved ? 'Remove Job' : 'Save Job'}
    </button>
  );
}

import type { Job } from '../generated/graphql';
import { JobCard } from './JobCard';

interface JobListProps {
  jobs: Job[] | undefined;
}

export const JobList = ({ jobs }: JobListProps) => {
  return (
    <main>
      <div className="flex gap-[12px] flex-wrap px-1 py-1 ml-auto mr-auto mt-5 mb-5 lg:flex md:flex md:justify-center sm:flex sm:justify-center">
        {jobs?.map((item) => (
          <JobCard key={item.id} job={item} />
        ))}
      </div>
    </main>
  );
};

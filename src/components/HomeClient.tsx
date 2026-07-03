'use client';
import { useQuery } from '@apollo/client/react';
import Header from './Header';
import { JobList } from './JobList';
import { useStore } from 'zustand';
import { GET_JOBS } from '../graphql/queries';
import { Job, JobLocation, JobType } from '../generated/graphql';
import { useEffect, useMemo, useState, useTransition } from 'react';
import useDebounceValue from '../hooks/useDebouncedValue';
import { lastViewedJobStore } from '../store/lastViewedJobStore';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

export type JobTypeFilter = 'All' | JobType;

export type LocationFilter = 'All' | JobLocation;

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

export default function HomeClient() {
  const {data: session} = useSession();
  useEffect(()=>{
    if(!session){
      signIn(undefined,{
        callbackUrl:'/'
      });
    }
  },[session]);

  const { data } = useQuery<JobData, JobVariables>(GET_JOBS, {
    variables: { filter: {} },
  });

  const lastViewedJob = useStore(
    lastViewedJobStore,
    (state) => state.lastViewedJob
  );

  const [ipValue, setIpValue] = useState('');
  const [searchText, setSearchText] = useState('');

  const [isPending, startTransition] = useTransition();

  const [selectType, setSelectType] = useState<JobTypeFilter>('All');
  const [selectLocation, setSelectLocation] = useState<LocationFilter>('All');

  const debounceSearchtext = useDebounceValue(searchText, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = event.target.value;

    setIpValue(value);

    startTransition(() => {
      setSearchText(value);
    });
  };

  const filteredJobs = useMemo(() => {
    const jobs = data?.jobs ?? [];
    return jobs.filter((job) => {
      const searchFilter = (job.title ?? '')
        .toLowerCase()
        .includes(debounceSearchtext.toLowerCase());

      const matchedType = selectType === 'All' || job.type === selectType;

      const matchedLocation =
        selectLocation === 'All' || job.location === selectLocation;

      return searchFilter && matchedType && matchedLocation;
    });
  }, [data, debounceSearchtext, selectType, selectLocation]);

  // console.log(data);

  return (
    <div className="text-center">
      <Header
        ipValue={ipValue}
        isPending={isPending}
        selectType={selectType}
        selectLocation={selectLocation}
        onSearchChange={handleSearchChange}
        onTypeChange={setSelectType}
        onLocationChange={setSelectLocation}
        filteredJobsCount={filteredJobs.length}
      />
      <JobList jobs={filteredJobs} />

      {lastViewedJob?.id && (
        <Link href={`/jobs/${lastViewedJob.id}`}>
          Last Viewed Job
        </Link>
      )}
    </div>
  );
}

import { JobLocation, JobType } from '../generated/graphql';
import FilterBar from './FilterBar';
import Select from './Select';
import { useSavedJobsStore } from '../hooks/useSavedJobs';
import { createStore, useStore } from 'zustand';
import LogoutButton from './LogoutButton';
import Link from 'next/link';

type JobTypeFilter = 'All' | JobType;

type LocationFilter = 'All' | JobLocation;

type HeaderProps = {
  ipValue: string;
  isPending: boolean;
  selectType: JobTypeFilter;
  selectLocation: LocationFilter;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (value: JobTypeFilter) => void;
  onLocationChange: (value: LocationFilter) => void;
  filteredJobsCount: number;
};

type FilterStore = {
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
};

const filterStore = createStore<FilterStore>()((set) => ({
    isFilterOpen: false,
    setIsFilterOpen: (isFilterOpen: boolean) => {
      set({ isFilterOpen });
    },
  }));

export default function Header({
  ipValue,
  isPending,
  selectType,
  selectLocation,
  onSearchChange,
  onTypeChange,
  onLocationChange,
  filteredJobsCount,
}: HeaderProps) {

  const jobTypeOptions: JobTypeFilter[] = [
    'All',
    'Full_time',
    'Part_time',
    'Intern',
    'Contract',
  ];

  const locationOptions: LocationFilter[] = [
    'All',
    'Remote',
    'Chennai',
    'Coimbatore',
    'Bangalore',
  ];

  
  const savedJobsCount = useSavedJobsStore((state) => state.count);
  const isFilterOpen = useStore(filterStore, (state) => state.isFilterOpen);
  const setIsFilterOpen = useStore(
    filterStore,
    (state) => state.setIsFilterOpen
  );

  return (
    <>
      <header>
        <div>
          <h1 className="font-bold w-[90%] pl-[104px] text-[var(--text-color)]">
            Job Board Portal
          </h1>
          <a href="#main" className="text-[var(--text-color)]">
            Skip to Main Content
          </a>
        </div>
        <nav className="flex flex-wrap md:flex-nowrap gap-3 items-center justify-between">
        <Link href={'/saved'}>
          <p
            className="text-sm md:text-base text-[var(--text-color)] bg-gray-200 dark:bg-gray-700
                    border border-[var(--border-color)] px-3 py-1.5 rounded-xl whitespace-nowrap"
          >
            Saved Jobs:{' '}
            <span className="font-medium text-blue-500">{savedJobsCount}</span>
          </p>
          </Link>
          <div className="flex-1 min-w-[200px]">
            <FilterBar
              inputValue={ipValue}
              onSearchChange={onSearchChange}
              isPending={isPending}
            />
          </div>
          <div className="hidden md:flex gap-3 md:align-center">
            <div className="bg-gray-200 dark:bg-gray-700 border border-[var(--border-color)] p-2.5 rounded-3xl">
              <Select
                options={jobTypeOptions}
                value={selectType}
                onChange={onTypeChange}
              />
            </div>

            <div className="bg-gray-200 dark:bg-gray-700 border border-[var(--border-color)] p-2.5 rounded-3xl">
              <Select
                options={locationOptions}
                value={selectLocation}
                onChange={onLocationChange}
              />
            </div>
            <div className='mt-6'>
            <LogoutButton/>
            </div>
          </div>
          <button
            type="button"
            aria-label="Open filters"
            aria-expanded={isFilterOpen}
            aria-controls="mobile-filters"
            onClick={() => {console.log("Clicked");setIsFilterOpen(!isFilterOpen)}}
            className="md:hidden border p-2 rounded-lg text-[var(--text-color)]"
          >
            ☰{' '}
          </button>
        </nav>
        <nav
          aria-label="Mobile Navigation"
          className="fixed bottom-0 left-0 right-0
                flex justify-around items-center p-3 border-t border-[var(--border-color)]
                bg-[var(--card-bg)] md:hidden"
        >
          <button type="button" className="text-[var(--text-color)]">
            Jobs
          </button>
            <Link href={'/saved'} className='text-[var(--text-color)]'>
            Saved
            </Link>
          <button type="button" className="text-[var(--text-color)]">
            Profile
          </button>
        </nav>
      </header>
      <aside
        id="mobile-filters"
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[var(--card-bg)]
    border-r border-[var(--border-color)] p-4 transform transition-transform duration-200 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
      >
        <button
          onClick={() => setIsFilterOpen(false)}
          className="mb-4 text-[var(--text-color)]"
          aria-label="Close filters"
        >
          ✕
        </button>

        <div className="space-y-4">
          <Select
            options={jobTypeOptions}
            value={selectType}
            onChange={onTypeChange}
          />
          <Select
            options={locationOptions}
            value={selectLocation}
            onChange={onLocationChange}
          />
          <LogoutButton/>
        </div>
      </aside>
      <div id="main">
        <h1 aria-live="polite" className="font-medium text-[var(--text-color)]">
          {filteredJobsCount
            ? `${filteredJobsCount} Jobs Found`
            : 'No Jobs Found'}
        </h1>
      </div>
    </>
  );
}

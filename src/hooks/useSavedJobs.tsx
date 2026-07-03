'use client';
import { useReducer } from 'react';
import type { Job } from '../generated/graphql';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SaveJobState {
  jobs: Job[];
  count: number;
}

type SaveJobAction =
  | { type: 'SAVE_JOB'; payload: Job }
  | { type: 'REMOVE_JOB'; payload: Job }
  | { type: 'CLEAR_ALL' };

function saveJobReducer(
  state: SaveJobState,
  action: SaveJobAction
): SaveJobState {
  switch (action.type) {
    case 'SAVE_JOB':
      if (state.jobs.includes(action.payload)) {
        return state;
      }
      return {
        jobs: [...state.jobs, action.payload],
        count: state.count + 1,
      };
    case 'REMOVE_JOB':
      return {
        jobs: state.jobs.filter((idx) => idx.id !== action.payload.id),
        count: state.count - 1,
      };
    case 'CLEAR_ALL':
      return {
        jobs: [],
        count: 0,
      };
    default:
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
  }
}

const initialState: SaveJobState = {
  jobs: [],
  count: 0,
};

export const useSavedJobs = () => {
  const [state, dispatch] = useReducer(saveJobReducer, initialState);

  const saveJob = (addJob: Job) =>
    dispatch({ type: 'SAVE_JOB', payload: addJob });

  const removeJob = (job: Job) =>
    dispatch({ type: 'REMOVE_JOB', payload: job });

  const clearAll = () => dispatch({ type: 'CLEAR_ALL' });

  return { count: state.count, jobs: state.jobs, saveJob, removeJob, clearAll };
};

type SaveJobStore = {
  jobs: Job[];
  count: number;
  saveJob: (job: Job) => void;
  removeJob: (job: Job) => void;
  clearAll: () => void;
};

export const useSavedJobsStore = create<SaveJobStore>()(
  persist(
    (set, get) => ({
      jobs: [],
      count: 0,

      saveJob: (job) => {
        const exists = get().jobs.some((item) => item.id === job.id);

        if (exists) return;

        const updatedJobs = [...get().jobs, job];

        set({
          jobs: updatedJobs,
          count: updatedJobs.length,
        });
      },

      removeJob: (jobId) => {
        const updatedJobs = get().jobs.filter((job) => job.id !== jobId.id);

        set({
          jobs: updatedJobs,
          count: updatedJobs.length,
        });
      },
      clearAll: () => {
        set({
          jobs: [],
          count: 0,
        });
      },
    }),
    {
      name: 'saveJob',
    }
  )
);

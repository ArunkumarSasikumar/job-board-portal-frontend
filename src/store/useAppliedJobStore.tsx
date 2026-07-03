import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AppliedJobStore = {
  appliedJobIds: string[];
  markAsApplied: (jobId: string) => void;
  isJobApplied: (jobId: string) => boolean;
};

export const useAppliedJobStore = create<AppliedJobStore>()(
  persist(
    (set, get) => ({
      appliedJobIds: [],

      markAsApplied: (jobId) =>
        set((state) => ({
          appliedJobIds: state.appliedJobIds.includes(jobId)
            ? state.appliedJobIds
            : [...state.appliedJobIds, jobId],
        })),

      isJobApplied: (jobId) => get().appliedJobIds.includes(jobId),
    }),
    {
      name: 'applied-jobs',
    }
  )
);

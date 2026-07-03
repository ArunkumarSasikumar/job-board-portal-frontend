import { Job } from '../generated/graphql';
import { createStore } from 'zustand';

type LastViewedJobStore = {
  lastViewedJob: Job | null;
  setLastViewedJob: (job: Job) => void;
};

export const lastViewedJobStore = createStore<LastViewedJobStore>()((set) => ({
  lastViewedJob: null,
  setLastViewedJob: (job: Job) => {
    set({
      lastViewedJob: job,
    });
  },
}));

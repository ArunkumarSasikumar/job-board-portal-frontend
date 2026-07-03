import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSavedJobs } from '../hooks/useSavedJobs';
import type { Job } from '../generated/graphql';

const sampleJob: Job = {
  id: '1',
  title: 'Frontend Developer',
  companyName: 'TechNova Pvt Ltd',
  salary: { min: 600000, max: 900000 },
  status: 'Open',
  type: 'Full_time',
  location: 'Chennai',
  isApplied: true,
};

describe('useSavedJobs', () => {
  it('should save jobs', async () => {
    const { result } = renderHook(() => useSavedJobs());
    act(() => {
      result.current.saveJob(sampleJob);
    });
    expect(result.current.count).toBe(1);
  });

  it('should remove job', async () => {
    const { result } = renderHook(() => useSavedJobs());
    act(() => {
      result.current.saveJob(sampleJob);
    });
    act(() => {
      result.current.removeJob(sampleJob);
    });
    expect(result.current.count).toBe(0);
    expect(result.current.jobs).toStrictEqual([]);
  });
});

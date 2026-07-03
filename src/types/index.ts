export interface Job {
  id: string;
  title: string;
  companyName: string;
  salary: {
    min: number;
    max: number;
  };
  status: JobStatus;
  type: 'Full-time' | 'Part-time' | 'Intern' | 'Contract';
  location: 'Remote' | 'Chennai' | 'Coimbatore' | 'Bangalore';
  isApplied: boolean;
}

export interface Company {
  id: string;
  name: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: number;
  experienceYears?: number;
}

export type JobStatus = 'Open' | 'Closed' | 'Draft';

export function formatSalary(min: number, max: number): string {
  if (max < 0 || min < 0) {
    throw new Error('Salary cannot be negative');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
}

export type JobFilter = Pick<Job, 'type' | 'location'>;

import { render, screen } from '@testing-library/react';
import { JobCard } from '../components/JobCard';
import { describe, it, expect } from 'vitest';
import type { Job } from '../generated/graphql';
import { MemoryRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';

const sampleJob: Job = {
  id: '1',
  title: 'Frontend Developer',
  companyName: 'TechNova Pvt Ltd',
  salary: { min: 600000, max: 900000 },
  status: 'Open',
  type: 'Intern',
  location: 'Chennai',
  isApplied: false,
};

describe('Job Card', () => {
  it('should render', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <JobCard job={sampleJob} />
      </MemoryRouter>
    );

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('TechNova Pvt Ltd')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /apply job/i }));
  });
});

import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';
import ApplyModal from '../components/ApplyModal';
import { render, screen } from '@testing-library/react';
import { APPLY_JOB } from '../graphql/mutations';
import { MockedProvider } from '@apollo/client/testing/react';

const mocks = [
  {
    request: {
      query: APPLY_JOB,
      variables: {
        jobId: '1',
        input: {
          name: 'Arun',
          email: 'arun@test.com',
        },
      },
    },
    result: {
      data: {
        applyJob: {
          id: '1',
          success: true,
          message: 'Applied successfully',
        },
      },
    },
  },
];

describe('Form', () => {
  it('should show error when email is blank', async () => {
    const user = userEvent.setup();
    render(
      <MockedProvider mocks={mocks}>
        <ApplyModal jobId="1" isOpen={true} onClose={() => vi.fn()} />
      </MockedProvider>
    );
    await user.click(screen.getByRole('button', { name: /apply/i }));
    expect(
      await screen.findByText(/invalid email address/i)
    ).toBeInTheDocument();
  });
});

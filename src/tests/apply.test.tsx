import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing/react';
import ApplyModal from '../components/ApplyModal';
import { APPLY_JOB } from '../graphql/mutations';

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

it('renders ApplyModal and focuses name input', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <ApplyModal isOpen={true} jobId="1" onClose={() => {}} />
    </MockedProvider>
  );

  const dialog = screen.getByRole('dialog', {
    name: /job application form/i,
  });

  expect(dialog).toBeInTheDocument();

  const nameInput = screen.getByLabelText(/name/i);

  await waitFor(() => {
    expect(nameInput).toHaveFocus();
  });
});

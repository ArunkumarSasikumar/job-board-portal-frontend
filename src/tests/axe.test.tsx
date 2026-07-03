import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MockedProvider } from '@apollo/client/testing/react';
import Home from '../app/page';
import { GET_JOBS } from '../graphql/queries';
import { SessionProvider } from 'next-auth/react';

const mocks = [
  {
    request: {
      query: GET_JOBS,
      variables: {
        filter: {},
      },
    },
    result: {
      data: {
        jobs: [
          {
            id: '1',
            title: 'Frontend Developer',
            companyName: 'TechNova Pvt Ltd',
            type: 'Full-time',
            status: 'Open',
            location: 'Chennai',
            salary: {
              min: 80000,
              max: 100000,
            },
            isApplied: false,
          },
        ],
      },
    },
  },
];

it('should have no accessibility violations', async () => {
  const { container } = render(
    <SessionProvider session={null}>
      <MockedProvider mocks={mocks}>
        <Home />
      </MockedProvider>
    </SessionProvider>
  );

  await screen.findByText('Frontend Developer');

  const result = await axe(container);

  expect(result).toHaveNoViolations();
});

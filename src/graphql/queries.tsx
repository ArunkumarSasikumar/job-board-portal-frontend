import { gql } from '@apollo/client';

export const GET_JOBS = gql`
  query GetJobs($filter: JobFilter) {
    jobs(filter: $filter) {
      id
      title
      companyName
      type
      location
      status
      salary {
        min
        max
      }
      isApplied
    }
  }
`;

import { gql } from '@apollo/client';

export const APPLY_JOB = gql`
  mutation ApplyToJob($input: ApplyInput!) {
    applyToJob(input: $input) {
      id
      jobId
      name
      email
      coverLetter
      message
    }
  }
`;

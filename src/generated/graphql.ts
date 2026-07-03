/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;


export const ApplyToJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyToJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ApplyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyToJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"coverLetter"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ApplyToJobMutation, ApplyToJobMutationVariables>;
export const GetJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JobFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"salary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isApplied"}}]}}]}}]} as unknown as DocumentNode<GetJobsQuery, GetJobsQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Application = {
  __typename?: 'Application';
  coverLetter?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  jobId?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Job = {
  __typename?: 'Job';
  companyName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isApplied: Scalars['Boolean']['output'];
  location?: Maybe<JobLocation>;
  salary?: Maybe<Salary>;
  status?: Maybe<JobStatus>;
  title: Scalars['String']['output'];
  type?: Maybe<JobType>;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  applyToJob?: Maybe<Application>;
};


export type RootMutationTypeApplyToJobArgs = {
  input: ApplyInput;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  job?: Maybe<Job>;
  jobs?: Maybe<Array<Maybe<Job>>>;
};


export type RootQueryTypeJobArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryTypeJobsArgs = {
  filter?: InputMaybe<JobFilter>;
};

export type Salary = {
  __typename?: 'Salary';
  max: Scalars['Int']['output'];
  min: Scalars['Int']['output'];
};

export type ApplyInput = {
  coverLetter?: string | null | undefined;
  email: string;
  jobId: string | number;
  name: string;
};

export type JobFilter = {
  jobStatus?: JobStatus | null | undefined;
  jobType?: JobType | null | undefined;
  location?: JobLocation | null | undefined;
  search?: string | null | undefined;
};

export type JobLocation =
  | 'Bangalore'
  | 'Chennai'
  | 'Coimbatore'
  | 'Remote';

export type JobStatus =
  | 'Closed'
  | 'Draft'
  | 'Open';

export type JobType =
  | 'Contract'
  | 'Full_time'
  | 'Intern'
  | 'Part_time';

export type ApplyToJobMutationVariables = Exact<{
  input: ApplyInput;
}>;


export type ApplyToJobMutation = { applyToJob: { id: string | null, jobId: string | null, name: string | null, email: string | null, coverLetter: string | null, message: string | null } | null };

export type GetJobsQueryVariables = Exact<{
  filter?: JobFilter | null | undefined;
}>;


export type GetJobsQuery = { jobs: Array<{ id: string, title: string, companyName: string, type: JobType | null, location: JobLocation | null, status: JobStatus | null, isApplied: boolean, salary: { min: number, max: number } | null } | null> | null };

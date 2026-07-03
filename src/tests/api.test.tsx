it('returns jobs from GraphQL API', async () => {

  const response = await fetch('http://127.0.0.1:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetJobs($filter: JobFilter) {
          jobs(filter: $filter) {
            title
            companyName
          }
        }
      `,
      variables: {
        filter: {},
      },
    }),
  });

  const json = await response.json();

  expect(json.data.jobs[0]).toEqual({
    title: 'Frontend Developer',
    companyName: 'TechNova Pvt Ltd',
  });
});
import { graphql, HttpResponse } from 'msw';

export const handlers = [
  graphql.query('GetJobs', () => {
    return HttpResponse.json({
      data: {
        jobs: [
          {
            id: '1',
            title: 'Frontend Developer',
          },
        ],
      },
    });
  }),
];

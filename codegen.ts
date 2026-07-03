import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.graphql', 'src/**/*.{ts,tsx}'],
  generates: {
    'src/generated/': {
      plugins: [
        'typescript',
        'typescript-operations',
      ],
      config: {
        enumsAsTypes: true,
      },
      preset:"client"
    },
  },
};

export default config;

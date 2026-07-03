import { Metadata } from 'next';
import SavedJobs from '@/components/SavedJobs';

export const metadata: Metadata = {
  title: 'Saved Jobs',
  description: 'Contains list of jobs saved',
};

export const dynamic="force-dynamic";

export default async function Saved() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <main>
      <SavedJobs />
    </main>
  );
}

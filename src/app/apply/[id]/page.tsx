import ApplyModalPage from '@/components/ApplyModalPage';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApplyPage({ params }: Props) {
  const { id } = await params;

  return (
    <main>
      <ApplyModalPage jobId={id} />
    </main>
  );
}

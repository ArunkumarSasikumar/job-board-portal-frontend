'use client';

import { useRouter } from 'next/navigation';
import ApplyModal from '@/components/ApplyModal';

type ApplyModalPageProps = {
  jobId: string;
};

export default function ApplyModalPage({ jobId }: ApplyModalPageProps) {
  const router = useRouter();

  return (
    <ApplyModal jobId={jobId} isOpen={true} onClose={() => router.push('/')} />
  );
}

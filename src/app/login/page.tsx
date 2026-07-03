import Loader from '@/components/Loader';
import LoginForm from '@/components/LoginForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata:Metadata={
  title:'Login Page',
  description:'User need to login to apply for a job.'
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader/>}>
    <main className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </main>
    </Suspense>
  );
}

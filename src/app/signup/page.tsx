import Loader from '@/components/Loader';
import SignupForm from '@/components/SignupForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata:Metadata={
  title:'Signup Page',
  description:'User need to create an account to apply for a job.'
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader/>}>
    <main className="flex min-h-screen items-center justify-center">
      <SignupForm />
    </main>
    </Suspense>
  );
}

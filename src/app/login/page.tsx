import LoginForm from '@/components/LoginForm';
import { Metadata } from 'next';

export const metadata:Metadata={
  title:'Login Page',
  description:'User need to login to apply for a job.'
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </main>
  );
}

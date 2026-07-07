'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl') || '/saved';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setError('Invalid email or password');
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm rounded-xl border p-6 shadow bg-[var(--card-bg)]"
    >
      <h1 className="mb-4 text-2xl font-bold text-[var(--text-color)]">
        Login
      </h1>

      {error && (
        <p className="mb-3 rounded bg-red-100 p-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mb-3">
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-[var(--text-color)]"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          className="w-full rounded border px-3 py-2 text-[var(--text-color)]"

          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-[var(--text-color)]"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          className="w-full rounded border px-3 py-2 text-[var(--text-color)]"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer btn rounded px-4 py-2 text-white"
      >
        Login
      </button>
    </form>
  );
}

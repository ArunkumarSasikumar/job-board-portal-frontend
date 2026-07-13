'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%&*!])(?=.*[^A-Za-z\d]).{6,}$/;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    if(emailRegEx.test(email)===false){
      setError("Invalid Email Format");
      return;
    }

    if(passwordRegEx.test(password.trim())===false){
      setError("Password must be atleast 6 characters");
      return;
    }

    const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    })

    const data = await result.json();

    if(!result.ok){
        setError(data.message)
    }

    if(result.ok){
        await signIn('credentials',{
            email,
            password,
            callbackUrl:'/login'
        })
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-xl border p-6 shadow bg-[var(--card-bg)]"
    >
      <h1 className="mb-4 text-2xl font-bold text-[var(--text-color)]">
        Register
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
          required
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
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer btn rounded px-4 py-2 text-white"
        disabled={!email || !password}
      >
        Create Account
      </button>
      <p>
        Already have an Account? <Link href={'/login'}>Login</Link>
      </p>
    </form>
  );
}

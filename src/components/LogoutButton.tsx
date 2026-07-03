'use client';

import { signOut, useSession } from 'next-auth/react';

export default function LogoutButton() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="rounded bg-red-600 px-4 py-2 text-white cursor-pointer"
    >
      Logout
    </button>
  );
}

import '@testing-library/jest-dom/vitest';
import { expect, vi } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';
import React from 'react';

expect.extend(toHaveNoViolations);

vi.mock('next/font/google', () => ({
  Geist: () => ({
    variable: '--font-geist-sans',
    className: 'mock-geist-sans',
  }),
  Geist_Mono: () => ({
    variable: '--font-geist-mono',
    className: 'mock-geist-mono',
  }),
}));

vi.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),

  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),

  signIn: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),

  usePathname: () => '/',

  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),

  usePathname: () => '/',

  useSearchParams: () => new URLSearchParams(),
}));

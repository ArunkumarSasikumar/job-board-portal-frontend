'use client';
import { useEffect, useRef } from 'react';

export default function AxeRunner({ children }: { children: React.ReactNode }) {
  const axeHasRun = useRef(false);
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (axeHasRun.current) return;
    axeHasRun.current = true;
    async function runAxe() {
      try {
        const axe = await import('axe-core');

        const results = await axe.run(document.body);

        if (results.violations.length > 0) {
          console.log('Accessibility violations:', results.violations);
        } else {
          console.log('No accessibility violations found');
        }
      } catch (err) {
        console.error('Something bad happened:', err);
      }
    }

    runAxe();
  }, []);
  return <div>{children}</div>;
}

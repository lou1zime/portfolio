'use client';

import NextError from 'next/error';
import { useEffect } from 'react';
import posthog from 'posthog-js';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const posthogEnabled = Boolean(
  process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST
);

export default function GlobalError({ error }: GlobalErrorProps) {
  useEffect(() => {
    if (posthogEnabled) posthog.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}

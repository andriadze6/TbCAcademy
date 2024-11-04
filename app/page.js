'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
      // Redirect to a different page (e.g., /HomePage)
      router.push('/HomePage');
  }, [router]);
 // Or you can add a loader or message
}

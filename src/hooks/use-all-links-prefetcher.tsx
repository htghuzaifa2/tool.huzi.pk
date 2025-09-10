
"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAllLinksPrefetcher() {
  const router = useRouter();

  useEffect(() => {
    // This effect is currently not active because we are relying on default Next.js prefetching.
    // If you wanted to aggressively preload all links on the page after load, you would use this.
    // For now, the default behavior of prefetching links as they enter the viewport is more optimal.
  }, [router]);
}

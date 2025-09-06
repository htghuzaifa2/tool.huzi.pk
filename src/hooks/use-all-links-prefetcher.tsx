
"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAllLinksPrefetcher() {
  const router = useRouter();

  useEffect(() => {
    // This effect runs once on the client after the component mounts.
    // It's wrapped in a timeout to ensure it runs after the main thread is free.
    const prefetchAllLinks = () => {
      const uniqueLinks = new Set<string>();
      
      // Find all anchor tags with an href attribute
      document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        
        // Ensure the link is internal (starts with '/') and not an anchor link
        if (href && href.startsWith('/') && !href.startsWith('/#')) {
          uniqueLinks.add(href);
        }
      });
      
      // Prefetch each unique internal link
      uniqueLinks.forEach(href => {
        router.prefetch(href);
      });
    };

    const timer = setTimeout(prefetchAllLinks, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [router]); // Re-run if the router instance changes (shouldn't happen often)
}

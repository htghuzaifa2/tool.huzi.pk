
"use client"

import { useState, useEffect } from 'react';

export function ClickTracker() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    setIsClient(true);
  }, []);

  useEffect(() => {
    // This effect runs only on the client AND only after `isClient` becomes true.
    if (!isClient) {
      return;
    }

    const savedClickCount = localStorage.getItem('huzi-pk-click-count') || '0';
    let clickCount = Number(savedClickCount);

    const handleClick = () => {
      clickCount++;
      if (clickCount >= 55) {
        window.open('https://huzi.pk', '_blank');
        clickCount = 0;
      }
      localStorage.setItem('huzi-pk-click-count', String(clickCount));
    };

    document.addEventListener('click', handleClick);

    // Cleanup the event listener when the component unmounts.
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isClient]); // The key change is here: this effect depends on `isClient`.

  return null; // This component does not render anything.
}

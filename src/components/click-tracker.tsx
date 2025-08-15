
"use client"

import { useState, useEffect } from 'react';

export function ClickTracker() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const savedClickCount = localStorage.getItem('huzi-pk-click-count') || '0';
    let clickCount = Number(savedClickCount);

    const handleClick = () => {
      clickCount++;
      if (clickCount >= 39) {
        window.open('https://huzi.pk', '_blank');
        clickCount = 0;
      }
      localStorage.setItem('huzi-pk-click-count', String(clickCount));
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isClient]);

  return null; // This component does not render anything
}

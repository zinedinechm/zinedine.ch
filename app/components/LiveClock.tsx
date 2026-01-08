'use client';

import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      const parisTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Paris',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      setTime(parisTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <span className="text-muted">--:-- --</span>;
  }

  return (
    <span className="tabular-nums font-medium">{time}</span>
  );
}

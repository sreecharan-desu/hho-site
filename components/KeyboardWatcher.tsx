'use client';
import { useEffect, useState } from 'react';

export default function KeyboardWatcher() {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (typeof e.key === 'string') {
        const char = e.key.toLowerCase();
        if (/^[a-z0-9]$/.test(char)) {
          setTyped(prev => (prev + char).slice(-10)); // track last 10 chars
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  useEffect(() => {
    if (typed.includes('admin')) {
      window.location.href = 'https://hhoadmin.sreecharandesu.in';
    }
  }, [typed]);

  return null;
}

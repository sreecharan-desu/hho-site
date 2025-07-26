'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function KeyboardWatcher() {
  const router = useRouter();
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
      router.push('/admin/signin');
    }
  }, [typed, router]);

  return null;
}

// src/components/ProtectedRoute.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, Auth } from 'firebase/auth';
import { getAuthInstance } from '../firebaseConfig';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const authInstance = getAuthInstance();
      setAuth(authInstance);
    } catch (err) {
      console.error('Firebase Auth 초기화 실패:', err);
    }
  }, []);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && router.pathname !== '/') {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return <>{children}</>;
}
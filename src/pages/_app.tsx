// src/pages/_app.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, Auth } from 'firebase/auth';
import { AppProps } from 'next/app'; // Next.js AppProps 타입 임포트
import { getAuthInstance } from '../firebaseConfig';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
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

  return <Component {...pageProps} />;
}
// pages/_app.tsx
import '../styles/globals.css';
import '../styles/index.module.css'; // 경로 확인
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && router.pathname !== '/') {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  return <Component {...pageProps} />;
}
// src/components/LogoutButton.tsx
import { useState, useEffect } from 'react';
import { signOut, Auth } from 'firebase/auth'; // Auth 타입 임포트
import { getAuthInstance } from '../firebaseConfig';
import { useRouter } from 'next/router';

export default function LogoutButton() {
  const [auth, setAuth] = useState<Auth | null>(null); // Auth 타입 적용
  const router = useRouter();

  useEffect(() => {
    try {
      const authInstance = getAuthInstance();
      setAuth(authInstance);
    } catch (err) {
      console.error('Firebase Auth 초기화 실패:', err);
    }
  }, []);

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
        router.push('/');
      } catch (error) {
        console.error('로그아웃 중 오류:', error);
      }
    }
  };

  return <button onClick={handleLogout} className="logout-button">로그아웃</button>;
}
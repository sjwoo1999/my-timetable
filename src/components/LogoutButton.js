import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'next/router';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      alert('로그아웃 실패: ' + error.message);
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
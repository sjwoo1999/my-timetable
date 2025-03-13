// src/pages/index.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import styles from '../styles/index.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/main-page');
    } catch (err: any) {
      // 오류 코드에 따른 사용자 친화적 메시지 매핑
      const errorMessage = getUserFriendlyError(err.code || err.message);
      setError(errorMessage);
    }
  };

  // 오류 코드를 사용자 친화적 메시지로 변환
  const getUserFriendlyError = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return '유효한 이메일 주소를 입력해 주세요.';
      case 'auth/wrong-password':
        return '비밀번호가 잘못되었습니다. 다시 시도해 주세요.';
      case 'auth/user-not-found':
        return '등록된 사용자가 없습니다. 회원가입을 시도해 주세요.';
      case 'auth/too-many-requests':
        return '너무 많은 요청이 있습니다. 잠시 후 다시 시도해 주세요.';
      default:
        return '로그인에 실패했습니다. 다시 시도해 주세요.';
    }
  };

  return (
    <div className={styles.indexContainer}>
      <div className={styles.card}>
        <h1 className={styles.mainTitle}>2025년 1학기</h1>
        <p className={styles.mainDescription}>시간표, 학습 기록</p>
        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}
        <div className={styles.formGroup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className={`${styles.inputField} ${error && styles.inputError}`}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className={`${styles.inputField} ${error && styles.inputError}`}
          />
        </div>
        <div className={styles.callToActions}>
          <button
            onClick={handleLogin}
            className={styles.primaryButton}
          >
            로그인
          </button>
        </div>
      </div>
      <footer className={styles.footer}>
        <a href="https://github.com/sjwoo1999" className={styles.footerLink}>
          더 알아보기
        </a>
      </footer>
    </div>
  );
}
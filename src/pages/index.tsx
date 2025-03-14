// src/pages/index.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { getAuthInstance } from '../firebaseConfig'; // getAuthInstance로 수정
import styles from '../styles/index.module.css';

// HTML 이스케이프 함수 (XSS 방지)
const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '');
};

// 이메일 및 비밀번호 검증
const validateInput = (email: string, password: string): string | null => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) return '유효한 이메일 형식이 아닙니다.';
  if (password.length < 6) return '비밀번호는 최소 6자 이상이어야 합니다.';
  if (/[<>&'"]/.test(email) || /[<>&'"]/.test(password)) return '올바른 형식으로 입력해 주세요.';
  return null;
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [auth, setAuth] = useState<Auth | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const authInstance = getAuthInstance();
      setAuth(authInstance);
    } catch (err) {
      console.error('Firebase Auth 초기화 실패:', err);
      setError('인증 초기화에 실패했습니다. 다시 시도해 주세요.');
    }
  }, []);

  const handleLogin = async () => {
    if (!auth) {
      setError('인증 초기화 중입니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    // 입력 검증
    const validationError = validateInput(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    // XSS 방지
    const sanitizedEmail = escapeHtml(email);
    const sanitizedPassword = escapeHtml(password);

    try {
      await signInWithEmailAndPassword(auth, sanitizedEmail, sanitizedPassword);
      router.push('/main-page');
    } catch (err) {
      if (err instanceof FirebaseError) {
        const errorMessage = getUserFriendlyError(err.code || err.message);
        setError(errorMessage);
      } else {
        setError('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
      }
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
          <button onClick={handleLogin} className={styles.primaryButton}>
            로그인
          </button>
        </div>
      </div>
      <footer className={styles.footer}>
        <a href="https://github.com/sjwoo1999" className={styles.footerLink}>
          더 알아보기
        </a>
      </footer>
      <div className={styles.copyrightSection}>
        <p className={styles.copyright}>© 2025 woo_s.j</p>
      </div>
    </div>
  );
}
// pages/index.tsx
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.mainContent}>
        <h1>시간표 애플리케이션</h1>
        <p>주간 일정을 확인하고 관리하세요.</p>
        <div className={styles.callToActions}>
          <Link href="/main-page" className={styles.primaryLink}>
            시간표 보기
          </Link>
        </div>
      </div>
      <footer className={styles.footer}>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          더 알아보기
        </a>
      </footer>
    </div>
  );
}
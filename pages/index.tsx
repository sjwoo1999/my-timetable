// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        시간표 애플리케이션
      </h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
        주간 일정을 확인하고 관리하세요.
      </p>
      <Link
        href="/main-page"
        style={{
          fontSize: '1.125rem',
          color: '#1e40af',
          padding: '0.75rem 1.5rem',
          border: '1px solid #1e40af',
          borderRadius: '4px',
          transition: 'background-color 0.2s ease',
          textDecoration: 'none',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e6f0ff')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        시간표 보기
      </Link>
    </div>
  );
}
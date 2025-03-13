// pages/subjects/[id].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { Subject, timetable } from '../../lib/timetableData';
import styles from '../../styles/subjects.module.css';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import LogoutButton from '../../components/LogoutButton';

export default function SubjectDetail({ subject }: { subject: Subject | null }) {
  if (!subject) {
    return (
      <div className={styles.timetableContainer}>
        <p>과목을 찾을 수 없습니다.</p>
        <Link href="/main-page" passHref legacyBehavior>
          <a
            className={styles.backButton}
            role="button"
            aria-label="시간표 페이지로 돌아가기"
            tabIndex={0}
          >
            돌아가기
          </a>
        </Link>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.timetableContainer}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.timetableTitle}>{subject.subject}</h2>
          <div className={styles.detailsBlock}>
            <div className={styles.detailItem}>교수: {subject.professor}</div>
            <div className={styles.detailItem}>장소: {subject.location}</div>
            <div className={styles.detailItem}>
              시간:{' '}
              {subject.times
                .map((t) => `${t.day} ${t.startTime} ~ ${t.endTime}`)
                .join(', ')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link href="/main-page" passHref legacyBehavior>
              <a
                className={styles.backButton}
                role="button"
                aria-label="시간표 페이지로 돌아가기"
                tabIndex={0}
              >
                돌아가기
              </a>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = timetable.map((subject) => ({
    params: { id: subject.id.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const subjectId = Number(id);
  if (isNaN(subjectId)) {
    return { props: { subject: null } };
  }
  const subject = timetable.find((s) => s.id === subjectId) || null;
  return { props: { subject } };
};
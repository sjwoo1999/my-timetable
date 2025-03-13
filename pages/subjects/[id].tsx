// pages/subjects/[id].tsx
import { GetServerSideProps } from 'next';
import { timetable } from '../../lib/timetableData';
import styles from '../../styles/subjects.module.css';
import Link from 'next/link';

export default function SubjectDetail({ subject }: { subject: any }) {
  if (!subject) {
    return <div className={styles.timetableContainer}>과목을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.timetableContainer}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.timetableTitle}>{subject.subject}</h2>
        <div className={styles.detailsBlock}>
          <div className={styles.detailItem}>교수: {subject.professor}</div>
          <div className={styles.detailItem}>장소: {subject.location}</div>
          <div className={styles.detailItem}>
            시간: {subject.times.map((t: any) => `${t.startTime} ~ ${t.endTime}`).join(', ')}
          </div>
        </div>
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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const subject = timetable.find((s) => s.id === parseInt(id));
  return { props: { subject } };
};
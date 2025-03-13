// pages/subjects/[id].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { Subject, timetable } from '../../lib/timetableData';
import styles from '../../styles/subjects.module.css';
import Link from 'next/link';

export default function SubjectDetail({ subject }: { subject: Subject | null }) {
  // 과목이 없을 경우
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

  // 과목이 있을 경우
  return (
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = timetable.map((subject) => ({
    params: { id: subject.id.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const subjectId = Number(id);

  // id가 유효한 숫자가 아닌 경우 처리
  if (isNaN(subjectId)) {
    return { props: { subject: null } };
  }

  const subject = timetable.find((s) => s.id === subjectId) || null;
  return { props: { subject } };
};
// src/pages/subjects/write.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '/src/styles/subjects.module.css';
import Link from 'next/link';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import { Subject, timetable } from '@/src/lib/timetableData';
import { createPost } from '@/src/lib/firestore';

export default function WritePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [studyTime, setStudyTime] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const router = useRouter();
  const { id } = router.query; // 쿼리 파라미터로 id 받음

  useEffect(() => {
    if (id) {
      const subjectId = Number(id);
      if (!isNaN(subjectId)) {
        const foundSubject = timetable.find((s) => s.id === subjectId) || null;
        setSubject(foundSubject);
      }
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || isNaN(Number(id))) {
      setError('유효한 과목 ID가 필요합니다. URL에 ?id=를 추가해 주세요.');
      return;
    }
    try {
      await createPost(Number(id), title, content, studyTime);
      router.push(`/subjects/${id}`);
    } catch (error) {
      console.error('게시물 작성 중 오류:', error);
      setError('게시물 작성에 실패했습니다.');
    }
  };

  if (!id || !subject) {
    return (
      <div className={styles.timetableContainer}>
        <p>과목을 찾을 수 없습니다. URL에 ?id=를 추가해 주세요.</p>
        <Link href="/main-page" passHref legacyBehavior>
          <a className={styles.backButton}>돌아가기</a>
        </Link>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.timetableContainer}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.timetableTitle}>게시글 작성 - {subject.subject}</h2>
          {error && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className={styles.writeForm}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
              className={styles.inputField}
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용"
              className={styles.textareaField}
              required
            />
            <input
              type="text"
              value={studyTime}
              onChange={(e) => setStudyTime(e.target.value)}
              placeholder="학습 시간 (예: 2시간)"
              className={styles.inputField}
              required
            />
            <button type="submit" className={styles.submitButton}>
              저장
            </button>
          </form>
          <Link href={`/subjects/${id}`} passHref legacyBehavior>
            <a className={styles.backButton}>취소</a>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
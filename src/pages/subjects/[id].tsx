// src/pages/subjects/[id].tsx (일부 수정)
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import styles from '/src/styles/subjects.module.css';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import LogoutButton from '../../components/LogoutButton';
import { Subject, timetable } from '../../lib/timetableData';
import { getPostsBySubject, updatePost, deletePost } from '../../lib/firestore';

interface Post {
  id: string;
  subjectId: number;
  title: string;
  content: string;
  studyTime?: string;
  completed: boolean;
  createdAt: string;
  userId: string;
}

export default function SubjectDetail({ subject }: { subject: Subject | null }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editStudyTime, setEditStudyTime] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchPosts(Number(id));
    }
  }, [id]);

  const fetchPosts = async (subjectId: number) => {
    try {
      const postsData = await getPostsBySubject(subjectId);
      setPosts(postsData);
    } catch (error) {
      console.error('게시물 로드 중 오류:', error);
      setError('게시물을 로드하는 데 실패했습니다.');
    }
  };

  const handleEdit = (post: Post) => {
    setEditPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditStudyTime(post.studyTime || '');
  };

  const handleUpdate = async () => {
    if (editPostId) {
      try {
        await updatePost(editPostId, editTitle, editContent, editStudyTime);
        setEditPostId(null);
        setEditTitle('');
        setEditContent('');
        setEditStudyTime('');
        fetchPosts(Number(id));
      } catch (error) {
        console.error('게시물 수정 중 오류:', error);
        setError('게시물 수정에 실패했습니다.');
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      fetchPosts(Number(id));
    } catch (error) {
      console.error('게시물 삭제 중 오류:', error);
      setError('게시물 삭제에 실패했습니다.');
    }
  };

  if (!subject) {
    return (
      <div className={styles.timetableContainer}>
        <p>과목을 찾을 수 없습니다.</p>
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
          <h2 className={styles.timetableTitle}>{subject.subject}</h2>
          <div className={styles.detailsBlock}>
            <div className={styles.detailItem}>교수: {subject.professor}</div>
            <div className={styles.detailItem}>장소: {subject.location}</div>
            <div className={styles.detailItem}>
              시간:{' '}
              {subject.times.map((t) => `${t.day} ${t.startTime} ~ ${t.endTime}`).join(', ')}
            </div>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}

          <div className={styles.boardSection}>
            <h3 className={styles.boardTitle}>게시판</h3>
            <Link href={`/subjects/write?id=${id}`} passHref legacyBehavior>
              <a className={styles.writeButton}>글쓰기</a>
            </Link>
            <div className={styles.postList}>
              {posts.length === 0 ? (
                <p className={styles.noPosts}>게시물이 없습니다.</p>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className={styles.postItem}>
                    {editPostId === post.id ? (
                      <>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className={styles.inputField}
                        />
                        <input
                          type="text"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className={styles.inputField}
                        />
                        <input
                          type="text"
                          value={editStudyTime}
                          onChange={(e) => setEditStudyTime(e.target.value)}
                          className={styles.inputField}
                        />
                        <button onClick={handleUpdate} className={styles.saveButton}>
                          저장
                        </button>
                      </>
                    ) : (
                      <>
                        <div className={styles.postContent}>
                          <h4>{post.title}</h4>
                          <p>{post.content}</p>
                          <span>{post.studyTime} - {new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <button onClick={() => handleEdit(post)} className={styles.editButton}>
                          수정
                        </button>
                        <button onClick={() => handleDelete(post.id)} className={styles.deleteButton}>
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link href="/main-page" passHref legacyBehavior>
              <a className={styles.backButton}>돌아가기</a>
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
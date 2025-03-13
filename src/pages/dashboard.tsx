// src/pages/dashboard.tsx
import { useState, useEffect } from 'react';
import LogoutButton from '../components/LogoutButton';
import { getPosts } from '../lib/firestore';
import styles from '../styles/Home.module.css';

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

type PostType = Post;

export default function Dashboard() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsData = await getPosts();
      setPosts(postsData);
      console.log('로드된 posts 데이터:', postsData);
    } catch (error) {
      console.error('게시물 로드 중 오류:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles['dashboard-title']}>대시보드</h1>
      <LogoutButton />
      <ul className={styles['post-list']}>
        {posts.length === 0 ? (
          <p>게시물이 없습니다.</p>
        ) : (
          posts.map((post: PostType) => (
            <li key={post.id} className={styles['post-item']}>
              {post.title} - {post.content} - {post.studyTime}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
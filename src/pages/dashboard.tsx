// src/pages/dashboard.tsx
import { useState, useEffect } from 'react';
import LogoutButton from '../components/LogoutButton';
import { createPost, getPosts } from '../lib/firestore';
import styles from '../styles/Home.module.css';

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Array<{ id: string; title: string; content: string }>>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const handleSubmit = async () => {
    await createPost(title, content);
    setTitle('');
    setContent('');
    fetchPosts();
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.mainContent}>
        <h1>나만 볼 수 있는 대시보드</h1>
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            style={{ margin: '10px', padding: '5px', width: '200px' }}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용"
            style={{ margin: '10px', padding: '5px', width: '200px', height: '100px' }}
          />
          <div className={styles.callToActions}>
            <button
              onClick={handleSubmit}
              className={styles.primaryLink}
            >
              게시물 추가
            </button>
          </div>
        </div>
        <h2>내 게시물</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>: {post.content}
            </li>
          ))}
        </ul>
        <LogoutButton />
      </div>
    </div>
  );
}
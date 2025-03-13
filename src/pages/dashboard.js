import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import LogoutButton from '../components/LogoutButton';
import { createPost, getPosts } from '../lib/firestore';

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

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
    <ProtectedRoute>
      <h1>나만 볼 수 있는 대시보드</h1>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
        />
        <button onClick={handleSubmit}>게시물 추가</button>
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
    </ProtectedRoute>
  );
}
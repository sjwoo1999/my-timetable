// lib/firestore.ts
import { collection, addDoc, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
}

export async function createPost(title: string, content: string): Promise<void> {
  const user = auth.currentUser;
  if (user) {
    await addDoc(collection(db, 'posts'), {
      title,
      content,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    });
  } else {
    throw new Error('로그인이 필요합니다.');
  }
}

export async function getPosts(): Promise<Post[]> {
  const user = auth.currentUser;
  if (user) {
    const q = query(collection(db, 'posts'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];
  }
  return [];
}
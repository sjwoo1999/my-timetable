// src/lib/firestore.ts
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getDb, getAuthInstance } from '../firebaseConfig';

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

export async function createPost(subjectId: number, title: string, content: string, studyTime: string): Promise<void> {
  const db = getDb();
  const auth = getAuthInstance();
  const user = auth.currentUser;
  if (user) {
    await addDoc(collection(db, 'posts'), {
      subjectId,
      title,
      content,
      studyTime,
      completed: false,
      createdAt: new Date().toISOString(),
      userId: user.uid,
    });
  } else {
    throw new Error('로그인이 필요합니다.');
  }
}

export async function getPostsBySubject(subjectId: number): Promise<Post[]> {
  const db = getDb();
  const auth = getAuthInstance();
  const user = auth.currentUser;
  if (user) {
    const q = query(collection(db, 'posts'), where('subjectId', '==', subjectId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];
  }
  return [];
}

export async function getPosts(): Promise<Post[]> {
  const db = getDb();
  const auth = getAuthInstance();
  const user = auth.currentUser;
  if (user) {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    return querySnapshot.docs
      .filter((doc) => doc.data().userId === user.uid)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
  }
  return [];
}

export async function updatePost(id: string, title: string, content: string, studyTime: string): Promise<void> {
  const db = getDb();
  const auth = getAuthInstance();
  const user = auth.currentUser;
  if (user) {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, {
      title,
      content,
      studyTime,
    });
  } else {
    throw new Error('로그인이 필요합니다.');
  }
}

export async function deletePost(id: string): Promise<void> {
  const db = getDb();
  const auth = getAuthInstance();
  const user = auth.currentUser;
  if (user) {
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef);
  } else {
    throw new Error('로그인이 필요합니다.');
  }
}
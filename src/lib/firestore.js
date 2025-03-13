import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

export async function createPost(title, content) {
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

export async function getPosts() {
  const user = auth.currentUser;
  if (user) {
    const q = query(collection(db, 'posts'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return [];
}
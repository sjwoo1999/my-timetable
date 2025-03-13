// src/firebaseConfig.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase 환경 변수 타입 정의
interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 환경 변수 누락 시 오류 로그 추가
if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
  console.error('Firebase 환경 변수가 누락되었습니다. .env.local 파일을 확인하세요:', {
    apiKey: firebaseConfig.apiKey,
    projectId: firebaseConfig.projectId,
    appId: firebaseConfig.appId,
  });
  throw new Error('Firebase 초기화 실패: 환경 변수 누락');
}

// Firebase 초기화 상태 관리
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

// 동적 초기화 함수
export const initializeFirebase = () => {
  if (typeof window !== 'undefined') {
    if (!app) {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
      console.log('Firebase 클라이언트 초기화 완료:', app.name);
      console.log('Firestore 클라이언트 초기화 확인:', db ? '성공' : '실패');
    }
  }
  return { app, auth, db };
};

// Firestore 인스턴스 반환
export const getDb = (): Firestore => {
  if (!db) {
    initializeFirebase();
    if (!db) {
      throw new Error('Firestore db 초기화 실패');
    }
  }
  return db;
};

// Auth 인스턴스 반환
export const getAuthInstance = (): Auth => {
  if (!auth) {
    initializeFirebase();
    if (!auth) {
      throw new Error('Firebase Auth 초기화 실패');
    }
  }
  return auth;
};
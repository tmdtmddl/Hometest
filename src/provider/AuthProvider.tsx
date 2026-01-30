import { useState, useEffect, ReactNode } from "react";
import { context } from "../contexts/context";
import { auth, googleProvider } from "../firebase/firebase";
import type { PromiseResult } from "../contexts/context";
import type firebase from "firebase/compat/app";

// context.ts에서 정의(타입,초기값)한 걸 실제로 구현(파이어베이스연결과 실제 값제공)하는 곳
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [isPending, setIsPending] = useState(true);

  // Firebase Auth 상태 감지
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((fbUser) => {
      setUser(fbUser);
      setInitialized(true);
      setIsPending(false);
    });
    return unsubscribe;
  }, []);

  // 구글 로그인
  const signInWithGoogle = async (): Promise<PromiseResult> => {
    try {
      setIsPending(true);
      await auth.signInWithPopup(googleProvider);
      return { success: true };
    } catch (error: any) {
      console.error("로그인 실패:", error);
      return { success: false, error: error.message };
    } finally {
      setIsPending(false);
    }
  };

  // 로그아웃
  const signout = async (): Promise<PromiseResult> => {
    try {
      setIsPending(true);
      await auth.signOut();
      return { success: true };
    } catch (error: any) {
      console.error("로그아웃 실패:", error);
      return { success: false, error: error.message };
    } finally {
      setIsPending(false);
    }
  };

  return (
    <context.Provider
      value={{
        user,
        initialized,
        isPending,
        signInWithGoogle,
        signout,
      }}
    >
      {children}
    </context.Provider>
  );
};

// 여기서 중요한 것들:
// context.Provider ← context 안에 들어있던 Provider를 꺼내 씀
// value에 실제 값을 넣어줌 (초기값 대신 진짜 user, 진짜 함수들)

//AuthProvider가 context.Provider 쓰고 있네
// 그럼 AuthProvider의 value에 있는 실제 값 가져다줘야지

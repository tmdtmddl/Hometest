import { useState, useEffect, ReactNode } from "react";
import { context } from "../contexts/context";
import { auth, googleProvider } from "../firebase/firebase";
import type { PromiseResult } from "../contexts/context";

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

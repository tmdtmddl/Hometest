import { auth, googleProvider } from "./firebase";

// 구글 로그인
export const signInWithGoogle = async () => {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google 로그인 실패:", error);
    throw error;
  }
};

// 로그아웃
export const logout = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
};

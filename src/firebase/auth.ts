import { auth, googleProvider } from "./firebase";
import type firebase from "firebase/compat/app";

// 구글 로그인
export const signInWithGoogle = async (): Promise<firebase.User> => {
  //시간이 걸리니까 비동기 함수로 만듦
  try {
    //아래 코드 실행하고 에러나면 catch로 가도록 함 (안전망)
    const result = await auth.signInWithPopup(googleProvider); // 비동기함수니까 await 붙임(로그인 완료될때 까지 기다려라)
    //signInWithPopup = 팝업 창을 열어서 구글 로그인 진행, auth = 로그인 담당, googleProvider = 구글로그인을 할려고 만든 열쇠
    if (!result.user) {
      throw new Error("Google 로그인 실패!"); // null이면 바로 에러
    }
    return result.user; // 로그인 완료시 result 안에서 user 정보 꺼내서 반환
  } catch (error) {
    console.error("Google 로그인 실패:", error);
    throw error; // 에러를 밖으로 던져서 호출한 쪽에
  }
};

// 로그아웃
export const logout = async (): Promise<void> => {
  // async 함수는 항상 Promise를 반환함 (여기서는 반환값이 없으니까 Promise<void>) (Promise = "약속")
  try {
    await auth.signOut(); //auth한테 로그아웃 부탁하기
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error; // 에러를 호출한곳에 던지기
  }
};

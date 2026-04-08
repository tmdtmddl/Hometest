import { useContext, createContext } from "react";
import firebase from "firebase/compat/app";

export type PromiseResult = {
  //! 로그인이나 로그아웃함수가 성공인지 실패인지 알려줄려고 Promise를 반환하는 함수에 사용
  success?: boolean; //성공했어? true/false
  error?: string; //실패했으면 에러 메시지를 보내야 해서
};

// 1. Context 타입 정의
export interface Context {
  user: firebase.User | null; // 현재 로그인한 유저 (로그인 안했으면 null)
  initialized: boolean; // Firebase 초기화 완료 여부
  isPending: boolean; // 로딩 중인지
  signInWithGoogle: () => Promise<PromiseResult>; // 구글 로그인 함수 (시간이 걸리니까 promise 반환)
  signout: () => Promise<PromiseResult>; // 로그아웃 함수
}
// 2. 초기값 설정
export const initialState: Context = {
  user: null,
  initialized: false,
  isPending: true,
  signInWithGoogle: async () => ({}), // 빈 함수 (나중에 AuthProvider에서 실제 구현)
  signout: async () => ({}),
};
// 3. Context 생성
export const context = createContext(initialState);

// context 객체 안에는 2개가 들어있어:
// context.Provider   // ← 이게 바로 감싸는 컴포넌트
// context.Consumer   // ← 옛날 방식 (요즘은 useContext 씀)

// 4. 편리하게 사용하기 위한 커스텀 훅
export const useAuth = () => useContext(context); //어디서든 user, signInWithGoogle 같은 걸 꺼내 쓸 수 있는 훅

// context.ts          → 타입 정의만 (인터페이스), 전역 상태 저장소 역할임
// AuthProvider.tsx    → 실제 구현 (Firebase 로직)

// 다듬는 중 입니다.

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

//  (파이어베이스를 중복으로 켜지 않게 막는 안전장치)
if (!firebase.apps.length) {
  //firebase.apps.length = 켜진 파이어베이스 앱이 몇 개 있는지 숫자
  firebase.initializeApp(firebaseConfig);
} //Todo: 아직 파이어베이스가 켜져 있지 않다면 딱 한 번만 켜라 (이미 켜져있으면 다시 초기화하지마라)

export const auth = firebase.auth(); //로그인 담당 부서 (로그인을 담당하는 도구를 꺼내서 auth라는 이름으로 저장)
export const googleProvider = new firebase.auth.GoogleAuthProvider(); //구글 계정으로 로그인할 수 있는 도구를 꺼냄 (구글 로그인 전용 열쇠를 하나 만들어 둠)
export const db = firebase.firestore(); //데이터 저장소를 꺼냄 (데이터를 저장하고 읽는 창고를 db로 준비)

export default firebase; //firebase 자체를 통째로 쓰고 싶을 때를 대비한 내보내기 (ex.firebase.firestore.Timestamp)

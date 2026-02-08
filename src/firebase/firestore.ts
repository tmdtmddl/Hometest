import { db, FBCollection } from "./firebase";

// ===== Todo CRUD =====

// Todo 추가
export const addTodo = async (
  // todo 추가 함수
  userId: string, // 누구의 todo인지 구분위한 userId
  text: string // 추가하는 todo내용
): Promise<string> => {
  // 함수 완료시 문자열함수 반환 (문자열 = 추가된 todo의 id)
  const todoRef = await db // db는 파이어베이스 / todoRef = 저장된 투두의 주소를 담는 상자
    .collection(`users/${userId}/${FBCollection.TODOS}`) // 추가시 사용할 컬렉션 경로
    .add({
      text, // text만 저장  (add = Firestore가 자동id를 만들어서 저장하는 기능)
    });
  return todoRef.id; // 저장된 투두의 id 반환 (나중에 삭제나 수정시 필요한것은 id뿐이라서))
};

// Todo 목록 가져오기
export const getTodos = async (userId: string): Promise<Todo[]> => {
  //Todo: userId를 받아서 Promise로 Todo 배열로 반환할 거임
  const snapshot = await db // snapshot = 사진(현재 데이터의 스냅샷)
    .collection(`users/${userId}/${FBCollection.TODOS}`) // 특정 유저의 todos 컬렉션 경로
    .get(); // get() = 해당 컬렉션의 모든 문서 가져오기
  return snapshot.docs.map((doc) => ({
    //snapshot.docs = 실제 문서들만 담긴 배열 (snapshot은 엄청많은 정보 들음 필요한거 문서들이라서 docs 사용)
    //snapshot.docs.map = 가져온 투두들의 목록 (배열) map으로 각 todo를 하나씩 꺼내서 변환 (doc = 각각 todo 문서)
    id: doc.id, //doc.id를 id로 사용
    text: doc.data().text, //! doc.data().text = 문서 안의 데이터를 꺼내서 그 안에서 text만 꺼내기
  }));
};

// Todo 삭제
export const deleteTodo = async (
  userId: string,
  todoId: string
): Promise<void> => {
  await db
    .collection(`users/${userId}/${FBCollection.TODOS}`)
    .doc(todoId)
    .delete();
};

// ===== WorkDay CRUD =====

// 근무일 추가/수정 (날짜별로 하나만 존재)
export const setWorkDay = async (
  userId: string,
  date: string,
  minutesWorked: number
): Promise<void> => {
  await db
    .collection(`users/${userId}/${FBCollection.WORKDAYS}`)
    .doc(date)
    .set({
      date,
      minutesWorked,
    });
};

// 특정 월의 근무일 가져오기 (예: "2026-01")
export const getWorkDays = async (
  userId: string,
  yearMonth: string
): Promise<WorkDay[]> => {
  const snapshot = await db
    .collection(`users/${userId}/${FBCollection.WORKDAYS}`)
    .where("date", ">=", `${yearMonth}-01`)
    .where("date", "<=", `${yearMonth}-31`)
    .get();

  return snapshot.docs.map((doc) => doc.data() as WorkDay);
};

// 전체 근무일 가져오기
export const getAllWorkDays = async (userId: string): Promise<WorkDay[]> => {
  const snapshot = await db
    .collection(`users/${userId}/${FBCollection.WORKDAYS}`)
    .get();
  return snapshot.docs.map((doc) => doc.data() as WorkDay);
};

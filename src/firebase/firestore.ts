import { db } from "./firebase";

// ===== Todo CRUD =====

// Todo 추가
export const addTodo = async (
  userId: string,
  text: string
): Promise<string> => {
  const todoRef = await db.collection(`users/${userId}/todos`).add({
    text,
    createdAt: new Date(), //Todo: 정렬사용안할건데???
  });
  return todoRef.id;
};

// Todo 목록 가져오기
export const getTodos = async (userId: string): Promise<Todo[]> => {
  const snapshot = await db.collection(`users/${userId}/todos`).get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    text: doc.data().text,
  }));
};

// Todo 삭제
export const deleteTodo = async (
  userId: string,
  todoId: string
): Promise<void> => {
  await db.collection(`users/${userId}/todos`).doc(todoId).delete();
};

// ===== WorkDay CRUD =====

// 근무일 추가/수정 (날짜별로 하나만 존재)
export const setWorkDay = async (
  userId: string,
  date: string,
  minutesWorked: number
): Promise<void> => {
  await db.collection(`users/${userId}/workDays`).doc(date).set({
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
    .collection(`users/${userId}/workDays`)
    .where("date", ">=", `${yearMonth}-01`)
    .where("date", "<=", `${yearMonth}-31`)
    .get();

  return snapshot.docs.map((doc) => doc.data() as WorkDay);
};

// 전체 근무일 가져오기
export const getAllWorkDays = async (userId: string): Promise<WorkDay[]> => {
  const snapshot = await db.collection(`users/${userId}/workDays`).get();
  return snapshot.docs.map((doc) => doc.data() as WorkDay);
};

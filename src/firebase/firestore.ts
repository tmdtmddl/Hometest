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
    id: doc.id, //doc.id를 id로 사용 (문서 아이디는 자동으로 만들어졌으니까 삭제나 수정시 필요해서 따로 지정해 주는 것,key로 사용 가능)
    text: doc.data().text, //! doc.data().text = 문서 안의 데이터를 꺼내서 그 안에서 text만 꺼내기
  }));
};

// Todo 수정
export const updateTodo = async (
  userId: string, // 누구의 todo인지
  todoId: string, // 어떤 todo인지
  newText: string // 수정할 내용
): Promise<void> => {
  await db
    .collection(`users/${userId}/${FBCollection.TODOS}`) // 특정 유저의 todos 컬렉션 경로
    .doc(todoId) // 특정 todo 문서
    .update({
      text: newText, // 찾은 문서의 text를 newText로 바꾸기(업데이트), 일부만 수정 = update
    });
};

// Todo 삭제
export const deleteTodo = async (
  userId: string, // 누구의 todo인지 구분위한 것
  todoId: string // 어떤 todo를 삭제 구분
): Promise<void> => {
  // 비동기 함수 프로미스 반환 근데 반환값은 없다.
  await db
    .collection(`users/${userId}/${FBCollection.TODOS}`) // 특정 투두 폴더 찾기
    .doc(todoId) // 특정 투두 문서를 찾기
    .delete(); // 삭제
};

// ===== WorkDay CRUD =====

//Todo: 근무일 추가/수정 (날짜별로 하나만 존재)
export const setWorkDay = async (
  // 근무일 자장
  userId: string, //누구의 근무일
  date: string, // 언제 일했나
  minutesWorked: number // 몇분 일했나
): Promise<void> => {
  // 반환값 없음
  await db
    .collection(`users/${userId}/${FBCollection.WORKDAYS}`) // 특정 유저의 근무일 문서 찾기
    .doc(date) //특정 날짜 문서 찾기 (날짜는 하루만 존재하니까 id로 사용)
    .set({
      // 문서 없으면 새로 저장, 있으면 덮어 쓰기
      date, // 날짜랑 일한 시간 저장
      minutesWorked,
    });
};

//Todo: 특정 월의 근무일 가져오기 (예: "2026-01")
export const getWorkDays = async (
  userId: string, // 누구 근무일 인가
  yearMonth: string // 몇월의 데이터인가 (형식: "YYYY-MM")
): Promise<WorkDay[]> => {
  //! 함수 완료시 WorkDay 배열 봔환
  const snapshot = await db // snapshot = 가져온 데이터 사진
    .collection(`users/${userId}/${FBCollection.WORKDAYS}`) // 특정 유저 근무일 폴더 찾기
    .where("date", ">=", `${yearMonth}-01`) //! where = 조건 걸어서 필터링 (date가 yearMonth-01보다 크거나 같고 yearMonth-31보다 작거나 같은 문서들만 가져오기!)
    .where("date", "<=", `${yearMonth}-31`)
    .get(); //! 조건에 맞는 근무일 문서를 가져오기

  return snapshot.docs.map((doc) => doc.data() as WorkDay); // snapshot.docs (= 가져온 근무일들의 배열)을 map으로 돌면서 각 문서를 꺼내는데 workday타입 형태로 가져오라고 알리기
}; // 문서안에 date가 있으니까 따로 아이디를 알려주지 않아도 됨 (date가 아이디 역할을 하니까)

//Todo: 전체 근무일 가져오기 (1년치 월급 계산시 필요: 통계)
export const getAllWorkDays = async (userId: string): Promise<WorkDay[]> => {
  // 누구의 근무일인가 = userId (불러올 유저가 누구인지 구분위해)
  const snapshot = await db
    .collection(`users/${userId}/${FBCollection.WORKDAYS}`) // 특정 유저의 근무일 폴더 찾기
    .get(); // 문서 가져오기 (전체니까 조건 없이 )
  return snapshot.docs.map((doc) => doc.data() as WorkDay); // snapshot.docs (= 가져온 근무일들의 배열)을 map으로 돌면서 각 문서를 꺼내는데 workday타입 형태로 가져오라고 알리기
};

// ======= 시급 =======

// 시급 저장
export const setHourlyWage = async (
  userId: string,
  wage: number
): Promise<void> => {
  await db.collection(`users`).doc(userId).set(
    {
      hourlyWage: wage,
    },
    { merge: true } // 기존 데이터 유지하면서 업데이트
  );
};

// 시급 가져오기
export const getHourlyWage = async (userId: string): Promise<number> => {
  const doc = await db.collection(`users`).doc(userId).get();
  const data = doc.data();
  return data?.hourlyWage || 0; // 없으면 0 반환
};

// ==== 월급계산 ====

// 특정 월의 총 월급 계산
export const calculateMonthlySalary = async (
  userId: string,
  yearMonth: string // "2026-01"
): Promise<number> => {
  // 1. 해당 월의 근무일 가져오기
  const workDays = await getWorkDays(userId, yearMonth);

  // 2. 총 근무시간(분) 계산
  const totalMinutes = workDays.reduce((sum, day) => {
    return sum + (day.minutesWorked || 0);
  }, 0);

  // 3. 시급 가져오기
  const hourlyWage = await getHourlyWage(userId);

  // 4. 월급 계산 (분 → 시간, 시간 × 시급)
  const totalHours = totalMinutes / 60;
  const salary = totalHours * hourlyWage;

  return Math.round(salary); // 소수점 제거
};

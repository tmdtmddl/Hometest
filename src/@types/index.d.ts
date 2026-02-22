interface Todo {
  id: string; // 나중에 삭제나 수정시 필요한 고유 id
  text: string;
}

interface WorkDay {
  date: string; // "2026-01-24"
  minutesWorked?: number; // minutesWorked > 0 → 출근한 날 (색칠), minutesWorked === 0 → 출근 안 한 날  => 월급 계산 → minutesWorked 합산
}

type UserSettings = {
  hourlyWage: number; // 유저의 시급 정보 (월급 계산시 필요)
};

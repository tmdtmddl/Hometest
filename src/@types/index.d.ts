interface Todo {
  id: string;
  text: string;
}

interface WorkDay {
  date: string; // "2026-01-24"
  minutesWorked?: number; // minutesWorked > 0 → 출근한 날 (색칠), minutesWorked === 0 → 출근 안 한 날  => 월급 계산 → minutesWorked 합산
}

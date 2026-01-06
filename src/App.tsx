"use client";

import { useState } from "react";

export default function Home() {
  // const [loading, setLoading] = useState(false);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setLoading(true);

  //     // 실제 업로드 API 연결 대신 타이머로 시뮬레이션
  //     setTimeout(() => {
  //       setLoading(false);
  //       alert("업로드 완료!");
  //     }, 3000);
  //   }
  // };

  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    //   <h1 className="text-2xl font-bold mb-4 border p-4 rounded-2xl bg-white">
    //     동영상 업로드
    //   </h1>

    //   <input
    //     type="file"
    //     accept="video/*"
    //     onChange={handleFileChange}
    //     className="mb-4 border"
    //   />

    //   {loading && (
    //     <div className="flex flex-col items-center">
    //       <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full" />
    //       <p className="mt-2 text-gray-700">업로드 중 입니다...</p>
    //     </div>
    //   )}
    // </div>
    <div className="border min-h-32">
      <p>hellow</p>
    </div>
  );
}

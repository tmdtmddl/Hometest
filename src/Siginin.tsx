import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/context";
import { FaGoogle } from "react-icons/fa";

const Signin = () => {
  const { user, isPending, signInWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const onGoogleLogin = async () => {
    setError(null);
    const result = await signInWithGoogle();
    if (!result.success) {
      setError(result.error || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-sky-100 rounded-2xl shadow-sm p-6 text-center">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-2xl font-extrabold text-gray-800">
            알바일지 로그인
          </h1>
          <p className="text-sm text-gray-500">
            구글 로그인으로만 이용할 수 있어요.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoogleLogin}
          disabled={isPending}
          className="w-full h-12 rounded-xl bg-sky-400 text-white font-bold hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? (
            "로그인 중..."
          ) : (
            <span className="inline-flex items-center justify-center gap-2">
              <FaGoogle />
              <span>로그인</span>
            </span>
          )}
        </button>

        {error && (
          <p className="mt-3 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signin;
// 로그인 페이지 컴포넌트
// ing

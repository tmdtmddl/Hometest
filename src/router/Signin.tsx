import { FormEvent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../context";

const Signin = () => {
  const { user } = AUTH.use();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navi = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const { signin } = AUTH.use();
  const eFocus = () => {
    emailRef.current?.focus();
  };
  const pFocus = () => {
    pwRef.current?.focus();
  };

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (email.length === 0) {
        alert("이메일을 입력해주세요.");
        return eFocus();
      }
      if (!email.includes("@")) {
        alert("@를 입력해주세요.");
        return eFocus();
      }
      if (!email.includes(".")) {
        alert(".를 입력해주세요.");
        return eFocus();
      }
      const split1 = email.split("@");
      if (split1[1].length === 0) {
        alert("@뒤를 입력해주세요.");
        return eFocus();
      }
      const split2 = split1[1].split(".");
      if (split2[1].length === 0) {
        alert(".뒤를 작성해주세요.");
        return eFocus();
      }
      if (split2[1].length - 1 === 0) {
        alert(".뒤를 작성해주세요.");
        return eFocus();
      }
      if (password.length === 0) {
        alert("비밀번호를 입력해주세요.");
        return pFocus();
      }
      if (!user) {
        alert("존재 ㄴㄴ");
        if (confirm("회원가입???")) {
          return navi("/Signup");
        }
        return navi("/");
      }

      const { success, message } = await signin(email, password);
      if (!success && message) {
        return alert(message);
      }
      alert(`${user.email}님 환영합니다.`);
      navi("/product");
      return;
    },
    [email, password, navi, user, signin]
  );
  return (
    <form
      action=""
      onSubmit={onSubmit}
      className="mx-auto border max-w-150 items-center flex flex-col gap-y-4 mt-20 p-5 rounded bg-gray-50"
    >
      <div className="flex flex-col  gap-y-2.5 w-100">
        <div className="flex flex-col">
          <label htmlFor="">이메일</label>
          <input
            ref={emailRef}
            type="text"
            className="border bg-white "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요."
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">비밀번호</label>
          <input
            ref={pwRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border bg-white"
            placeholder="*****"
          />
        </div>
      </div>
      <button className="border bg-teal-700 text-white p-1 rounded">
        로그인
      </button>
    </form>
  );
};

export default Signin;

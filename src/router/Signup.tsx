import React, { FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../context";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navi = useNavigate();
  const { signup } = AUTH.use();
  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (email.length === 0) {
        return alert("이메일을 입력해주세요.");
      }
      if (!email.includes("@")) {
        return alert("@를 입력해주세요.");
      }
      if (!email.includes(".")) {
        return alert(".를 입력해주세요.");
      }
      const split1 = email.split("@");
      if (split1[1].length === 0) {
        return alert("@뒤를 입력해주세요.");
      }
      const split2 = split1[1].split(".");
      if (split2[1].length === 0) {
        return alert(".뒤를 작성해주세요.");
      }
      if (split2[1].length - 1 === 0) {
        return alert(".뒤를 작성해주세요.");
      }
      if (password.length === 0) {
        return alert("비밀번호를 입력해주세요.");
      }
      if (password !== checkPassword) {
        return alert("비밀번호가 일치하지 않습니다.");
      }

      //   유저가회원가입하고 데이터베이스에 저장
      const newUser: User = { email, uid: "", password };
      const { message, success } = await signup(newUser, password);
      if (!success && message) {
        return alert(message);
      }

      alert("회원가입을 축하합니다.");
      setEmail("");
      setPassword("");
      return navi("/");
    },
    [email, password, navi, checkPassword, signup]
  );

  return (
    <form
      action=""
      onSubmit={onSubmit}
      className="mx-auto border max-w-150 items-center flex flex-col gap-y-4 mt-20 p-5 rounded bg-gray-50"
    >
      <div className="flex flex-col  gap-y-2.5 w-100">
        <div className="flex flex-col">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            className="border bg-white "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요."
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="pw">비밀번호</label>
          <input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border bg-white"
            placeholder="******"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="cpw">비밀번호확인</label>
          <input
            id="cpw"
            type="password"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
            className="border bg-white"
            placeholder="********"
          />
        </div>
      </div>
      <button className="border bg-teal-700 text-white p-1 rounded">
        회원가입
      </button>
    </form>
  );
};

export default Signup;

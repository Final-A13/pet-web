"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/zustand/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import Swal from "sweetalert2";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, error, setError, user, signInWithGoogle, signInWithKakao } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signIn({ email, password });
    if (success) {
      Swal.fire({
        title: "success",
        text: "로그인이 완료되었습니다!",
        icon: "success"
      });
      router.push("/");
    }
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "error",
        text: "아이디와 비밀번호를 확인해주세요.",
        icon: "error"
      });
      setError(null);
    }
  }, [error, setError]);

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleKakaoSignIn = async () => {
    await signInWithKakao();
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="mx-auto mt-[5.5rem] min-h-screen lg:min-h-0">
      <div className="mx-auto w-full px-[16px]">
        <div className="flex items-center justify-center">
          <img src="/assets/svg/petCoco.svg" alt="petCocoLogo" />
        </div>
        <div className="mt-10 flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full gap-[1.25rem]">
            <div className="mt-[12px] h-[90px]">
              <label className="w-full text-center text-[15px] font-semibold">이메일</label>
              <div className="flex w-full items-center">
                <input
                  className="flex-grow rounded-[8px] border px-[16px] py-[12px] text-[0.9375rem] placeholder-[#999]"
                  type="email"
                  value={email}
                  placeholder="sparta@sparta.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="">
              <label className="w-full text-center text-[15px] font-semibold">비밀번호</label>
              <div className="flex w-full items-center">
                <input
                  className="flex-grow rounded-[8px] border px-[16px] py-[12px] text-[0.9375rem] placeholder-[#999]"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 작성해주세요"
                  required
                />
              </div>
            </div>
            <button
              className="mt-[4rem] w-full rounded-[0.5rem] border bg-mainColor text-[16px] text-white"
              type="submit"
            >
              <p className="p-[0.5rem]">로그인</p>
            </button>
            <button
              onClick={handleSignUp}
              className="mt-[1rem] w-full rounded-[0.5rem] border bg-mainColor text-[16px] text-white"
            >
              <p className="p-[0.5rem]">회원가입</p>
            </button>
          </form>
          {/* 소셜 로그인 임시 비활성화 */}
          {/* <div className="mt-4 flex w-full items-center justify-between">
            <div className="h-[1px] w-full border"></div>
            <p className="whitespace-nowrap px-[0.75rem] py-[0.5rem] text-[0.8125rem] text-[#999]">또는</p>
            <div className="h-[1px] w-full border"></div>
          </div>
          <div className="mt-4 flex w-full flex-col gap-4">
            <button
              onClick={handleKakaoSignIn}
              className="flex w-full items-center justify-center rounded-[0.5rem] bg-yellow-400 px-[2rem] py-[0.75rem]"
            >
              <RiKakaoTalkFill className="mr-2 h-[24px] w-[24px]" />
              <p className="text-[0.9375rem] font-medium">카카오 로그인</p>
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center rounded-[0.5rem] border border-[#CCC] bg-white px-[2rem] py-[0.75rem]"
            >
              <FcGoogle className="mr-2 h-[24px] w-[24px]" />
              <p className="text-[0.9375rem] font-medium text-[#697481]">Google 로그인</p>
            </button>
          </div> */}
          {error && <p style={{ color: "red" }}>(error)</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

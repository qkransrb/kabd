import Link from "next/link";
import { Check } from "lucide-react";

export const dynamic = "force-dynamic";

const FindPasswordConfirm = () => {
  return (
    <div className="max-w-screen-xl mx-auto h-[calc(100vh_-_140px)] flex items-center justify-center pb-20">
      <div className="flex flex-col items-center justify-center">
        <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mb-6">
          <Check size={40} color="white" />
        </div>
        <h2 className="max-w-[208px] text-[30px] font-bold custom-letter-spacing leading-[35.8px] text-center mb-10 whitespace-nowrap">
          비밀번호 재설정이
          <br />
          완료되었습니다.
        </h2>
        <Link
          href="/sign-in"
          className="h-[56px] w-[345px] rounded-[10px] text-lg text-white custom-letter-spacing font-semibold bg-[#2C2C2C] flex items-center justify-center"
        >
          로그인 하러가기
        </Link>
      </div>
    </div>
  );
};

export default FindPasswordConfirm;

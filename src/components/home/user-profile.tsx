"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { signOut } from "@/actions/auth-actions";

import profile01 from "@/assets/images/profile01.png";
import profile02 from "@/assets/images/profile02.png";
import profile03 from "@/assets/images/profile03.png";

const UserProfile = () => {
  const [user, setUser] = useState<LocalStorageUser | null>(null);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("kabd_user")!));
    }
  }, [user]);

  const router = useRouter();

  return (
    <div className="w-[414px] h-[441px] border border-[#D2D2D2] rounded-[20px] bg-white p-[34px] flex flex-col justify-between">
      <div className="flex justify-between">
        <div>
          <span className="text-[13px] text-[#595959] font-semibold custom-letter-spacing">
            {user?.type === "G" ? "치과의사" : "일반회원"}/
            {user?.grade !== "N" ? "정회원" : "비회원"}
          </span>
          <div className="space-x-1">
            <span className="text-[22px] font-semibold custom-letter-spacing underline">
              {user?.name}
            </span>
            <span className="text-[13px] font-semibold">님</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            signOut();
            window.localStorage.removeItem("kabd_user");
            router.refresh();
          }}
          className="w-[83px] h-7 rounded-[10px] border border-[#D2D2D2] flex items-center justify-center gap-1"
        >
          <span className="text-[13px] text-[#595959] font-medium custom-letter-spacing pt-0.5">
            로그아웃
          </span>
          <LogOut size={14} color="#595959" />
        </button>
      </div>
      <div className="pb-7">
        <Link
          href="/my-page/profile"
          className="h-[90px] flex items-center gap-4 border-b border-[#D9D9D9] group"
        >
          <div className="h-[70px] w-[70px] bg-[#F4F5FA] rounded-[10px] flex items-center justify-center">
            <Image src={profile01} alt="회원정보 수정" width={46} height={37} />
          </div>
          <p className="text-[25px] font-semibold custom-letter-spacing group-hover:underline underline-offset-4">
            회원정보 수정
          </p>
        </Link>
        <Link
          href="/my-page/payment"
          className="h-[90px] flex items-center gap-4 border-b border-[#D9D9D9] group"
        >
          <div className="h-[70px] w-[70px] bg-[#F4F5FA] rounded-[10px] flex items-center justify-center">
            <Image src={profile02} alt="입연회비" width={46} height={37} />
          </div>
          <div>
            <p className="text-[25px] font-semibold custom-letter-spacing group-hover:underline underline-offset-4">
              입연회비
            </p>
            <span className="text-xs font-medium custom-letter-spacing">
              납부내역 확인 / 영수증 출력
            </span>
          </div>
        </Link>
        <Link
          href="/my-page/conference"
          className="h-[90px] flex items-center gap-4 border-b border-[#D9D9D9] group"
        >
          <div className="h-[70px] w-[70px] bg-[#F4F5FA] rounded-[10px] flex items-center justify-center">
            <Image src={profile03} alt="학술대회" width={46} height={37} />
          </div>
          <div>
            <p className="text-[25px] font-semibold custom-letter-spacing group-hover:underline underline-offset-4">
              학술대회
            </p>
            <span className="text-xs font-medium custom-letter-spacing">
              등록내역 확인 / 취소신청 / 영수증 출력
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import profile01 from "@/assets/images/profile01.png";
import profile02 from "@/assets/images/profile02.png";
import profile03 from "@/assets/images/profile03.png";
import { cn } from "@/lib/utils";

const MyPageSidebar = () => {
  const [user, setUser] = useState<LocalStorageUser | null>(null);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("kabd_user")!));
    }
  }, [user]);

  const pathname = usePathname();

  return (
    <div>
      <div>
        <span className="text-[19px] lg:text-[21px] text-[#595959] font-semibold custom-letter-spacing">
          {user?.type === "G" ? "치과의사" : "일반회원"} /{" "}
          {user?.grade !== "N" ? "정회원" : "비회원"}
        </span>
        <div className="space-x-2 my-4">
          <span className="text-[25px] lg:text-[30px] font-semibold custom-letter-spacing underline underline-offset-4">
            {user?.name}
          </span>
          <span className="text-base font-semibold">님</span>
        </div>
        <div className="space-y-0.5 mb-9">
          <span className="block text-base text-[#595959] font-medium custom-letter-spacing">
            {user?.email}
          </span>
          <span className="block text-base text-[#595959] font-medium custom-letter-spacing">
            {user?.mobile}
          </span>
        </div>

        <div className="hidden lg:block">
          <Link
            href="/my-page/profile"
            className="h-[90px] flex items-center gap-4 border-b border-[#D9D9D9] group"
          >
            <div className="h-[70px] w-[70px] bg-[#F4F5FA] rounded-[10px] flex items-center justify-center">
              <Image src={profile01} alt="회원정보" width={46} height={37} />
            </div>
            <div>
              <p
                className={cn(
                  "text-[25px] font-semibold custom-letter-spacing group-hover:underline underline-offset-4",
                  pathname.includes("profile") && "underline underline-offset-4"
                )}
              >
                회원정보
              </p>
              <span className="text-xs font-medium custom-letter-spacing">
                회원정보 수정 / 회원탈퇴
              </span>
            </div>
          </Link>
          <Link
            href="/my-page/payment"
            className="h-[90px] flex items-center gap-4 border-b border-[#D9D9D9] group"
          >
            <div className="h-[70px] w-[70px] bg-[#F4F5FA] rounded-[10px] flex items-center justify-center">
              <Image src={profile02} alt="입연회비" width={46} height={37} />
            </div>
            <div>
              <p
                className={cn(
                  "text-[25px] font-semibold custom-letter-spacing group-hover:underline underline-offset-4",
                  pathname.includes("payment") && "underline underline-offset-4"
                )}
              >
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
              <p
                className={cn(
                  "text-[25px] font-semibold custom-letter-spacing group-hover:underline underline-offset-4",
                  pathname.includes("conference") &&
                    "underline underline-offset-4"
                )}
              >
                학술대회
              </p>
              <span className="text-xs font-medium custom-letter-spacing">
                등록내역 확인 / 취소신청 / 영수증 출력
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPageSidebar;

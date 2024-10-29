"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type01 from "@/assets/images/signup-type01.png";
import type02 from "@/assets/images/signup-type02.png";

const MemberCategory = () => {
  const [signUpType, setSignUpType] = useState<string>("");

  const router = useRouter();

  const handleNextStep = () => {
    if (!signUpType) return;
    router.push(`/sign-up/${signUpType}`);
  };

  return (
    <div className="min-screen-height py-[98px] max-w-screen-xl mx-auto flex flex-col items-center">
      <h2 className="text-[30px] font-bold leading-[36px] mb-10">회원가입</h2>
      <div className="w-full">
        <h3 className="text-[26px] font-bold leading-[31.2px] mb-4">
          회원분류
        </h3>
        <Separator className="h-[3px] bg-[#111111] mb-11" />
        <div className="p-6 flex items-center justify-between gap-6 mb-[100px]">
          <button
            type="button"
            onClick={() => setSignUpType("dentist")}
            className={cn(
              "w-1/2 h-[371px] flex flex-col gap-9 items-center justify-center border border-[#D2D2D2] rounded-[20px] hover:border-[#828282] hover:bg-[#F4F5FA] hover:shadow-xl transition-all",
              signUpType === "dentist" &&
                "bg-[#F4F5FA] shadow-xl border-[#828282]"
            )}
          >
            <Image src={type01} alt="" width={133} height={118} />
            <p className="text-[30px] leading-[36px] font-bold">
              치과의사 회원가입
            </p>
          </button>
          <button
            type="button"
            onClick={() => setSignUpType("general")}
            className={cn(
              "w-1/2 h-[371px] flex flex-col gap-9 items-center justify-center border border-[#D2D2D2] rounded-[20px] hover:border-[#828282] hover:bg-[#F4F5FA] hover:shadow-xl transition-all",
              signUpType === "general" &&
                "bg-[#F4F5FA] shadow-xl border-[#828282]"
            )}
          >
            <Image src={type02} alt="" width={133} height={118} />
            <p className="text-[30px] leading-[36px] font-bold">
              치과의사 외 회원가입
            </p>
          </button>
        </div>
        <div className="flex items-center justify-center mb-[100px]">
          <Button
            disabled={!signUpType}
            onClick={handleNextStep}
            className="w-[345px] h-[56px] bg-[#2C2C2C] rounded-[10px] text-lg font-semibold"
          >
            다음 단계
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemberCategory;

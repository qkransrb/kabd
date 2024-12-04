"use client";

import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth-actions";
import { useState } from "react";

interface Props {
  authenticated: boolean;
  regularMember: boolean;
}

const MobileHeaderMenu = ({ authenticated, regularMember }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const onOpenChange = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleRoute = (href: string) => {
    regularMember
      ? router.push(href)
      : window.alert("정회원만 접근 가능합니다.");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Menu className="!size-7" />
      </SheetTrigger>
      <SheetContent side="right" className="h-fit bg-white/90">
        <SheetHeader>
          <SheetTitle hidden />
          <SheetDescription hidden />
        </SheetHeader>
        <div className="flex flex-col gap-3 py-10">
          <div>
            <SheetClose asChild>
              <Button
                variant="link"
                onClick={() => router.push("/introduction")}
                className="text-black text-[20px] font-bold custom-letter-spacing text-nowrap"
              >
                학회소개
              </Button>
            </SheetClose>
          </div>
          <div>
            <SheetClose asChild>
              <Button
                variant="link"
                onClick={() => router.push("/info")}
                className="text-black text-[20px] font-bold custom-letter-spacing text-nowrap"
              >
                회원가입안내
              </Button>
            </SheetClose>
          </div>
          <div>
            <SheetClose asChild>
              <Button
                variant="link"
                onClick={() => router.push("/conference")}
                className="text-black text-[20px] font-bold custom-letter-spacing text-nowrap"
              >
                학술대회안내
              </Button>
            </SheetClose>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="py-2 pl-4 text-black text-[20px] font-bold custom-letter-spacing text-nowrap">
                  학회소식
                </AccordionTrigger>
                <AccordionContent className="flex flex-col items-start">
                  <SheetClose asChild>
                    <Button
                      variant="link"
                      onClick={() => handleRoute("/notice")}
                      className="text-black text-sm font-medium custom-letter-spacing text-nowrap h-8"
                    >
                      공지사항
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="link"
                      onClick={() => handleRoute("/schedule")}
                      className="text-black text-sm font-medium custom-letter-spacing text-nowrap h-8"
                    >
                      주요일정
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="link"
                      onClick={() => router.push("/news")}
                      className="text-black text-sm font-medium custom-letter-spacing text-nowrap h-8"
                    >
                      보도자료
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="link"
                      onClick={() => handleRoute("/newsroom")}
                      className="text-black text-sm font-medium custom-letter-spacing text-nowrap h-8"
                    >
                      뉴스룸
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="link"
                      onClick={() => handleRoute("/gallery")}
                      className="text-black text-sm font-medium custom-letter-spacing text-nowrap h-8"
                    >
                      사진첩
                    </Button>
                  </SheetClose>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="py-2 pl-4 text-black text-[20px] font-bold custom-letter-spacing text-nowrap">
                  자료실
                </AccordionTrigger>
                <AccordionContent className="flex flex-col items-start">
                  <SheetClose asChild>
                    <Button
                      variant="link"
                      onClick={() => handleRoute("/reference-case")}
                      className="text-black text-sm font-medium custom-letter-spacing text-nowrap h-8"
                    >
                      Case 공유
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="link"
                      onClick={() => handleRoute("/abstract")}
                      className="text-black text-sm font-medium custom-letter-spacing text-nowrap h-8"
                    >
                      학술대회 초록집
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="link"
                      onClick={() => handleRoute("/video")}
                      className="text-black text-sm font-medium custom-letter-spacing text-nowrap h-8"
                    >
                      학술대회 강의영상
                    </Button>
                  </SheetClose>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        {authenticated ? (
          <div className="px-2">
            <button
              type="button"
              onClick={() => {
                signOut();
                window.localStorage.removeItem("kabd_user");
                setOpen(false);
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
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeaderMenu;

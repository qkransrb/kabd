import Link from "next/link";
import Image from "next/image";

import Logo from "@/assets/images/logo.png";
import Avatar from "@/assets/images/avatar.png";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/actions/auth-actions";

const Header = async () => {
  const authenticated = await isAuthenticated();

  return (
    <header className="max-w-[1920px] h-[140px] flex items-center w-full">
      <nav className="max-w-screen-xl mx-auto w-full flex items-center justify-between h-full">
        <Link href="/" className="flex-shrink-0">
          <h1 hidden>한국생체모방치의학회</h1>
          <Image
            src={Logo}
            alt="THE KOREAN ACADEMY OF BIOMIMETIC DENTISTRY"
            width={272}
            height={48}
            priority
          />
        </Link>
        <ul className="w-[709px] flex items-center gap-20 h-full">
          <li className="h-full flex items-center whitespace-nowrap group relative">
            <Link href="/introduction" className="text-header-navigation">
              학회소개
            </Link>
            <ul className="hidden group-hover:flex py-[18px] px-8 flex-col gap-y-[18px] absolute min-w-[131px] bg-white/70 backdrop-blur-[5px] top-[92px] -left-[60%] z-10 rounded-[10px]">
              <li className="w-full text-center">
                <Link
                  href="/introduction#introduction"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  학회소개
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/introduction#history"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  연혁
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/introduction#purpose"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  설립목적
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/introduction#regulations"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  회칙
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/introduction#executive"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  임원진 안내
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/introduction#location"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  사무국 안내
                </Link>
              </li>
            </ul>
          </li>
          <li className="h-full flex items-center whitespace-nowrap">
            <Link href="/info" className="text-header-navigation">
              회원가입안내
            </Link>
          </li>
          <li className="h-full flex items-center whitespace-nowrap">
            <Link href="/conference" className="text-header-navigation">
              학술대회안내
            </Link>
          </li>
          <li className="h-full flex items-center relative group whitespace-nowrap">
            <span className="text-header-navigation cursor-pointer">
              학회소식
            </span>
            <ul className="hidden group-hover:flex py-[18px] px-8 flex-col gap-y-[18px] absolute min-w-[131px] bg-white/70 backdrop-blur-[5px] top-[92px] -left-[50%] z-10 rounded-[10px]">
              <li className="w-full text-center">
                <Link
                  href="/notice"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  공지사항
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/schedule"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  주요일정
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/news"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  보도자료
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/newsroom"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  뉴스룸
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/gallery"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  사진첩
                </Link>
              </li>
            </ul>
          </li>
          <li className="h-full flex items-center relative group whitespace-nowrap">
            <span className="text-header-navigation cursor-pointer">
              자료실
            </span>
            <ul className="hidden group-hover:flex py-[18px] flex-col gap-y-[18px] absolute min-w-[150px] bg-white/70 backdrop-blur-[5px] top-[92px] -left-[90%] z-10 rounded-[10px]">
              <li className="w-full text-center">
                <Link
                  href="/reference-case"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  Case 공유
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/abstract"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  학술대회 초록집
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/video"
                  className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
                >
                  학술대회 강의영상
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <Button
          variant="ghost"
          className="w-[45px] h-[45px] p-0 rounded-full flex-shrink-0"
          asChild
        >
          <Link href={authenticated ? "/my-page/profile" : "/sign-in"}>
            <Image src={Avatar} alt="마이페이지" width={45} height={45} />
          </Link>
        </Button>
      </nav>
    </header>
  );
};

export default Header;

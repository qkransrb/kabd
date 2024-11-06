"use client";

import { useRouter } from "next/navigation";

interface Props {
  label: string;
  href: string;
  isRegularMember: boolean;
}

const HeaderLinkButton = ({ label, href, isRegularMember }: Props) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        isRegularMember
          ? router.push(href)
          : window.alert("정회원만 접근 가능합니다.");
      }}
      className="text-lg leading-[21.6px] text-[#595959] custom-letter-spacing font-semibold hover:text-black hover:underline underline-offset-4"
    >
      {label}
    </button>
  );
};

export default HeaderLinkButton;

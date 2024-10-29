import Image from "next/image";

import Logo from "@/assets/images/footer-logo.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#2C2C2C] w-full h-[420px] p-16">
      <div className="max-w-screen-xl h-full mx-auto flex flex-col justify-between">
        <Image src={Logo} alt="" width={278} height={49} />
        <div className="flex items-center gap-x-4">
          <Link href="/" className="footer-link">
            개인정보처리방침
          </Link>
          <span className="h-[11px] w-[1px] bg-[#7A7A7A]" />
          <Link href="/" className="footer-link">
            이용약관
          </Link>
          <span className="h-[11px] w-[1px] bg-[#7A7A7A]" />
          <Link href="/introduction" className="footer-link">
            오시는길
          </Link>
          <span className="h-[11px] w-[1px] bg-[#7A7A7A]" />
          <Link href="/introduction" className="footer-link">
            학회소개
          </Link>
        </div>
        <div className="space-y-3">
          <div className="space-x-1.5">
            <span className="footer-info-a">Address.</span>
            <span className="footer-info-q">
              서울특별시 강남구 언주로 728, 5층(논현동)
            </span>
          </div>
          <div className="flex items-center gap-x-10">
            <div className="space-x-1.5">
              <span className="footer-info-a">Tel.</span>
              <span className="footer-info-q">070-4217-2170</span>
            </div>
            <div className="space-x-1.5">
              <span className="footer-info-a">Fax.</span>
              <span className="footer-info-q">070-5153-3484</span>
            </div>
            <div className="space-x-1.5">
              <span className="footer-info-a">Mail.</span>
              <span className="footer-info-q">2021kabd@gmail.com</span>
            </div>
          </div>
        </div>
        <p className="text-[#8D8D8D] footer-phrase">
          ⓒ 2023. The Korean Academy of Biomimetic Dentistry Inc. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

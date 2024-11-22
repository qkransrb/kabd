import Image from "next/image";

import Logo from "@/assets/images/kabd-footer-logo.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#2C2C2C] w-full h-auto lg:h-[420px] px-5 py-11 lg:p-16">
      <div className="max-w-screen-xl h-full mx-auto flex flex-col justify-between">
        <Image
          src={Logo}
          alt=""
          width={272}
          height={56}
          className="hidden lg:block"
        />
        <Image
          src={Logo}
          alt=""
          width={213}
          height={40}
          className="lg:hidden mb-5"
        />
        <div className="flex items-center gap-x-4 mb-5 lg:mb-0">
          <Link
            href="/privacy-policy"
            className="footer-link text-xs lg:text-base"
          >
            개인정보처리방침
          </Link>
          <span className="h-[11px] w-[1px] bg-[#7A7A7A]" />
          <Link href="/terms" className="footer-link text-xs lg:text-base">
            이용약관
          </Link>
          <span className="h-[11px] w-[1px] bg-[#7A7A7A]" />
          <Link
            href="/introduction#location"
            className="footer-link text-xs lg:text-base"
          >
            오시는길
          </Link>
          <span className="h-[11px] w-[1px] bg-[#7A7A7A]" />
          <Link
            href="/introduction#introduction"
            className="footer-link text-xs lg:text-base"
          >
            학회소개
          </Link>
        </div>
        <div className="space-y-0 lg:space-y-3 mb-5 lg:mb-0">
          <div className="space-x-1.5">
            <span className="footer-info-a text-xs lg:text-base">Address.</span>
            <span className="footer-info-q text-xs lg:text-base">
              서울특별시 강남구 언주로 728, 5층(논현동)
            </span>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center lg:gap-x-10">
            <div className="space-x-1.5">
              <span className="footer-info-a text-xs lg:text-base">Tel.</span>
              <span className="footer-info-q text-xs lg:text-base">
                070-5153-2795
              </span>
            </div>
            <div className="space-x-1.5">
              <span className="footer-info-a text-xs lg:text-base">Fax.</span>
              <span className="footer-info-q text-xs lg:text-base">
                070-5153-3484
              </span>
            </div>
            <div className="space-x-1.5">
              <span className="footer-info-a text-xs lg:text-base">Mail.</span>
              <span className="footer-info-q text-xs lg:text-base">
                2021kabd@gmail.com
              </span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center lg:gap-x-10">
            <div className="space-x-1.5">
              <span className="footer-info-a text-xs lg:text-base">
                상호명.
              </span>
              <span className="footer-info-q text-xs lg:text-base">
                사단법인 한국 생체모방치의학회
              </span>
            </div>
            <div className="space-x-1.5">
              <span className="footer-info-a text-xs lg:text-base">
                사업자등록번호.
              </span>
              <span className="footer-info-q text-xs lg:text-base">
                404-82-10666
              </span>
            </div>
            <div className="space-x-1.5">
              <span className="footer-info-a text-xs lg:text-base">
                대표자.
              </span>
              <span className="footer-info-q text-xs lg:text-base">홍성욱</span>
            </div>
            <div className="space-x-1.5">
              <span className="footer-info-a text-xs lg:text-base">
                통신판매신고번호.
              </span>
              <span className="footer-info-q text-xs lg:text-base">
                2024-서울강남-06752
              </span>
            </div>
          </div>
        </div>
        <p className="text-[#8D8D8D] footer-phrase text-[10px] lg:text-sm">
          ⓒ 2023. The Korean Academy of Biomimetic Dentistry Inc. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

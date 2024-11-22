import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

import info from "@/assets/images/info.png";

export const dynamic = "force-dynamic";

const Info = () => {
  return (
    <div className="mt-9 lg:mt-[38px]">
      <div className="max-w-screen-xl mx-auto px-5 lg:px-0">
        <PageNavigation first="Home" second="회원가입안내" />
      </div>

      <section className="max-w-screen-xl mx-auto px-5 lg:px-0">
        <SubTitle text="회원가입안내" className="mt-[30px] mb-9 lg:mb-[58px]" />
      </section>

      <section className="bg-[#F4F5FA] py-12 px-5 lg:px-0">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-[20px] lg:text-[24px] font-bold lg:leading-[28.8px] mb-[30px] lg:mb-10">
            가입절차
          </h3>
          <div className="hidden lg:flex items-center mb-10">
            <div className="h-20 bg-[#D0E3FF] w-[350px] flex items-center justify-center">
              <p className="text-[21px] font-bold leading-[25.2px]">
                온라인 회원가입
              </p>
            </div>
            <div className="h-14 w-14 rotate-45 bg-[#D0E3FF] -translate-x-7 z-10" />
            <div className="h-20 bg-[#5194FB] w-[350px] -translate-x-14 flex items-center justify-center">
              <p className="text-[21px] text-white font-bold leading-[25.2px] translate-x-7 whitespace-nowrap">
                이사회 심사 및<br />
                입·연회비 납부
              </p>
            </div>
            <div className="h-14 w-14 rotate-45 bg-[#5194FB] -translate-x-[84px] z-10" />
            <div className="h-20 bg-[#D0E3FF] w-[350px] -translate-x-28 flex items-center justify-center">
              <p className="text-[21px] font-bold leading-[25.2px] translate-x-7">
                정회원 승인
              </p>
            </div>
            <div className="h-14 w-14 rotate-45 bg-[#D0E3FF] -translate-x-[139px]" />
          </div>
          <div>
            <Image
              src={info}
              alt="information"
              width={335}
              height={67}
              className="w-[335px] h-[67px] object-contain lg:hidden mb-10"
            />
          </div>
          <ul className="list-none text-base lg:text-lg font-normal leading-normal lg:leading-[34px] custom-letter-spacing space-y-4 lg:space-y-1">
            <li className="flex gap-2">
              <span>·</span>
              <span>
                한국생체모방치의학회는 온라인으로만 회원가입이 가능합니다.
              </span>
            </li>
            <li className="flex gap-2">
              <span>·</span>
              <span>
                온라인 회원가입 후 이사회 심사가 진행되며 입연회비 납부를
                해주셔야 합니다.
              </span>
            </li>
            <li className="flex gap-2">
              <span>·</span>
              <span>
                이사회 심사와 입연회비 납부 확인 후 정회원으로 승인됩니다.
              </span>
            </li>
            <li className="flex gap-2">
              <span>·</span>
              <span>정회원이 되시면 회원증을 발송하여 드립니다.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto py-20 lg:py-36 px-5 lg:px-0">
        <h3 className="text-[20px] lg:text-[24px] font-bold lg:leading-[28.8px] mb-[30px] lg:mb-10">
          안내사항
        </h3>
        <ul className="list-none text-lg font-normal leading-[34px] custom-letter-spacing max-w-[895px] space-y-2 whitespace-nowrap hidden lg:block">
          <li>
            · 한국생체모방치의학회는 생체모방치의학의 발전을 위해 노력하는
            치과계 의료 전문가들과 유관 분야 연구자들의 공동체입니다.
            <br />
            &nbsp;&nbsp;따라서 치과의사가 아니신 분들도 학회 가입이 가능합니다.
          </li>
          <li>
            · 이사회 심사 시 적합하지 않은 회원의 경우 승인이 반려될 수
            있습니다.
          </li>
          <li>
            · 3년간 회원의 의무(연회비 납부)를 이행하지 않을 경우 자동으로
            자격이 상실됩니다.
          </li>
          <li>· 탈퇴서 제출 시 회원탈퇴가 가능합니다.</li>
        </ul>
        <ul className="list-none text-base font-normal custom-letter-spacing space-y-4 lg:hidden">
          <li className="flex gap-x-2">
            <span>·</span>
            <span>
              한국생체모방치의학회는 생체모방치의학의 발전을 위해 노력하는
              치과계 의료 전문가들과 유관 분야 연구자들의 공동체입니다. 따라서
              치과의사가 아니신 분들도 학회 가입이 가능합니다.
            </span>
          </li>
          <li className="flex gap-x-2">
            <span>·</span>
            <span>
              이사회 심사 시 적합하지 않은 회원의 경우 승인이 반려될 수
              있습니다.
            </span>
          </li>
          <li className="flex gap-x-2">
            <span>·</span>
            <span>
              3년간 회원의 의무(연회비 납부)를 이행하지 않을 경우 자동으로
              자격이 상실됩니다.
            </span>
          </li>
          <li className="flex gap-x-2">
            <span>·</span>
            <span>탈퇴서 제출 시 회원탈퇴가 가능합니다.</span>
          </li>
        </ul>
      </section>

      <section className="bg-[#F4F5FA] py-12 px-5 lg:px-0">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-[20px] lg:text-[24px] font-bold lg:leading-[28.8px] mb-10">
            회원등급 및 회비납부
          </h3>
          {/* DESKTOP */}
          <div className="w-[879px] h-[141px] border border-[#D2D2D2] rounded-[20px] overflow-hidden mb-10 hidden lg:block">
            <div className="bg-[#D0E3FF] h-1/2 w-full flex">
              <div className="w-1/4 h-full flex items-center justify-center text-lg custom-letter-spacing font-bold border-r border-[#D2D2D2]">
                회원구분
              </div>
              <div className="w-1/4 h-full flex items-center justify-center text-lg custom-letter-spacing font-bold border-r border-[#D2D2D2]">
                입회비
              </div>
              <div className="w-1/4 h-full flex items-center justify-center text-lg custom-letter-spacing font-bold border-r border-[#D2D2D2]">
                연회비
              </div>
              <div className="w-1/4 h-full flex items-center justify-center text-lg custom-letter-spacing font-bold">
                종신회비
              </div>
            </div>
            <div className="bg-white h-1/2 w-full flex">
              <div className="w-1/4 h-full flex items-center justify-center text-lg custom-letter-spacing font-medium border-r border-[#D2D2D2]">
                정회원
              </div>
              <div className="w-1/4 h-full flex items-center justify-center text-lg custom-letter-spacing font-medium border-r border-[#D2D2D2]">
                5만원
              </div>
              <div className="w-1/4 h-full flex items-center justify-center text-lg custom-letter-spacing font-medium border-r border-[#D2D2D2]">
                5만원
              </div>
              <div className="w-1/4 h-full flex items-center justify-center text-lg custom-letter-spacing font-medium">
                80만원
              </div>
            </div>
          </div>
          {/* MOBILE */}
          <div className="border border-[#D2D2D2] rounded-[10px] overflow-hidden lg:hidden">
            <div className="flex h-[75px] border-b border-[#D2D2D2]">
              <div className="w-1/3 bg-[#D0E3FF] flex items-center justify-center">
                <span className="text-base custom-letter-spacing font-bold">
                  회원구분
                </span>
              </div>
              <div className="w-2/3 bg-white flex items-center justify-center">
                <span className="text-base custom-letter-spacing font-medium">
                  정회원
                </span>
              </div>
            </div>
            <div className="flex h-[75px] border-b border-[#D2D2D2]">
              <div className="w-1/3 bg-[#D0E3FF] flex items-center justify-center">
                <span className="text-base custom-letter-spacing font-bold">
                  입회비
                </span>
              </div>
              <div className="w-2/3 bg-white flex items-center justify-center">
                <span className="text-base custom-letter-spacing font-medium">
                  5만원
                </span>
              </div>
            </div>
            <div className="flex h-[75px] border-b border-[#D2D2D2]">
              <div className="w-1/3 bg-[#D0E3FF] flex items-center justify-center">
                <span className="text-base custom-letter-spacing font-bold">
                  연회비
                </span>
              </div>
              <div className="w-2/3 bg-white flex items-center justify-center">
                <span className="text-base custom-letter-spacing font-medium">
                  5만원
                </span>
              </div>
            </div>
            <div className="flex h-[75px]">
              <div className="w-1/3 bg-[#D0E3FF] flex items-center justify-center">
                <span className="text-base custom-letter-spacing font-bold">
                  종신회비
                </span>
              </div>
              <div className="w-2/3 bg-white flex items-center justify-center">
                <span className="text-base custom-letter-spacing font-medium">
                  80만원
                </span>
              </div>
            </div>
          </div>
          {/* DESKTOP */}
          <ul className="list-none text-lg font-normal leading-[34px] custom-letter-spacing max-w-[895px] space-y-2 hidden lg:block">
            <li>
              · 종신회비 납부 시, 더이상 연회비는 납부하지 않으셔도 됩니다.
            </li>
            <li>· 결제 방법 : 계좌이체 또는 카드결제 가능합니다.</li>
            <li className="flex gap-1">
              <span>· 납부 계좌 :</span>
              <div>
                <span className="font-bold underline underline-offset-2">
                  신한은행 140-014-665217 (예금주: (사)한국생체모방치의학회)
                </span>
                <p>
                  치과의사의 경우 입금 시 면허번호+성함으로 입금 부탁드립니다.
                  (ex: 99999홍길동)
                </p>
              </div>
            </li>
            <li>· 영수증 출력은 마이페이지에서 가능합니다.</li>
            <li>
              · 기타 문의사항은 사무국으로 연락 부탁드립니다. (T.070-5153-2795)
            </li>
          </ul>
          {/* MOBILE */}
          <ul className="list-none text-base font-normal custom-letter-spacing space-y-4 mt-10 lg:hidden">
            <li className="flex gap-x-2">
              <span>·</span>
              <span>
                종신회비 납부 시, 더이상 연회비는 납부하지 않으셔도 됩니다.
              </span>
            </li>
            <li className="flex gap-x-2">
              <span>·</span>
              <span>결제 방법 : 계좌이체 또는 카드결제 가능합니다.</span>
            </li>
            <li className="flex gap-x-2">
              <div className="text-nowrap flex gap-x-2">
                <span>·</span>
                <span>납부 계좌 : </span>
              </div>
              <div>
                <span className="font-bold underline underline-offset-2">
                  신한은행 140-014-665217
                  <br />
                  (예금주: (사)한국생체모방치의학회)
                </span>
                <p>
                  치과의사의 경우 입금 시<br />
                  면허번호+성함으로 입금 부탁드립니다.
                  <br />
                  (ex: 99999홍길동)
                </p>
              </div>
            </li>
            <li className="flex gap-x-2">
              <span>·</span>
              <span>영수증 출력은 마이페이지에서 가능합니다.</span>
            </li>
            <li className="flex gap-x-2">
              <span>·</span>
              <span>
                기타 문의사항은 사무국으로 연락 부탁드립니다.
                <br />
                (T.070-5153-2795)
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-[100px] lg:pb-[200px] flex items-center justify-center">
        <Link
          href="/sign-up"
          className="w-[280px] lg:w-[345px] h-[50px] lg:h-[56px] rounded-[10px] bg-[#2C2C2C] flex items-center justify-center"
        >
          <p className="text-base lg:text-lg text-white font-semibold lg:leading-[21.48px] custom-letter-spacing flex items-center gap-x-0.5 pt-0.5 lg:pt-0">
            회원가입 하러가기
            <ChevronRight size={20} className="mb-0.5" />
          </p>
        </Link>
      </section>
    </div>
  );
};

export default Info;

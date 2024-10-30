import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const Info = () => {
  return (
    <div className="mt-[38px]">
      <div className="max-w-screen-xl mx-auto">
        <PageNavigation first="Home" second="회원가입안내" />
      </div>

      <section className="max-w-screen-xl mx-auto">
        <SubTitle text="회원가입안내" className="mt-[30px] mb-[58px]" />
      </section>

      <section className="bg-[#F4F5FA] py-12">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-[24px] font-bold leading-[28.8px] mb-10">
            가입절차
          </h3>
          <div className="flex items-center mb-10">
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
          <ul className="list-none text-lg font-normal leading-[34px] custom-letter-spacing space-y-1">
            <li>
              · 한국생체모방치의학회는 온라인으로만 회원가입이 가능합니다.
            </li>
            <li>
              · 온라인 회원가입 후 이사회 심사가 진행되며 입연회비 납부를
              해주셔야 합니다.
            </li>
            <li>
              · 이사회 심사와 입연회비 납부 확인 후 정회원으로 승인됩니다.
            </li>
            <li>· 정회원이 되시면 회원증을 발송하여 드립니다.</li>
          </ul>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto py-36">
        <h3 className="text-[24px] font-bold leading-[28.8px] mb-10">
          안내사항
        </h3>
        <ul className="list-none text-lg font-normal leading-[34px] custom-letter-spacing max-w-[895px] space-y-2">
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
      </section>

      <section className="bg-[#F4F5FA] py-12">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-[24px] font-bold leading-[28.8px] mb-10">
            회원등급 및 회비납부
          </h3>
          <div className="w-[879px] h-[141px] border border-[#D2D2D2] rounded-[20px] overflow-hidden mb-10">
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
          <ul className="list-none text-lg font-normal leading-[34px] custom-letter-spacing max-w-[895px] space-y-2">
            <li>
              · 종신회비 납부 시, 더이상 연회비는 납부하지 않으셔도 됩니다.
            </li>
            <li>· 결제 방법 : 계좌이체 또는 카드결제 가능합니다.</li>
            <li>
              · 납부 계좌 :{" "}
              <span className="font-bold underline underline-offset-2">
                신한은행 140-014-665217 (예금주: (사)미니쉬생체모방치의학회)
              </span>
              <p className="ml-[86px]">
                치과의사의 경우 입금 시 면허번호+성함으로 입금 부탁드립니다.
                (ex: 99999홍길동)
              </p>
            </li>
            <li>· 영수증 출력은 마이페이지에서 가능합니다.</li>
            <li>
              · 기타 문의사항은 사무국으로 연락 부탁드립니다. (T.070-5153-2795)
            </li>
          </ul>
        </div>
      </section>

      <section className="py-[100px] pb-[200px] flex items-center justify-center">
        <Link
          href="/sign-up"
          className="w-[345px] h-[56px] rounded-[10px] bg-[#2C2C2C] flex items-center justify-center"
        >
          <p className="text-lg text-white font-semibold leading-[21.48px] custom-letter-spacing flex items-center gap-x-0.5">
            회원가입 하러가기
            <ChevronRight size={20} className="mb-0.5" />
          </p>
        </Link>
      </section>
    </div>
  );
};

export default Info;

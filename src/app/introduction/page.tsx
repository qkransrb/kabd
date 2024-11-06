import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";
import Image from "next/image";
import President from "@/assets/images/president.png";
import { Dot } from "lucide-react";
import Intro from "@/assets/images/introduction.png";
import Download from "@/assets/images/download.png";

import hong from "@/assets/images/hong.png";
import choi from "@/assets/images/choi.png";
import lee from "@/assets/images/lee.png";
import kwon from "@/assets/images/kwon.png";
import kim from "@/assets/images/kim.png";
import song from "@/assets/images/song.png";
import map from "@/assets/images/map.png";

export const dynamic = "force-dynamic";

const Introduction = () => {
  return (
    <div className="mt-[38px]">
      <div className="max-w-screen-xl mx-auto" id="introduction">
        <PageNavigation first="Home" second="학회소개" />
      </div>

      <section className="mb-[200px] max-w-screen-xl mx-auto">
        <SubTitle text="학회소개" className="mt-[30px] mb-[86px]" />
        <div className="mb-[68px]">
          <p className="text-[#595959] text-[21px] font-bold leading-[25.06px] mb-4">
            인사말
          </p>
          <strong className="custom-letter-spacing text-[45px] leading-[60px]">
            함께 지식을 공유하고, 혁신적인 아이디어를 나누며,
            <br /> 치의학의 미래를 열어나가길 기대합니다.
          </strong>
        </div>
        <div className="flex justify-between">
          <article className="max-w-[653px] w-full space-y-10 text-lg custom-letter-spacing leading-[32px] font-normal">
            <p>
              존경하는 한국생체모방치의학회 회원 여러분과 방문자 여러분,
              환영합니다!
            </p>
            <p>
              한국생체모방치의학회 홈페이지에 오신 것을 진심으로 환영합니다.
              저는 이 학회의 초대 회장으로 추대되고 선출된 것을 영광으로
              생각하고, 동시에 선임된 임원진들과 더불어 감사인사를 드립니다.
            </p>
            <p>
              한국생체모방치의학회는 손상된 치질을 수복하는 학문의 한 분야이며,
              특히 적용되는 재료와 제작 방법, 치료 결과 등이 생체모방이론에
              부합되도록 연구하는 자들의 모임입니다. 그를 위해 치의학계와
              과학계, 산업계의 최신 연구와 기술, 임상 과정과 결과를 공유함으로써
              학회의 발전을 꾀하며, 결국 인간의 삶의 질을 개선하는 것에 목표를
              두고 있습니다.
            </p>
            <p>
              우리 학회는 다양한 전문성을 가진 회원들이 모여 지식과 경험을
              나누고, 협력할 수 있는 장을 제공합니다. 먼저 정기 학술대회와 각
              분야 학술지 등을 통해 지속적인 학문적 교류와 교육의 기회를
              제공하며, 생체모방치의학 분야의 최신 동향을 따라잡을 수 있도록
              지원하고 있습니다.
            </p>
            <p>
              이 홈페이지는 최신 연구 결과, 학술 대회 일정, 회원 활동 소식 등
              유익한 정보들을 제공하고 있습니다. 이런 정보들이 여러분의 연구와
              실무에 도움이 되기를 바랍니다.
            </p>
            <p>
              학회는 여러분의 열정과 헌신으로 더욱 발전해 나갈 것입니다. 우리의
              목표를 함께 이루기 위해 여러분의 적극적인 참여와 협력이
              필요합니다. 함께 지식을 공유하고, 혁신적인 아이디어를 나누며,
              치의학의 미래를 열어나가길 기대합니다.
            </p>
            <p>감사합니다.</p>
            <p className="flex justify-end items-baseline text-[26px] font-bold custom-letter-spacing">
              한국생체모방치의학회{" "}
              <span className="px-1 text-lg font-normal custom-letter-spacing ml-2">
                회장
              </span>{" "}
              홍&nbsp;&nbsp;성&nbsp;&nbsp;욱
            </p>
          </article>
          <Image
            src={President}
            alt="President"
            width={556}
            height={698}
            className="w-[556px] h-[698px]"
          />
        </div>
      </section>

      <section className="mb-[200px] max-w-screen-xl mx-auto" id="history">
        <SubTitle text="연혁" className="mb-9" />
        <div className="py-[50px] px-9 rounded-[20px] bg-[#F4F5FA] max-w-[471px] w-full">
          <p className="text-[21px] font-bold mb-7">
            1대 <span className="text-[13px] font-normal">(2023년~2025년)</span>
          </p>
          <ul className="grid grid-cols-2 gap-2">
            <li className="flex justify-between pr-10 custom-letter-spacing text-[20px] leading-[30px]">
              <span className="font-bold flex items-center">
                <Dot size={14} className="pb-1" />
                회장
              </span>
              <span className="font-normal">홍성욱</span>
            </li>
            <li className="flex justify-between pr-10 custom-letter-spacing text-[20px] leading-[30px]">
              <span className="font-bold flex items-center">
                <Dot size={14} className="pb-1" />
                부회장
              </span>
              <span className="font-normal">최진호</span>
            </li>
            <li className="flex justify-between pr-10 custom-letter-spacing text-[20px] leading-[30px]">
              <span className="font-bold flex items-center">
                <Dot size={14} className="pb-1" />
                총무이사
              </span>
              <span className="font-normal">이지선</span>
            </li>
            <li className="flex justify-between pr-10 custom-letter-spacing text-[20px] leading-[30px]">
              <span className="font-bold flex items-center">
                <Dot size={14} className="pb-1" />
                학술이사
              </span>
              <span className="font-normal">권영선</span>
            </li>
            <li className="flex justify-between pr-10 custom-letter-spacing text-[20px] leading-[30px]">
              <span className="font-bold flex items-center">
                <Dot size={14} className="pb-1" />
                연구이사
              </span>
              <span className="font-normal">김경덕</span>
            </li>
            <li className="flex justify-between pr-10 custom-letter-spacing text-[20px] leading-[30px]">
              <span className="font-bold flex items-center">
                <Dot size={14} className="pb-1" />
                감사
              </span>
              <span className="font-normal">송치웅</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="bg-[#F4F5FA] h-[833px] mb-[200px]" id="purpose">
        <div className="max-w-screen-xl mx-auto flex justify-between">
          <div>
            <SubTitle text="설립 목적" className="pt-[110px] mb-9" />
            <p className="max-w-[653px] custom-letter-spacing text-lg leading-[32px] font-normal whitespace-nowrap">
              최근 대두되는 생체모방이론에 입각한 과학적 근거을 정립하고,
              <br />
              임상적으로 응용 가능하도록 하는 것에 목적을 두고 있습니다.
              <br /> 학술적 발전과 기술적 보급은 과학계와 산업계의 교류와 협력에
              의해 이뤄질 것이며
              <br /> 본 학회는 그 터를 제공하고자 합니다.
            </p>
          </div>
          <Image
            src={Intro}
            alt=""
            width={633}
            height={578.45}
            className="pt-[110px]"
          />
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto mb-[200px]" id="regulations">
        <div className="flex items-center gap-5 mb-9">
          <SubTitle text="회칙" />
          <a
            href="/pdf/kabd.pdf"
            download
            className="border border-[#D2D2D2] rounded-[10px] w-[162px] h-[35px] flex items-center justify-center gap-2"
          >
            <span className="text-lg font-medium text-[#595959] leading-[21.6px]">
              회칙 다운로드
            </span>
            <Image src={Download} alt="Download" width={18} height={19} />
          </a>
        </div>
        <div className="w-full min-h-[724px] overflow-auto py-[50px] px-14 border border-[#D2D2D2] rounded-[20px] custom-letter-spacing">
          <h5 className="text-[26px] font-bold">{`<(사)한국생체모방치의학회 정관>`}</h5>
        </div>
      </section>
      <section className="max-w-screen-xl mx-auto mb-[200px]" id="executive">
        <div className="mb-9">
          <SubTitle text="임원진 안내" />
        </div>
        <div className="flex items-center gap-4 mb-8">
          <div>
            <Image
              src={hong}
              alt="회장 홍성욱"
              width={240}
              height={240}
              className="rounded-[20px] w-[240px] h-[240px] mb-3"
            />
            <p className="text-[26px] font-bold custom-letter-spacing text-center">
              <span className="text-lg font-normal mr-3">회장</span>
              홍&nbsp;&nbsp;성&nbsp;&nbsp;욱
            </p>
          </div>
          <div>
            <Image
              src={choi}
              alt="부회장 최진호"
              width={240}
              height={240}
              className="rounded-[20px] w-[240px] h-[240px] mb-3"
            />
            <p className="text-[26px] font-bold custom-letter-spacing text-center">
              <span className="text-lg font-normal mr-3">부회장</span>
              최&nbsp;&nbsp;진&nbsp;&nbsp;호
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-[84px]">
          <div>
            <Image
              src={lee}
              alt="총무이사 이지선"
              width={240}
              height={240}
              className="rounded-[20px] w-[240px] h-[240px] mb-3"
            />
            <p className="text-[26px] font-bold custom-letter-spacing text-center">
              <span className="text-lg font-normal mr-3">총무이사</span>
              이&nbsp;&nbsp;지&nbsp;&nbsp;선
            </p>
          </div>
          <div>
            <Image
              src={kwon}
              alt="학술이사 권영선"
              width={240}
              height={240}
              className="rounded-[20px] w-[240px] h-[240px] mb-3"
            />
            <p className="text-[26px] font-bold custom-letter-spacing text-center">
              <span className="text-lg font-normal mr-3">학술이사</span>
              권&nbsp;&nbsp;영&nbsp;&nbsp;선
            </p>
          </div>
          <div>
            <Image
              src={kim}
              alt="연구이사 김경덕"
              width={240}
              height={240}
              className="rounded-[20px] w-[240px] h-[240px] mb-3"
            />
            <p className="text-[26px] font-bold custom-letter-spacing text-center">
              <span className="text-lg font-normal mr-3">연구이사</span>
              김&nbsp;&nbsp;경&nbsp;&nbsp;덕
            </p>
          </div>
          <div>
            <Image
              src={song}
              alt="감사 송치웅"
              width={240}
              height={240}
              className="rounded-[20px] w-[240px] h-[240px] mb-3"
            />
            <p className="text-[26px] font-bold custom-letter-spacing text-center">
              <span className="text-lg font-normal mr-3">감사</span>
              송&nbsp;&nbsp;치&nbsp;&nbsp;웅
            </p>
          </div>
        </div>
        <div className="space-y-7">
          <div className="flex items-center">
            <strong className="text-[20px] font-bold flex items-center max-w-[120px] w-full custom-letter-spacing">
              <Dot size={14} className="pb-1" />
              연구부
            </strong>
            <ul className="flex items-center gap-x-4 text-[20px] font-normal custom-letter-spacing">
              <li>김민수</li>
              <li>정지안</li>
              <li>이남권</li>
              <li>한혜린</li>
              <li>김현주</li>
              <li>황유림</li>
              <li>안중현</li>
              <li>김성룡</li>
            </ul>
          </div>
          <div className="flex items-start">
            <strong className="text-[20px] font-bold flex items-center max-w-[120px] w-full custom-letter-spacing">
              <Dot size={14} className="pb-1" />
              학술부
            </strong>
            <div>
              <ul className="flex items-center gap-x-4 text-[20px] font-normal custom-letter-spacing">
                <li>김호연</li>
                <li>김성호</li>
                <li>나인채</li>
                <li>이상길</li>
                <li>박종하</li>
                <li>이지애</li>
                <li>박준석</li>
                <li>박종훈</li>
                <li>박혜신</li>
                <li>백지연</li>
                <li>이승훈</li>
              </ul>
              <ul className="flex items-center gap-x-4 text-[20px] font-normal custom-letter-spacing">
                <li>우승석</li>
                <li>정희경</li>
                <li>성민재</li>
                <li>김태윤</li>
                <li>이영진</li>
                <li>이태훈</li>
                <li>이애나</li>
                <li>조광범</li>
                <li>곽해성</li>
                <li>이정은</li>
                <li>나선혜</li>
              </ul>
              <ul className="flex items-center gap-x-4 text-[20px] font-normal custom-letter-spacing">
                <li>이주홍</li>
                <li>최은영</li>
              </ul>
            </div>
          </div>
          <div className="flex items-center">
            <strong className="text-[20px] font-bold flex items-center max-w-[120px] w-full custom-letter-spacing">
              <Dot size={14} className="pb-1" />
              총무부
            </strong>
            <ul className="flex items-center gap-x-4 text-[20px] font-normal custom-letter-spacing">
              <li>김현서</li>
              <li>홍준기</li>
              <li>박강남</li>
              <li>송준용</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto mb-[200px]" id="location">
        <div className="mb-9">
          <SubTitle text="사무국 안내" />
        </div>
        <div className="space-y-2 mb-9">
          <div className="flex items-center">
            <strong className="text-[20px] font-bold flex items-center max-w-[120px] w-full custom-letter-spacing">
              <Dot size={14} className="pb-1" />
              사무국 주소
            </strong>
            <p className="text-[20px] font-normal custom-letter-spacing">
              서울특별시 강남구 언주로 728, 5층(논현동)
            </p>
          </div>
          <div className="flex items-center">
            <strong className="text-[20px] font-bold flex items-center max-w-[120px] w-full custom-letter-spacing">
              <Dot size={14} className="pb-1" />
              이메일
            </strong>
            <p className="text-[20px] font-normal custom-letter-spacing">
              2021kabd@gmail.com
            </p>
          </div>
          <div className="flex items-center">
            <strong className="text-[20px] font-bold flex items-center max-w-[120px] w-full custom-letter-spacing">
              <Dot size={14} className="pb-1" />
              전화번호
            </strong>
            <p className="text-[20px] font-normal custom-letter-spacing">
              070-5153-2795
            </p>
          </div>
        </div>

        <Image
          src={map}
          alt="map"
          width={1280}
          height={545}
          className="w-full h-[545px] rounded-[20px]"
        />
      </section>
    </div>
  );
};

export default Introduction;

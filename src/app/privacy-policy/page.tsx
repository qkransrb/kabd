export const dynamic = "force-dynamic";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-5 lg:px-0">
      <div className="mt-20 mb-12 lg:my-20">
        <h2 className="text-[33px] text-black font-bold hidden lg:block">
          한국생체모방치의학회 개인정보처리방침
        </h2>
        <h2 className="text-[25px] text-black font-bold lg:hidden">
          한국생체모방치의학회
          <br />
          개인정보처리방침
        </h2>
      </div>
      <div className="text-base lg:text-lg font-normal leading-relaxed lg:leading-[32px] custom-letter-spacing mb-[100px] lg:mb-[150px]">
        <p>
          한국생체모방치의학회(이하 "학회")는 회원의 개인정보를 중요하게
          생각하며, 개인정보 보호법 등 관련 법령을 준수하여 회원의 개인정보를
          보호하고 있습니다. 본 개인정보처리방침은 학회가 수집하는 개인정보의
          항목, 이용 목적, 보관 기간 및 처리 방법을 설명하며, 회원의 권리 보호를
          위한 조치 사항을 안내합니다.
        </p>

        <div>
          <p className="font-bold py-2">
            제1조(개인정보의 수집 항목 및 수집 방법)
          </p>
          <ul className="list-decimal list-inside">
            <li>
              학회는 다음과 같은 개인정보를 수집합니다.
              <ul className="list-disc list-inside px-5">
                <li>필수항목: 성명, 이메일 주소, 연락처, 비밀번호</li>
                <li>선택항목: 생년월일, 소속, 주소</li>
                <li>자동 수집 항목: 접속 로그, 쿠키, 접속 IP 정보</li>
              </ul>
            </li>
            <li>
              개인정보는 다음과 같은 방법으로 수집됩니다.
              <ul className="list-disc list-inside px-5">
                <li>
                  홈페이지 회원가입, 문의, 서비스 이용 과정에서 회원이
                  자발적으로 제공한 정보
                </li>
                <li>서비스 이용 시 자동으로 생성되는 정보</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-bold py-2">제2조(개인정보의 이용 목적)</p>
          <p>학회는 수집된 개인정보를 다음과 같은 목적으로 이용합니다.</p>
          <ul className="list-decimal list-inside">
            <li>회원 관리: 본인 확인, 회원가입 및 관리, 서비스 제공</li>
            <li>서비스 제공: 학술 정보 제공, 학회 행사 초대 및 참여 안내</li>
            <li>마케팅 및 홍보: 학회 소식 및 행사 안내</li>
            <li>
              통계 분석: 서비스 개선을 위한 접속 빈도 분석, 서비스 이용 통계
              수집
            </li>
          </ul>
        </div>

        <div>
          <p className="font-bold py-2">제3조(개인정보의 보유 및 이용 기간)</p>
          <ul className="list-decimal list-inside">
            <li>
              학회는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당
              정보를 지체 없이 파기합니다.
            </li>
            <li>
              단, 법령에 따라 보관이 필요한 경우에는 다음과 같이 보유 기간을
              정합니다.
              <ul className="list-disc list-inside px-5">
                <li>계약 또는 청약 철회에 관한 기록: 5년</li>
                <li>대금 결제 및 재화 등의 공급에 관한 기록: 5년</li>
                <li>소비자 불만 또는 분쟁 처리에 관한 기록: 3년</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-bold py-2">제4조(개인정보의 제3자 제공)</p>
          <p>
            학회는 원칙적으로 회원의 개인정보를 외부에 제공하지 않으며, 다음의
            경우 예외적으로 제공할 수 있습니다.
          </p>
          <ul className="list-decimal list-inside">
            <li>회원의 사전 동의를 받은 경우</li>
            <li>법령에 따라 요구되는 경우</li>
          </ul>
        </div>

        <div>
          <p className="font-bold py-2">제5조(개인정보의 처리 위탁)</p>
          <p>
            학회는 원활한 서비스 제공을 위하여 개인정보 처리 업무를 외부 전문
            업체에 위탁할 수 있습니다. 이 경우, 위탁 업체와의 계약을 통해
            개인정보 보호 관련 지침을 준수하도록 하고 있습니다.
          </p>
        </div>

        <div>
          <p className="font-bold py-2">제6조(개인정보의 파기 절차 및 방법)</p>
          <ul className="list-decimal list-inside">
            <li>
              학회는 개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우
              지체 없이 개인정보를 파기합니다.
            </li>
            <li>
              개인정보 파기 절차 및 방법은 다음과 같습니다.
              <ul className="list-disc list-inside px-5">
                <li>전자적 파일: 복구 불가능한 방법으로 영구 삭제</li>
                <li>종이 문서: 분쇄기로 파기</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-bold py-2">제7조(회원의 권리)</p>
          <ul className="list-decimal list-inside">
            <li>
              회원은 언제든지 본인의 개인정보에 대해 열람, 수정, 삭제를 요청할
              수 있습니다.
            </li>
            <li>
              회원은 학회에 서면, 이메일 등을 통해 개인정보 처리에 관한 이의를
              제기하거나 수정 요청을 할 수 있습니다. 학회는 이에 대해 지체 없이
              조치를 취합니다.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-bold py-2">
            제8조(개인정보 보호를 위한 기술적 및 관리적 대책)
          </p>
          <p>
            학회는 개인정보의 안전한 처리를 위하여 다음과 같은 조치를 취하고
            있습니다.
          </p>
          <ul className="list-decimal list-inside">
            <li>
              개인정보 암호화: 회원의 비밀번호는 암호화되어 저장되며, 중요한
              정보는 별도로 보호됩니다.
            </li>
            <li>
              해킹 방지 대책: 방화벽 및 보안 프로그램을 설치하여 개인정보 유출을
              방지하고 있습니다.
            </li>
            <li>
              접근 제한: 개인정보에 대한 접근 권한을 최소한의 인원으로 제한하고
              있습니다.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-bold py-2">제9조(개인정보 보호책임자)</p>
          <p>
            회원은 개인정보 처리와 관련한 모든 문의를 개인정보 보호책임자에게
            문의할 수 있으며, 학회는 신속하고 성실하게 답변하겠습니다.
          </p>
          <ul className="list-disc list-inside px-3">
            <li>개인정보 보호책임자: 유다연</li>
            <li>연락처: 070-5153-2795</li>
            <li>이메일: 2021kabd@gmail.com</li>
          </ul>
        </div>

        <div>
          <p className="font-bold py-2">제10조(권익 침해에 대한 구제 방법)</p>
          <p>
            회원은 개인정보 침해에 대한 구제를 받기 위하여 개인정보 침해
            신고센터, 개인정보 분쟁조정위원회 등에 상담을 신청할 수 있습니다.
          </p>
          <ul className="list-disc list-inside px-3">
            <li>개인정보 침해신고센터: (국번없이) 118</li>
            <li>개인정보 분쟁조정위원회: (국번없이) 1833-6972</li>
          </ul>
        </div>

        <div>
          <p className="font-bold py-2">제11조(개인정보처리방침의 변경)</p>
          <p>
            이 개인정보처리방침은 시행일로부터 적용되며, 법령 또는 학회의 정책
            변경에 따라 수정될 수 있습니다. 변경 사항은 홈페이지를 통해
            공지됩니다.
          </p>
          <ul className="list-disc list-inside px-3">
            <li>시행일: 2024.11.01</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

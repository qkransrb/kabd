import { redirect } from "next/navigation";
import request from "request";
import HashMap from "hashmap";

import { mobileGetAuthUrl } from "@/lib/inicis";
import { getProductSeqByTitle } from "@/lib/utils";

export async function POST(req: Request) {
  const formData = await req.formData();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = {};

  formData.forEach((v, k) => {
    body[k] = v;
  });

  //인증 결과 성공 시
  if (body.P_STATUS === "00") {
    // const P_STATUS = body.P_STATUS; // 결과코드
    // const P_RMESG1 = body.P_RMESG1; // 결과메시지
    const P_TID = body.P_TID; // 인증거래번호(성공시에만 전달)
    // const P_AMT = body.P_AMT; // 거래금액
    // const P_NOTI = body.P_NOTI; // 가맹점 임의 데이터

    //결제 승인 요청
    const options = {
      P_MID: P_TID.substring(10, 20), //상점 아이디 설정 : 결제요청 페이지에서 사용한 MID값과 동일하게 세팅
      P_TID: P_TID,
    };

    //##########################################################################
    // 승인요청 API url (P_REQ_URL) 리스트 는 properties 에 세팅하여 사용합니다.
    // idc_name 으로 수신 받은 센터 네임을 properties 에서 include 하여 승인요청하시면 됩니다.
    //##########################################################################

    const idc_name = body.idc_name;
    const P_REQ_URL = body.P_REQ_URL; // 승인요청 URL
    const P_REQ_URL2 = mobileGetAuthUrl(idc_name);

    if (P_REQ_URL == P_REQ_URL2) {
      request.post(
        { method: "POST", uri: P_REQ_URL2, form: options },
        (err, httpResponse, body) => {
          try {
            let values = [];
            values = new String(body).split("&");

            const map = new HashMap();
            for (let x = 0; x < values.length; x++) {
              // 승인결과를 파싱값 잘라 hashmap에 저장
              const i = values[x].indexOf("=");
              const key1 = values[x].substring(0, i);
              const value1 = values[x].substring(i + 1);
              map.set(key1, value1);
            }

            const noti = JSON.parse(map.get("P_NOTI") as string);

            if (noti.conferenceId == "EMPTY") {
              console.log(">>> 입연회비");
              request.post(
                {
                  method: "POST",
                  uri: "https://api.kabd.or.kr/api/pay/history_card.php",
                  body: {
                    pp_seq: getProductSeqByTitle(noti.goodsName),
                    ph_pay_status: "Y",
                    ph_pay_tid: map.get("P_TID"),
                    ph_pay_type: "2",
                    phone: noti.phone,
                  },
                  json: true,
                },
                (err, httpResponse, body) => {
                  const jsoncode = err ? err : JSON.stringify(body);
                  const r = JSON.parse(jsoncode);
                }
              );
            } else {
              console.log(">>> 학술대회");
              request.post(
                {
                  method: "POST",
                  uri: "https://api.kabd.or.kr/api/attendees/attendees_card.php",
                  body: {
                    a_ac_seq: noti.conferenceId, //학술대회 시퀀스
                    a_amount: map.get("P_AMT"), //학술대회 금액
                    a_pay_type: "2", //결제타입 (1:무통장, 2:신용카드, 3:계좌이체, 4:가상계좌)
                    a_pay_tid: map.get("P_TID"), //결제tid
                    a_pay_status: "Y", //결제상태 (Y:결제완료,N:결제대기,S:결제실패,W:취소신청,C:취소완료)
                    phone: noti.phone,
                  },
                  json: true,
                },
                (err, httpResponse, body) => {
                  const jsoncode = err ? err : JSON.stringify(body);
                  const r = JSON.parse(jsoncode);
                  console.log(r);
                }
              );
            }
          } catch (e) {
            console.log(e);

            /*
                가맹점에서 승인결과 전문 처리 중 예외발생 시 망취소 요청할 수 있습니다.
                승인요청 전문과 동일한 스펙으로 진행되며, 인증결과 수신 시 전달받은 "{인증결과 전달된 P_REQ_URL의 HOST}/smart/payNetCancel.ini" 로 망취소요청합니다.

                ** 망취소를 일반 결제취소 용도로 사용하지 마십시오.
                일반 결제취소는 INIAPI 취소/환불 서비스를 통해 진행해주시기 바랍니다.
            */

            const options2 = {
              P_TID: body.P_TID,
              P_MID: body.P_TID.substring(10, 20),
              P_AMT: body.P_AMT,
              P_OID: body.P_NOTI,
            };

            request.post(
              {
                method: "POST",
                uri: P_REQ_URL2.substring(0, 27) + "/smart/payNetCancel.ini",
                form: options2,
                json: true,
              },
              (err, httpResponse, body) => {
                const result = err ? err : JSON.stringify(body);

                console.log("<p>" + result + "</p>");
              }
            );
          }
        }
      );

      return redirect("/payments");
    }
  } else {
    return redirect("/");
  }
}

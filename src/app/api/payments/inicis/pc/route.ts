import { redirect } from "next/navigation";
import crypto from "crypto";
import request from "request";

import { pcGetAuthUrl, pcGetNetCancel } from "@/lib/inicis";
import { getProductSeqByTitle } from "@/lib/utils";

export async function POST(req: Request) {
  const formData = await req.formData();

  // console.log("formData: ", formData);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = {};

  formData.forEach((v, k) => {
    body[k] = v;
  });

  if (body.resultCode === "0000") {
    //############################################
    //1.전문 필드 값 설정(***가맹점 개발수정***)
    //############################################

    const mid = body.mid; // 상점아이디
    const signKey = process.env.INI_SIGNKEY;
    const authToken = body.authToken; // 승인요청 검증 토큰
    const netCancelUrl = body.netCancelUrl; // 망취소요청 Url
    const merchantData = body.merchantData;
    const timestamp = new Date().getTime(); // 타임스템프 [TimeInMillis(Long형)]
    const charset = "UTF-8"; // 리턴형식[UTF-8,EUC-KR](가맹점 수정후 고정)
    const format = "JSON"; // 리턴형식[XML,JSON,NVP](가맹점 수정후 고정)

    //##########################################################################
    // 승인요청 API url (authUrl) 리스트 는 properties 에 세팅하여 사용합니다.
    // idc_name 으로 수신 받은 센터 네임을 properties 에서 include 하여 승인 요청하시면 됩니다.
    //##########################################################################

    const idc_name = body.idc_name;
    const authUrl = body.authUrl; // 승인요청 Url
    const authUrl2 = pcGetAuthUrl(idc_name);

    // SHA256 Hash값 [대상: authToken, timestamp]
    const signature = crypto
      .createHash("sha256")
      .update("authToken=" + authToken + "&timestamp=" + timestamp)
      .digest("hex");

    // SHA256 Hash값 [대상: authToken, signKey, timestamp]
    const verification = crypto
      .createHash("sha256")
      .update(
        "authToken=" +
          authToken +
          "&signKey=" +
          signKey +
          "&timestamp=" +
          timestamp
      )
      .digest("hex");

    //결제 승인 요청
    const options: object = {
      mid: mid,
      authToken: authToken,
      timestamp: timestamp,
      signature: signature,
      verification: verification,
      charset: charset,
      format: format,
      merchantData: merchantData,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const sObject: any = {};

    if (authUrl == authUrl2) {
      request.post(
        { method: "POST", uri: authUrl2, form: options, json: true },
        (err, httpResponse, body) => {
          try {
            const jsoncode = err ? err : JSON.stringify(body);

            const result = JSON.parse(jsoncode);

            // console.log("======= 성공 결과 =======");
            // console.log(result);
            // res.render("INIstdpay_pc_return.ejs", {
            //   resultCode: result.resultCode,
            //   resultMsg: result.resultMsg,
            //   tid: result.tid,
            //   MOID: result.MOID,
            //   TotPrice: result.TotPrice,
            //   goodName: result.goodName,
            //   applDate: result.applDate,
            //   applTime: result.applTime,
            // });

            if (!merchantData) {
              // 학술대회
              console.log(">>> 입연회비");
              request.post(
                {
                  method: "POST",
                  uri: "https://api.kabd.or.kr/api/pay/history_card.php",
                  body: {
                    pp_seq: getProductSeqByTitle(result.goodsName),
                    ph_pay_status: "Y",
                    ph_pay_tid: result.tid,
                    ph_pay_type: "2",
                    phone: result.buyerTel,
                  },
                  json: true,
                },
                (err, httpResponse, body) => {
                  const jsoncode = err ? err : JSON.stringify(body);
                  const r = JSON.parse(jsoncode);

                  console.log(r);
                }
              );
            } else {
              console.log(">>> 학술대회");
              request.post(
                {
                  method: "POST",
                  uri: "https://api.kabd.or.kr/api/attendees/attendees_card.php",
                  body: {
                    a_ac_seq: merchantData, //학술대회 시퀀스
                    a_amount: result.TotPrice, //학술대회 금액
                    a_pay_type: "2", //결제타입 (1:무통장, 2:신용카드, 3:계좌이체, 4:가상계좌)
                    a_pay_tid: result.tid, //결제tid
                    a_pay_status: "Y", //결제상태 (Y:결제완료,N:결제대기,S:결제실패,W:취소신청,C:취소완료)
                    phone: result.buyerTel,
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
            /*
                가맹점에서 승인결과 전문 처리 중 예외발생 시 망취소 요청할 수 있습니다.
                승인요청 전문과 동일한 스펙으로 진행되며, 인증결과 수신 시 전달받은 "netCancelUrl" 로 망취소요청합니다.

                ** 망취소를 일반 결제취소 용도로 사용하지 마십시오.
                일반 결제취소는 INIAPI 취소/환불 서비스를 통해 진행해주시기 바랍니다.
            */
            console.log(e);
            const netCancelUrl2 = pcGetNetCancel(idc_name);
            if (netCancelUrl == netCancelUrl2) {
              request.post(
                {
                  method: "POST",
                  uri: netCancelUrl2,
                  form: options,
                  json: true,
                },
                (err, httpResponse, body) => {
                  const result = err ? err : JSON.stringify(body);

                  console.log("<p>" + result + "</p>");
                }
              );
            }
          }
        }
      );

      if (merchantData) {
        return redirect(`/my-page/conference?q=success`);
      } else {
        return redirect("/my-page/payment?q=success");
      }
    }

    if (merchantData) {
      return redirect(`/my-page/conference?q=failed`);
    } else {
      return redirect("/my-page/payment?q=failed");
    }
  } else {
    return redirect("/");
  }
}

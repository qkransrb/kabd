"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getConferenceList(q?: string, page?: number) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/conference/conference_sel.php",
      {
        keyword: q,
        currentPage: page && page >= 2 ? page : 1,
      }
    );

    return data;
  } catch (error) {
    // if (error instanceof AxiosError) {
    //   if (
    //     error.response?.data?.msg === "Expired token" ||
    //     error.response?.data?.msg === "Wrong number of segments"
    //   ) {
    //     return redirect("/sign-in");
    //   }
    // }
    console.log(error);
  }
}

export async function getConferenceDetails(id: string) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/conference/conference.php",
      {
        ac_seq: id,
      }
    );

    return data;
  } catch (error) {
    // if (error instanceof AxiosError) {
    //   if (
    //     error.response?.data?.msg === "Expired token" ||
    //     error.response?.data?.msg === "Wrong number of segments"
    //   ) {
    //     return redirect("/sign-in");
    //   }
    // }
    console.log(error);
  }
}

export async function registConference(id: string, amount: string) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/attendees/attendees_ins.php",
      {
        a_ac_seq: id, //학술대회 시퀀스
        a_amount: amount, //학술대회 금액
        a_pay_type: "2", //결제타입 (1:신용카드, 2:계좌이체, 3:가상계좌, 4:휴대폰)
        a_pay_tid: "", //결제tid
        a_pay_status: "N", //결제상태 (Y:결제완료,N:결제대기,S:결제실패,W:취소신청,C:취소완료)
      },
      {
        headers: {
          Authorization: `Bearer ${cookies().get("kabd_token")?.value}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (
        error.response?.data?.msg === "Expired token" ||
        error.response?.data?.msg === "Wrong number of segments"
      ) {
        return redirect("/sign-in");
      }
    }
  }
}

export async function cancelConference(id: string) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/attendees/attendees_upd.php",
      {
        a_seq: id, // 학술대회 시퀀스
        a_pay_status: "W", // 결제상태 취소신청중
      },
      {
        headers: {
          Authorization: `Bearer ${cookies().get("kabd_token")?.value}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (
        error.response?.data?.msg === "Expired token" ||
        error.response?.data?.msg === "Wrong number of segments"
      ) {
        return redirect("/sign-in");
      }
    }
  }
}

"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getNoticeList(q?: string, page?: number) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/board/notice_sel.php",
      {
        keyword: q,
        currentPage: page && page >= 2 ? page : 1,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies().get("kabd_token")?.value}`,
        },
      }
    );

    return data;
  } catch (error) {
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

export async function getNoticeDetails(id: string) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/board/notice.php",
      {
        b_seq: id,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies().get("kabd_token")?.value}`,
        },
      }
    );

    return data;
  } catch (error) {
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

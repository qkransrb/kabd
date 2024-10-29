"use server";

import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function getAbstractList(q?: string, page?: number) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/board/academic_sel.php",
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

export async function getAbstractDetails(id: string) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/board/academic.php",
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

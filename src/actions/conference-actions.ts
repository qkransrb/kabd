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

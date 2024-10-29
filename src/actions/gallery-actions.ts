"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios, { AxiosError } from "axios";

export async function getGalleryList(q?: string, page?: number) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/board/photo_sel.php",
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

export async function getGalleryDetails(id: string) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/board/photo.php",
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

"use server";

import { FindIdValues } from "@/components/find-id/content";
import { FindPasswordValues } from "@/components/find-password/content";
import axios from "axios";

export async function findId(values: FindIdValues) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/member/find_id.php",
      {
        m_name: values.username,
        m_mobile: values.phone,
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function findPassword(values: FindPasswordValues) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/member/find_pw.php",
      {
        m_id: values.userId,
        m_name: values.username,
        m_mobile: values.phone,
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function resetPassword(values: {
  userId: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/member/pw_upd.php",
      {
        m_id: values.userId,
        pw: values.password,
        re_pw: values.confirmPassword,
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

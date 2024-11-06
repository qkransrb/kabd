"use server";

import { AxiosError } from "axios";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { SignInValues } from "@/components/auth/sign-in/signin-form";
import { DentistSignUp } from "@/components/auth/sign-up/dentist-form";
import { GeneralSignUp } from "@/components/auth/sign-up/general-form";

export const checkForDuplicates = async (id: string): Promise<boolean> => {
  const response = await fetch(
    "https://api.kabd.or.kr/api/member/check_id.php",
    {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    }
  );

  const { msg } = await response.json();

  return msg === "success";
};

export const sendAuthCode = async (phone: string) => {
  const response = await fetch(
    "https://api.kabd.or.kr/api/member/auth_send.php",
    {
      method: "POST",
      body: JSON.stringify({
        m_mobile: phone,
      }),
    }
  );

  return await response.json();
};

export const authCodeConfirm = async (code: string, phone: string) => {
  const response = await fetch(
    "https://api.kabd.or.kr/api/member/auth_check.php",
    {
      method: "POST",
      body: JSON.stringify({
        auth_code: code,
        m_mobile: phone,
      }),
    }
  );

  return await response.json();
};

export const dentistSignUp = async (data: DentistSignUp) => {
  const response = await fetch(
    "https://api.kabd.or.kr/api/member/member_join.php",
    {
      method: "POST",
      body: JSON.stringify({
        m_type: "G",
        m_id: data.userId,
        m_pwd: data.password,
        m_name: data.koreanName,
        m_jumin: data.birth,
        m_en_name: data.englishName,
        m_mobile: data.phone,
        m_license_number: data.license,
        m_email: data.email,
        m_school: data.university,
        m_major: data.major.join("|"),
        m_notices_method: data.type,
        m_zipcode: data.zipcode,
        m_addr1: data.address,
        m_addr2: data.addressDetail,
        m_sex: data.gender,
        m_address_select: data.addressType,
        m_position: data.addressName,
        m_position_phone: data.addressTel,
      }),
    }
  );

  const res = await response.json();

  if (res.code === "000" && res.msg === "success") {
    return true;
  } else {
    return false;
  }
};

export const generalSignUp = async (data: GeneralSignUp) => {
  const response = await fetch(
    "https://api.kabd.or.kr/api/member/member_join.php",
    {
      method: "POST",
      body: JSON.stringify({
        m_type: "M",
        m_id: data.userId,
        m_pwd: data.password,
        m_name: data.koreanName,
        m_jumin: data.birth,
        m_en_name: data.englishName,
        m_mobile: data.phone,
        m_email: data.email,
        m_notices_method: data.type,
        m_zipcode: data.zipcode,
        m_addr1: data.address,
        m_addr2: data.addressDetail,
        m_sex: data.gender,
        m_address_select: data.addressType,
        m_position: data.addressName,
        m_position_phone: data.addressTel,
      }),
    }
  );

  const res = await response.json();

  if (res.code === "000" && res.msg === "success") {
    return true;
  } else {
    return false;
  }
};

export const signIn = async (data: SignInValues) => {
  try {
    const response = await fetch(
      "https://api.kabd.or.kr/api/member/member_login.php",
      {
        method: "POST",
        body: JSON.stringify({
          id: data.userId,
          pw: data.password,
        }),
      }
    );

    const res = await response.json();

    if (res.code === "000" && res.msg === "success" && res.jwt) {
      cookies().set("kabd_token", res.jwt, {
        path: "/",
        maxAge: 60 * 60 * 24,
        expires: 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data?.msg);
    }
    console.log(error);
  }
};

export const isAuthenticated = async () => {
  try {
    return cookies().get("kabd_token") ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const isRegularMember = async () => {
  try {
    const token = cookies().get("kabd_token")?.value;

    if (token) {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET!);

      if (payload.data.m_regular !== "N") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const signOut = () => {
  cookies().delete("kabd_token");
};

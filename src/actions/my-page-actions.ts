"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserProfile() {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/member/member_info.php",
      {},
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

export async function updateDentistProfile(dentist: UpdateDentistProfile) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/member/member_upd.php",
      {
        m_type: "G",
        m_pwd: dentist.password,
        m_name: dentist.koreanName,
        m_en_name: dentist.englishName,
        m_jumin: dentist.birth,
        m_mobile: dentist.phone,
        m_license_number: dentist.license,
        m_email: dentist.email,
        m_school: dentist.university,
        m_major: dentist.major.join("|"),
        m_notices_method: dentist.type,
        m_zipcode: dentist.zipcode,
        m_addr1: dentist.address,
        m_addr2: dentist.addressDetail,
        m_address_select: dentist.addressType,
        m_position: dentist.addressName,
        m_position_phone: dentist.addressTel,
        m_sex: dentist.gender,
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

export async function updateGeneralProfile(general: UpdateGeneralProfile) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/member/member_upd.php",
      {
        m_type: "M",
        m_pwd: general.password,
        m_name: general.koreanName,
        m_en_name: general.englishName,
        m_jumin: general.birth,
        m_mobile: general.phone,
        m_license_number: "",
        m_email: general.email,
        m_school: "",
        m_major: [],
        m_notices_method: general.type,
        m_zipcode: general.zipcode,
        m_addr1: general.address,
        m_addr2: general.addressDetail,
        m_address_select: general.addressType,
        m_position: general.addressName,
        m_position_phone: general.addressTel,
        m_sex: general.gender,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies().get("kabd_token")?.value}`,
        },
      }
    );

    console.log(data);

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

export async function getPaymentList(page?: number) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/pay/history_sel.php",
      {
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

export async function getConferenceList(page?: number) {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/attendees/attendees_sel.php",
      {
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

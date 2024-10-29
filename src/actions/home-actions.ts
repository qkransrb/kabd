"use server";

import axios from "axios";

export const getHomeResources = async () => {
  try {
    const { data } = await axios.post(
      "https://api.kabd.or.kr/api/main/main.php",
      {}
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

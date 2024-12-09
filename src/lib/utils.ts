import { clsx, type ClassValue } from "clsx";
import { getMonth, subMonths } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYearAndMonth() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return String(month).length > 1 ? `${year}-${month}` : `${year}-0${month}`;
}

export function calcMonth(currentDate: Date, range: number) {
  return String(getMonth(subMonths(currentDate, range))).length > 1
    ? `${getMonth(subMonths(currentDate, range))}`
    : `0${getMonth(subMonths(currentDate, range))}`;
}

export function formatBytes(bytes: number, decimals: number = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function getVideoId(videoUrl: string) {
  return videoUrl.split("https://vimeo.com/")[1];
}

export function getMyPagePaymentType(typeNumber: string) {
  switch (typeNumber) {
    case "1":
      return "무통장";
    case "2":
      return "신용카드";
    case "3":
      return "계좌이체";
    case "4":
      return "가상계좌";
    default:
      return "";
  }
}

export function getMyPagePaymentStatus(status: string) {
  switch (status) {
    case "Y":
      return "결제완료";
    case "N":
      return "결제대기";
    case "S":
      return "결제실패";
    case "W":
      return "취소신청중";
    case "C":
      return "취소완료";
    default:
      return "";
  }
}

export function getProductTitleBySeq(seq: string): string {
  switch (seq) {
    case "1":
      return "입회비";
    case "2":
      return "입회비(1년)";
    case "3":
      return "입회비(3년)";
    case "4":
      return "입회비(4년)";
    case "5":
      return "종신회비";
    default:
      return "";
  }
}

export function getProductSeqByTitle(title: string): string {
  switch (title) {
    case "입회비":
      return "1";
    case "입회비(1년)":
      return "2";
    case "입회비(3년)":
      return "3";
    case "입회비(4년)":
      return "4";
    case "종신회비":
      return "5";
    default:
      return "";
  }
}

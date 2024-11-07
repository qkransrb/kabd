"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cancelConference } from "@/actions/conference-actions";
import { getMyPagePaymentStatus, getMyPagePaymentType } from "@/lib/utils";

import receiptPhrase from "@/assets/images/receipt/receipt-phrase.png";
import receiptKabd from "@/assets/images/receipt/receipt-kabd.png";

interface Props {
  conferenceList: MyPageConferenceList;
}

const MyPageConference = ({ conferenceList }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const router = useRouter();

  return (
    <div>
      <div className="mb-[18px]">
        <p className="text-[26px] font-bold leading-[31.2px]">학술대회</p>
      </div>
      <Separator className="h-[3px] bg-black mb-10" />
      <div>
        <p className="text-[20px] font-bold mb-3">학술대회 신청내역</p>
        <Table>
          <TableHeader className="border-t-[2px] border-[#111111]">
            <TableRow className="bg-[#F4F5FA]">
              <TableHead className="text-center text-lg font-semibold text-black">
                내역
              </TableHead>
              <TableHead className="text-center text-lg font-semibold text-black">
                결제금액
              </TableHead>
              <TableHead className="text-center text-lg font-semibold text-black">
                결제상태
              </TableHead>
              <TableHead className="text-center text-lg font-semibold text-black">
                결제수단
              </TableHead>
              <TableHead className="text-center text-lg font-semibold text-black">
                결제일
              </TableHead>
              <TableHead className="text-center text-lg font-semibold text-black">
                취소신청
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conferenceList.list.map((conference) => (
              <TableRow key={conference.a_seq}>
                <TableCell className="text-center">
                  {conference.ac_ac_title}
                </TableCell>
                <TableCell className="text-center">
                  {Number(conference.a_amount).toLocaleString("kr")}원
                </TableCell>
                <TableCell className="text-center">
                  {getMyPagePaymentStatus(conference.a_pay_status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-between">
                    <div className="w-1/2 text-center">
                      {getMyPagePaymentType(conference.a_pay_type)}
                    </div>
                    <div className="w-1/2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full h-[35px] border border-[#D2D2D2] rounded-[10px] flex items-center justify-center"
                          >
                            영수증 출력
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          ref={contentRef}
                          className="p-9 sm:max-w-[460px]"
                        >
                          <DialogHeader>
                            <DialogTitle className="text-[29px] font-semibold custom-letter-spacing text-center">
                              영수증
                            </DialogTitle>
                            <Button
                              onClick={() => {
                                reactToPrintFn();
                              }}
                              variant="ghost"
                              className="absolute !m-0"
                            >
                              <Printer className="!size-6" />
                            </Button>
                            <DialogDescription hidden />
                          </DialogHeader>
                          <div className="pt-[70px] pb-[60px]">
                            <p className="text-[17px] font-semibold custom-letter-spacing mb-3">
                              {conference.a_pay_date
                                .split(" ")[0]
                                .split("-")
                                .join(".")}{" "}
                              결제정보
                            </p>
                            <Table>
                              <TableHeader className="border-t border-[#111111] h-12">
                                <TableRow className="bg-[#F4F5FA] border-b border-[#D2D2D2]">
                                  <TableHead className="text-center text-black text-lg font-normal w-1/2 border-r border-[#D2D2D2]">
                                    학술대회명
                                  </TableHead>
                                  <TableHead className="text-center text-black text-lg font-normal w-1/2">
                                    등록비
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody className="border-b border-[#D2D2D2] h-12">
                                <TableRow>
                                  <TableCell className="text-center text-lg font-normal w-1/2 border-r border-[#D2D2D2] p-0">
                                    {conference.ac_ac_title}
                                  </TableCell>
                                  <TableCell className="text-center text-lg font-normal w-1/2 p-0">
                                    {Number(conference.a_amount).toLocaleString(
                                      "kr"
                                    )}
                                    원
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                            <Separator className="bg-black mt-[70px] mb-1" />
                            <div className="text-lg font-semibold flex items-center justify-between">
                              <span>총금액</span>
                              <span>
                                {Number(conference.a_amount).toLocaleString(
                                  "kr"
                                )}
                                원
                              </span>
                            </div>
                          </div>
                          <DialogFooter className="w-full flex items-center justify-center">
                            <div className="w-full flex items-center justify-center flex-col gap-5">
                              <div className="w-full flex items-center justify-center">
                                <span className="text-[17px] font-normal custom-letter-spacing">
                                  {new Date().getFullYear()}년{" "}
                                  {String(new Date().getMonth() + 1).length > 1
                                    ? new Date().getMonth() + 1
                                    : `0${new Date().getMonth() + 1}`}
                                  월{" "}
                                  {String(new Date().getDate()).length > 1
                                    ? new Date().getDate()
                                    : `0${new Date().getDate()}`}
                                  일
                                </span>
                              </div>
                              <div className="w-full flex items-center justify-center relative h-[70px]">
                                <Image
                                  src={receiptPhrase}
                                  alt="kabd"
                                  width={143}
                                  height={20}
                                  className="absolute w-[143px] h-[20px] object-contain"
                                />
                                <Image
                                  src={receiptKabd}
                                  alt="kabd"
                                  width={80}
                                  height={80}
                                  className="absolute w-[80px] h-[80px] object-contain right-0"
                                />
                              </div>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {conference.a_pay_date.split(" ")[0].split("-").join(".")}{" "}
                </TableCell>
                <TableCell className="text-center">
                  {conference.a_pay_status === "W" ? (
                    <span className="text-center">취소신청중</span>
                  ) : conference.a_pay_status === "C" ? (
                    <span className="text-center">취소완료</span>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        const result = await cancelConference(conference.a_seq);
                        if (result.code === "000" && result.msg === "success") {
                          router.refresh();
                          window.alert("취소신청 되었습니다.");
                        } else {
                          window.alert(result.msg);
                        }
                      }}
                      className="w-full h-[35px] border border-[#D2D2D2] rounded-[10px] flex items-center justify-center"
                    >
                      취소신청
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyPageConference;

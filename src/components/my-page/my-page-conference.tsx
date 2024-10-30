"use client";

import Image from "next/image";

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

import receiptPhrase from "@/assets/images/receipt/receipt-phrase.png";
import receiptCircle from "@/assets/images/receipt/receipt-circle.png";

const payments = [
  {
    id: 1,
    title: "2024 추계학술대회",
    amount: 800000,
    status: "결제완료",
    method: "계좌이체",
    createdAt: "24.09.01",
  },
  {
    id: 2,
    title: "2024 추계학술대회",
    amount: 50000,
    status: "결제완료",
    method: "카드",
    createdAt: "24.08.01",
  },
  {
    id: 3,
    title: "2024 추계학술대회",
    amount: 50000,
    status: "결제완료",
    method: "카드",
    createdAt: "24.08.01",
  },
];

const MyPageConference = () => {
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
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="text-center">{payment.title}</TableCell>
                <TableCell className="text-center">
                  {payment.amount.toLocaleString("kr")}원
                </TableCell>
                <TableCell className="text-center">{payment.status}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-between">
                    <div className="w-1/2 text-center">{payment.method}</div>
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
                        <DialogContent className="p-9 sm:max-w-[460px]">
                          <DialogHeader>
                            <DialogTitle className="text-[29px] font-semibold custom-letter-spacing text-center">
                              영수증
                            </DialogTitle>
                            <DialogDescription hidden />
                          </DialogHeader>
                          <div className="pt-[70px] pb-[60px]">
                            <p className="text-[17px] font-semibold custom-letter-spacing mb-3">
                              24년 06월 01일 결제정보
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
                                    2024 추계학술대회
                                  </TableCell>
                                  <TableCell className="text-center text-lg font-normal w-1/2 p-0">
                                    100,000원
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                            <Separator className="bg-black mt-[70px] mb-1" />
                            <div className="text-lg font-semibold flex items-center justify-between">
                              <span>총금액</span>
                              <span>100,000원</span>
                            </div>
                          </div>
                          <DialogFooter className="w-full flex items-center justify-center">
                            <div className="w-full flex items-center justify-center flex-col gap-5">
                              <div className="w-full flex items-center justify-center">
                                <span className="text-[17px] font-normal custom-letter-spacing">
                                  2024년 11월 30일
                                </span>
                              </div>
                              <div className="w-full flex items-center justify-center relative">
                                <Image
                                  src={receiptCircle}
                                  alt="kabd"
                                  width={71}
                                  height={71}
                                  className="w-[71px] h-[71px] object-contain"
                                />
                                <Image
                                  src={receiptPhrase}
                                  alt="kabd"
                                  width={143}
                                  height={20}
                                  className="absolute w-[143px] h-[20px] object-contain"
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
                  {payment.createdAt}
                </TableCell>
                <TableCell className="text-center">취소완료</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyPageConference;

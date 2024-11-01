"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import Pagination from "@/components/pagination";
import { cn, getMyPagePaymentStatus, getMyPagePaymentType } from "@/lib/utils";

import receiptPhrase from "@/assets/images/receipt/receipt-phrase.png";
import receiptCircle from "@/assets/images/receipt/receipt-circle.png";

const formSchema = z.object({
  type: z.string().min(1),
  amount: z.string().min(1),
  method: z.string().min(1),
});

interface Props {
  paymentList: MyPagePaymentList;
}

const MyPayment = ({ paymentList }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      amount: "",
      method: "",
    },
  });

  const onPageChange = (event: any) => {
    const { selected } = event;
    router.push(`/my-page/payment?page=${selected + 1}`);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <div className="mb-[18px]">
        <p className="text-[26px] font-bold leading-[31.2px]">입·연회비</p>
      </div>
      <Separator className="h-[3px] bg-black mb-10" />
      <div className="mb-[58px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center gap-x-2"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex items-center w-[160px]">
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);

                      switch (value) {
                        case "입회비":
                          return form.setValue("amount", "50000");
                        case "연회비(1년)":
                          return form.setValue("amount", "50000");
                        case "연회비(3년)":
                          return form.setValue("amount", "150000");
                        case "연회비(5년)":
                          return form.setValue("amount", "500000");
                        case "종신회비":
                          return form.setValue("amount", "800000");
                        default:
                          break;
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "h-[50px] text-base text-[#828282] font-medium custom-letter-spacing rounded-[10px]",
                          form.getFieldState(field.name).error &&
                            "border-[#D00000]"
                        )}
                      >
                        <SelectValue
                          placeholder="납부종류"
                          className="placeholder:text-[#828282]"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-base font-medium custom-letter-spacing">
                      <SelectItem value="입회비">입회비</SelectItem>
                      <SelectItem value="연회비(1년)">연회비(1년)</SelectItem>
                      <SelectItem value="연회비(3년)">연회비(3년)</SelectItem>
                      <SelectItem value="연회비(5년)">연회비(5년)</SelectItem>
                      <SelectItem value="종신회비">종신회비</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="flex items-center w-[160px]">
                  <FormControl>
                    <Input
                      placeholder="결제금액"
                      {...field}
                      className={cn(
                        "h-[50px] text-base text-[#828282] font-medium custom-letter-spacing rounded-[10px]",
                        form.getFieldState(field.name).error &&
                          "border-[#D00000]"
                      )}
                      readOnly
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem className="flex items-center w-[160px]">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "h-[50px] text-base text-[#828282] font-medium custom-letter-spacing rounded-[10px]",
                          form.getFieldState(field.name).error &&
                            "border-[#D00000]"
                        )}
                      >
                        <SelectValue
                          placeholder="결제수단"
                          className="placeholder:text-[#828282]"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-base font-medium custom-letter-spacing">
                      <SelectItem value="카드결제">카드결제</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-[167px] h-[50px] rounded-[10px] text-base text-white font-semibold custom-letter-spacing"
            >
              결제하기
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <p className="text-[20px] font-bold">입·연회비 납부내역</p>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F4F5FA]">
              <TableHead className="w-2/12 text-center text-lg font-semibold text-black">
                내역
              </TableHead>
              <TableHead className="w-2/12 text-center text-lg font-semibold text-black">
                결제금액
              </TableHead>
              <TableHead className="w-2/12 text-center text-lg font-semibold text-black">
                결제상태
              </TableHead>
              <TableHead className="w-4/12 text-center text-lg font-semibold text-black">
                결제수단
              </TableHead>
              <TableHead className="w-2/12 text-center text-lg font-semibold text-black">
                결제일
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentList.List.map((payment) => (
              <TableRow key={payment.ph_seq}>
                <TableCell className="w-2/12 text-center">
                  {payment.pp_title}
                </TableCell>
                <TableCell className="w-2/12 text-center">
                  {Number(payment.ph_amount).toLocaleString("kr")}원
                </TableCell>
                <TableCell className="w-2/12 text-center">
                  {getMyPagePaymentStatus(payment.ph_pay_status)}
                </TableCell>
                <TableCell className="w-4/12">
                  <div className="flex items-center justify-between">
                    <div className="w-1/2 text-center">
                      {getMyPagePaymentType(payment.ph_pay_type)}
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
                        <DialogContent className="p-9 sm:max-w-[460px]">
                          <DialogHeader>
                            <DialogTitle className="text-[29px] font-semibold custom-letter-spacing text-center">
                              영수증
                            </DialogTitle>
                            <DialogDescription hidden />
                          </DialogHeader>
                          <div className="pt-[70px] pb-[60px]">
                            <p className="text-[17px] font-semibold custom-letter-spacing mb-3">
                              {payment.ph_date
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
                                    {payment.pp_title}
                                  </TableCell>
                                  <TableCell className="text-center text-lg font-normal w-1/2 p-0">
                                    {Number(payment.ph_amount).toLocaleString(
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
                                {Number(payment.ph_amount).toLocaleString("kr")}
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
                <TableCell className="w-2/12 text-center">
                  {payment.ph_date.split(" ")[0].split("-").join(".")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-[50px]">
        <Pagination
          onPageChange={onPageChange}
          pageCount={paymentList.page_cnt}
        />
      </div>
    </div>
  );
};

export default MyPayment;

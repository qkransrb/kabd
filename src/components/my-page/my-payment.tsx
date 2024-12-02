"use client";

import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";

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
import { registProduct } from "@/actions/my-page-actions";
import { cn, getMyPagePaymentStatus, getMyPagePaymentType } from "@/lib/utils";

import receiptPhrase from "@/assets/images/receipt/receipt-phrase.png";
import receiptKabd from "@/assets/images/receipt/receipt-kabd.png";

const formSchema = z.object({
  type: z.string().min(1),
  amount: z.string().min(1),
  method: z.string().min(1),
});

interface Props {
  productList: ProductList;
  paymentList: MyPagePaymentList;
}

const MyPayment = ({ productList, paymentList }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      amount: "",
      method: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPageChange = (event: any) => {
    const { selected } = event;
    router.push(`/my-page/payment?page=${selected + 1}`);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.method === "1") {
      const result = await registProduct(values.type, "", values.method);
      if (result.code === "000" && result.msg === "success") {
        window.alert("입·연회비 납부 신청이 완료되었습니다.");
        router.refresh();
      } else {
        window.alert("입·연회비 납부 신청에 실패하였습니다.");
      }
    } else {
      window.alert("카드결제는 준비중 입니다.");
    }
  };

  return (
    <div>
      <div className="lg:mb-[18px]">
        <p className="text-[21px] lg:text-[26px] font-bold lg:leading-[31.2px]">
          입·연회비
        </p>
      </div>
      <Separator className="h-[2px] lg:h-[3px] bg-black mb-2 lg:mb-10" />
      <div className="mb-[100px] lg:mb-[58px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row items-start lg:items-center lg:gap-x-2 gap-y-2 lg:gap-y-0"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex items-center w-full lg:w-[160px]">
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      const product: Product | undefined =
                        productList.productList.find(
                          (product) => product.pp_seq === value
                        );
                      if (product) {
                        return form.setValue("amount", product.pp_amount);
                      } else {
                        return form.setValue("amount", "");
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "h-[50px] text-sm lg:text-base text-[#828282] font-medium custom-letter-spacing rounded-[6px] lg:rounded-[10px]",
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
                      {productList.productList.map((product) => (
                        <SelectItem key={product.pp_seq} value={product.pp_seq}>
                          {product.pp_title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="flex items-center w-full lg:w-[160px]">
                  <FormControl>
                    <Input
                      placeholder="결제금액"
                      {...field}
                      className={cn(
                        "h-[50px] text-sm lg:text-base text-[#828282] font-medium custom-letter-spacing rounded-[6px] lg:rounded-[10px]",
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
                <FormItem className="flex items-center w-full lg:w-[160px]">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "h-[50px] text-sm lg:text-base text-[#828282] font-medium custom-letter-spacing rounded-[6px] lg:rounded-[10px]",
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
                      <SelectItem value="1">무통장</SelectItem>
                      <SelectItem value="2">카드결제</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full lg:w-[167px] h-[50px] rounded-[6px] lg:rounded-[10px] text-base text-white font-semibold custom-letter-spacing"
            >
              결제하기
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <p className="text-[21px] lg:text-[20px] font-bold">
          입·연회비 납부내역
        </p>
        {/* DESKTOP */}
        <div className="hidden lg:block">
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
                  <TableCell className="w-3/12 text-center">
                    {payment.pp_title}
                  </TableCell>
                  <TableCell className="w-2/12 text-center">
                    {Number(payment.ph_amount).toLocaleString("kr")}원
                  </TableCell>
                  <TableCell className="w-2/12 text-center">
                    {getMyPagePaymentStatus(payment.ph_pay_status)}
                  </TableCell>
                  <TableCell className="w-3/12">
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
                                      내역
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
                                  {Number(payment.ph_amount).toLocaleString(
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
                                    {String(new Date().getMonth() + 1).length >
                                    1
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
                                    className="absolute w-[80px] h-[80px] object-contain right-[52px]"
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

        {/* MOBILE */}
        <div className="lg:hidden border-t-[2px] border-black flex flex-col">
          {paymentList.List.map((payment) => (
            <div
              key={`m_p_${payment.ph_seq}`}
              className="px-5 py-7 bg-[#F4F5FA] mt-4 rounded-[10px] shadow-md"
            >
              <div>
                <span className="text-[15px] text-[#595959] font-normal">
                  {payment.ph_date.split(" ")[0].split("-").join(".")}
                </span>
                <div className="mt-2">
                  <p className="text-[20px] font-bold">{payment.pp_title}</p>
                  <p className="text-[18px] font-bold">
                    {Number(payment.ph_amount).toLocaleString("kr")}원
                  </p>
                </div>
              </div>
              <Separator className="bg-[#D2D2D2] my-4" />
              <div className="flex items-center justify-between">
                <p className="text-[17px] font-semibold">
                  {getMyPagePaymentStatus(payment.ph_pay_status)}
                </p>
                <div className="flex items-center gap-x-2">
                  <p>{getMyPagePaymentType(payment.ph_pay_type)}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="w-auto h-[35px] border border-[#D2D2D2] rounded-[10px] flex items-center justify-center"
                      >
                        영수증 출력
                      </Button>
                    </DialogTrigger>
                    <DialogContent ref={contentRef} className="py-10">
                      <DialogHeader>
                        <DialogTitle className="text-[21px] font-semibold custom-letter-spacing text-center">
                          영수증
                        </DialogTitle>
                        <DialogDescription hidden />
                      </DialogHeader>
                      <div className="py-5">
                        <p className="text-base font-semibold custom-letter-spacing">
                          {payment.ph_date.split(" ")[0].split("-").join(".")}{" "}
                          결제정보
                        </p>
                        <div className="border-t border-[#111111]">
                          <div className="border-b border-[#D2D2D2] flex items-center h-[50px]">
                            <div className="w-1/3 h-full px-2 border-r border-[#D2D2D2] flex items-center text-base font-semibold">
                              내역
                            </div>
                            <div className="w-2/3 flex items-center justify-end px-2">
                              {payment.pp_title}
                            </div>
                          </div>
                          <div className="border-b border-[#D2D2D2] flex items-center h-[50px]">
                            <div className="w-1/3 h-full px-2 border-r border-[#D2D2D2] flex items-center text-base font-semibold">
                              등록비
                            </div>
                            <div className="w-2/3 flex items-center justify-end px-2">
                              {Number(payment.ph_amount).toLocaleString("kr")}원
                            </div>
                          </div>
                        </div>
                        <Separator className="bg-black mt-[70px] mb-1" />
                        <div className="text-base font-semibold flex items-center justify-between">
                          <span>총금액</span>
                          <span>
                            {Number(payment.ph_amount).toLocaleString("kr")}원
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
                              className="absolute w-[80px] h-[80px] object-contain right-[24px]"
                            />
                          </div>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
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

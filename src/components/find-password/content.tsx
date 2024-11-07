"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/actions/find-actions";
import { useState } from "react";
import { authCodeConfirm, sendAuthCode } from "@/actions/auth-actions";

const formSchema = z
  .object({
    userId: z.string().min(1),
    username: z.string().min(1),
    phone: z.string().min(10),
    phoneConfirm: z
      .boolean()
      .default(false)
      .refine((value) => value === true),
    confirmNumber: z.string().min(6),
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/),
    confirmPassword: z
      .string()
      .min(8)
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "입력하신 내용을 다시 확인해주세요.",
        path: ["confirmPassword"],
      });
    }
  });

export type FindPasswordValues = z.infer<typeof formSchema>;

const Content = () => {
  const [fetchSuccess, setFetchSuccess] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      username: "",
      phone: "",
      phoneConfirm: false,
      confirmNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await resetPassword(values);

    if (result.code === "000" && result.msg === "success") {
      router.push("/find-password/confirm");
    } else {
      window.alert("비밀번호 변경에 실패하였습니다.");
    }
  };

  const handleNextStep = () => {
    if (form.getValues("phoneConfirm")) {
      setFetchSuccess(true);
    } else {
      return alert("휴대전화 인증을 진행해주세요.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto h-[calc(100vh_-_140px)]">
      <div className="flex items-center justify-center flex-col mt-[118px]">
        <h2 className="text-[30px] font-bold leading-[35.8px] custom-letter-spacing mb-[30px]">
          아이디/비밀번호 찾기
        </h2>
        {fetchSuccess ? (
          <p className="mb-5 text-lg text-[#626262] font-semibold">
            비밀번호를 재설정 해주세요.
          </p>
        ) : (
          <div className="max-w-[520px] mx-auto w-full flex items-center justify-between gap-5 mb-6">
            <Link
              href="/find-id"
              className="flex items-center justify-center w-1/2 bg-[#F4F5FA] h-[56px] rounded-[10px] text-lg text-black font-semibold custom-letter-spacing border border-[#D2D2D2]"
            >
              아이디 찾기
            </Link>
            <Link
              href="/find-password"
              className="flex items-center justify-center w-1/2 bg-[#2C2C2C] h-[56px] rounded-[10px] text-lg text-white font-semibold custom-letter-spacing"
            >
              비밀번호 찾기
            </Link>
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[520px] w-full"
          >
            <div hidden={fetchSuccess}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="아이디"
                          className="h-[56px] rounded-[10px] w-full px-5"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="이름"
                          className="h-[56px] rounded-[10px] w-full px-5"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3 flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="휴대전화번호"
                          className="h-[56px] rounded-[10px] w-full px-5"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <button
                  type="button"
                  onClick={async () => {
                    const result = await sendAuthCode(form.getValues("phone"));
                    if (result.code === "000" && result.msg === "success") {
                      window.alert("인증번호를 발송하였습니다.");
                    } else {
                      window.alert("인증번호 발송에 실패하였습니다.");
                    }
                  }}
                  className="min-w-[120px] bg-[#2C2C2C] text-white h-[56px] rounded-[10px] px-4 font-medium"
                >
                  인증번호 발송
                </button>
              </div>
              <div className="mb-6 flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="confirmNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="인증번호"
                          className="h-[56px] rounded-[10px] w-full px-5"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <button
                  type="button"
                  onClick={async () => {
                    const result = await authCodeConfirm(
                      form.getValues("confirmNumber"),
                      form.getValues("phone")
                    );
                    if (result.code === "000" && result.msg === "success") {
                      form.setValue("phoneConfirm", true);
                      window.alert("인증 성공하였습니다.");
                    } else {
                      form.setValue("phoneConfirm", false);
                      window.alert("인증 실패하였습니다.");
                    }
                  }}
                  className="min-w-[120px] bg-[#2C2C2C] text-white h-[56px] rounded-[10px] px-4 font-medium"
                >
                  확인
                </button>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="h-[56px] w-[345px] rounded-[10px] flex items-center justify-center text-lg font-semibold custom-letter-spacing bg-[#2C2C2C]"
                  disabled={fetchSuccess}
                >
                  다음 단계
                </Button>
              </div>
            </div>
            <div hidden={!fetchSuccess}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="비밀번호"
                          className="h-[56px] rounded-[10px] w-full px-5"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="비밀번호 확인"
                          className="h-[56px] rounded-[10px] w-full px-5"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  className="h-[56px] w-[345px] rounded-[10px] flex items-center justify-center text-lg font-semibold custom-letter-spacing bg-[#2C2C2C]"
                >
                  확인
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Content;

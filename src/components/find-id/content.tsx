"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { findId } from "@/actions/find-actions";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(1),
  phone: z.string().min(10),
});

export type FindIdValues = z.infer<typeof formSchema>;

const Content = () => {
  const [fetchSuccess, setFetchSuccess] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await findId(values);

    if (result.code === "000" && result.msg === "success") {
      setFetchSuccess(true);
      setUserId(result.m_id);
      setCreatedAt(result.m_date);
      form.reset();
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
            회원정보와 일치하는 아이디입니다.
          </p>
        ) : (
          <div className="max-w-[520px] mx-auto w-full flex items-center justify-between gap-5 mb-6">
            <Link
              href="/find-id"
              className="flex items-center justify-center w-1/2 bg-[#2C2C2C] h-[56px] rounded-[10px] text-lg text-white font-semibold custom-letter-spacing"
            >
              아이디 찾기
            </Link>
            <Link
              href="/find-password"
              className="flex items-center justify-center w-1/2 bg-[#F4F5FA] h-[56px] rounded-[10px] text-lg text-black font-semibold custom-letter-spacing border border-[#D2D2D2]"
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
            <div className="mb-3 relative">
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
                        readOnly={fetchSuccess}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {fetchSuccess ? (
                <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-medium custom-letter-spacing z-10">
                  {userId}
                </p>
              ) : null}
            </div>
            <div className="mb-6 relative">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="휴대전화번호"
                        className="h-[56px] rounded-[10px] w-full px-5"
                        readOnly={fetchSuccess}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {fetchSuccess ? (
                <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-medium custom-letter-spacing z-10">
                  {createdAt}
                </p>
              ) : null}
            </div>
            <div className="flex items-center justify-center">
              {fetchSuccess ? (
                <Link
                  href="/find-password"
                  className="h-[56px] w-[345px] rounded-[10px] flex items-center justify-center text-lg font-semibold custom-letter-spacing bg-[#2C2C2C] text-white"
                >
                  비밀번호 찾기
                </Link>
              ) : (
                <Button
                  type="submit"
                  className="h-[56px] w-[345px] rounded-[10px] flex items-center justify-center text-lg font-semibold custom-letter-spacing bg-[#2C2C2C]"
                  disabled={fetchSuccess}
                >
                  다음 단계
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Content;

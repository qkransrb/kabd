"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/actions/auth-actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

export type SignInValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const [saveUserId, setSaveUserId] = useState<boolean>(false);

  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  useEffect(() => {
    const userId = window.localStorage.getItem("kabd_userid");

    if (userId) {
      setSaveUserId(true);
      form.setValue("userId", userId);
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    saveUserId
      ? window.localStorage.setItem("kabd_userid", values.userId)
      : window.localStorage.removeItem("kabd_userid");

    const user: AuthUser = await signIn(values);

    if (user.code === "000" && user.msg === "success") {
      window.localStorage.setItem(
        "kabd_user",
        JSON.stringify({
          userId: user.m_id,
          name: user.m_name,
          mobile: user.m_mobile,
          emial: user.m_email,
          grade: user.m_regular,
          type: user.m_type,
        })
      );

      router.push("/");
    } else {
      toast({
        title: user.msg,
        variant: "destructive",
      });
    }
  };

  const toggleSaveUserId = () => {
    setSaveUserId((prev) => !prev);
  };

  return (
    <div className="min-screen-height py-[118px] max-w-screen-xl mx-auto flex flex-col items-center">
      <h2 className="text-[30px] font-bold leading-[36px] text-center mb-[60px]">
        회원님
        <br />
        로그인을 해주세요.
      </h2>
      <div className="w-[345px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mb-11">
            <div className="mb-2.5">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="아이디 입력"
                          className="h-14 text-base placeholder:text-[#828282] font-medium border-[#D2D2D2] rounded-[10px]"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={toggleSaveUserId}
                        className="flex items-center gap-x-1 absolute top-1/2 -translate-y-1/2 right-4 h-[19px]"
                      >
                        <CircleCheck
                          size={20}
                          fill={saveUserId ? "#000000" : "#D2D2D2"}
                          color="#FFFFFF"
                        />
                        <span className="text-base font-medium">저장</span>
                      </button>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-7">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="비밀번호 입력"
                          className="h-14 text-base placeholder:text-[#828282] font-medium border-[#D2D2D2] rounded-[10px]"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="h-14 text-lg font-semibold w-full rounded-[10px]"
            >
              로그인
            </Button>
          </form>
        </Form>

        <div className="flex items-center justify-between mb-[70px]">
          <Link
            href="/find-id"
            className="text-base font-medium leading-[19.2px] custom-letter-spacing"
          >
            아이디/비밀번호 찾기
          </Link>
          <Link
            href="/sign-up"
            className="text-base font-medium leading-[19.2px] custom-letter-spacing"
          >
            회원가입
          </Link>
        </div>

        <p className="text-[15px] leading-[18px] font-medium text-[#595959] custom-letter-spacing mb-[30px] whitespace-nowrap">
          * 로그인 오류 시 070-5153-2795으로 문의주시기 바랍니다.
        </p>

        <Separator className="bg-[#D2D2D2] mb-[72px]" />
      </div>
    </div>
  );
};

export default SignInForm;

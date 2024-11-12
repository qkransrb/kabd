"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "@/actions/auth-actions";

const formSchema = z.object({
  userId: z.string().min(1, { message: "Required" }),
  password: z.string().min(1, { message: "Required" }),
});

const LoginForm = () => {
  const [saveUserId, setSaveUserId] = useState<boolean>(false);

  const router = useRouter();

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
          email: user.m_email,
          grade: user.m_regular,
          type: user.m_type,
        })
      );

      router.push("/");
    } else {
      window.alert(user.msg);
    }
  };

  const toggleSaveUserId = () => {
    setSaveUserId((prev) => !prev);
  };

  return (
    <Card className="w-[414px] h-[441px] rounded-[20px] overflow-hidden px-8 py-14 flex flex-col justify-between border-[#D2D2D2]">
      <h2 className="text-[26px] font-bold leading-[31px] mb-8">Login</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between mb-8"
        >
          <div className="flex-1 mb-7 flex flex-col justify-between">
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
            className="h-14 text-lg font-semibold rounded-[10px]"
          >
            로그인
          </Button>
        </form>
        <div className="flex items-center justify-between">
          <Link href="/find-id" className="text-base font-medium">
            아이디/비밀번호 찾기
          </Link>
          <Link href="/sign-up" className="text-base font-medium">
            회원가입
          </Link>
        </div>
      </Form>
    </Card>
  );
};

export default LoginForm;

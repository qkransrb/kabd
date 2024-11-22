"use client";

import { useState } from "react";

import SubTitle from "@/components/sub-title";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Postcode from "@/components/postcode";
import {
  authCodeConfirm,
  checkForDuplicates,
  generalSignUp,
  sendAuthCode,
} from "@/actions/auth-actions";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    userId: z.string().min(1),
    userIdConfirm: z
      .boolean()
      .default(false)
      .refine((value) => value === true),
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/),
    confirmPassword: z
      .string()
      .min(8)
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/),
    koreanName: z.string().min(1),
    englishName: z.string().min(1),
    birth: z.string().min(8),
    gender: z.string(),
    phone: z.string().min(1),
    confirmNumber: z.string().min(6),
    phoneConfirm: z
      .boolean()
      .default(false)
      .refine((value) => value === true),
    email: z.string().email(),
    type: z.string(),
    addressType: z.string(),
    addressName: z.string(),
    addressTel: z.string(),
    zipcode: z.string().min(1),
    address: z.string(),
    addressDetail: z.string(),
    terms: z.boolean().default(false).optional(),
    term1: z
      .boolean()
      .default(false)
      .refine((value) => value === true),
    term2: z
      .boolean()
      .default(false)
      .refine((value) => value === true),
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

export type GeneralSignUp = z.infer<typeof formSchema>;

const GeneralForm = () => {
  const [addressType, setAddressType] = useState<"H" | "J">("J");
  const [address, setAddress] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [confirmUserId, setConfirmUserId] = useState<boolean>(true);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      userIdConfirm: false,
      password: "",
      confirmPassword: "",
      koreanName: "",
      englishName: "",
      birth: "",
      gender: "M",
      phone: "",
      confirmNumber: "",
      phoneConfirm: false,
      email: "",
      type: "S",
      addressType: "J",
      addressName: "",
      addressTel: "",
      zipcode: "",
      address: "",
      addressDetail: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.userIdConfirm) {
      return window.alert("아이디 중복 확인을 진행해주세요.");
    }

    if (!values.phoneConfirm) {
      return window.alert("휴대전화 인증 확인을 진행해주세요.");
    }

    if (await generalSignUp(values)) {
      window.alert("회원가입에 성공하였습니다.");

      form.reset();
      router.push("/sign-in");
    } else {
      window.alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto py-16 lg:py-24 px-5 lg:px-0">
      <div className="flex items-center justify-center mb-10">
        <SubTitle text="회원가입" />
      </div>
      <h3 className="text-sm lg:text-[26px] font-bold lg:leading-[31.2px] mb-2 lg:mb-4">
        가입정보(필수입력)
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border-t-[2px] lg:border-t-[3px] border-t-[#111111]"
        >
          <div className="flex border-b border-b-[#D2D2D2] h-[50px] lg:h-[70px]">
            <div className="bg-[#F4F5FA] min-w-[102px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                아이디
              </span>
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center gap-1 lg:gap-3 px-2 lg:px-[22px]">
                    <FormControl>
                      <Input
                        placeholder="아이디 입력"
                        className={cn(
                          "w-[150px] lg:max-w-[292px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
                          (form.getFieldState(field.name).error ||
                            form.getFieldState("userIdConfirm").invalid) &&
                            "border-[#D00000]"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={async () => {
                        if (
                          await checkForDuplicates(form.getValues("userId"))
                        ) {
                          form.setValue("userIdConfirm", true);
                          setConfirmUserId(true);
                          window.alert("사용 가능한 아이디 입니다.");
                        } else {
                          form.setValue("userIdConfirm", false);
                          setConfirmUserId(false);
                          window.alert("사용하실 수 없는 아이디입니다.");
                        }
                      }}
                      className={cn(
                        "h-[38px] lg:h-10 rounded-[6px] lg:rounded-full w-auto lg:w-[93px] text-xs lg:text-sm font-medium custom-letter-spacing text-white leading-[16.8px] !m-0 text-nowrap px-1 lg:px-0 pt-1 lg:pt-0",
                        form.getFieldState(field.name).invalid ||
                          form.getValues(field.name) === ""
                          ? "bg-[#828282]"
                          : "bg-black"
                      )}
                    >
                      중복 확인
                    </button>
                    {!confirmUserId && (
                      <p className="text-sm font-medium custom-letter-spacing text-[#D00000]">
                        사용하실 수 없는 아이디입니다.
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex border-b border-b-[#D2D2D2] h-[50px] lg:h-[70px]">
            <div className="bg-[#F4F5FA] min-w-[102px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                비밀번호
              </span>
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center gap-3 px-2 lg:px-[22px]">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호 입력"
                        className={cn(
                          "w-[150px] lg:max-w-[292px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
                          form.getFieldState(field.name).error &&
                            "border-[#D00000]"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <p className="text-sm text-[#828282] font-medium leading-[16.8px] custom-letter-spacing hidden lg:block">
                      8~16자의 영문/숫자를 조합하여 입력
                    </p>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex border-b border-b-[#D2D2D2] h-[50px] lg:h-[70px]">
            <div className="bg-[#F4F5FA] min-w-[102px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                비밀번호 확인
              </span>
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center px-2 lg:px-[22px]">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호 확인"
                        className={cn(
                          "w-[150px] lg:max-w-[292px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
                          form.getFieldState(field.name).error &&
                            "border-[#D00000]"
                        )}
                        {...field}
                      />
                    </FormControl>
                    {form.getFieldState(field.name).error?.type === "custom" ? (
                      <FormMessage className="px-3" />
                    ) : null}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex border-b border-b-[#D2D2D2] h-auto lg:h-[70px]">
            <div className="bg-[#F4F5FA] min-w-[102px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                이름
              </span>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-y-2 lg:gap-y-0 gap-x-3">
              <FormField
                control={form.control}
                name="koreanName"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center pt-2 lg:pt-0 pl-2 lg:pl-[22px]">
                    <FormControl>
                      <Input
                        placeholder="국문 이름"
                        className={cn(
                          "w-[150px] lg:min-w-[223px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
                          form.getFieldState(field.name).error &&
                            "border-[#D00000]"
                        )}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="englishName"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center pb-2 lg:pb-0 pl-2 lg:pl-0 lg:pr-[22px]">
                    <FormControl>
                      <Input
                        placeholder="영문 이름"
                        className={cn(
                          "w-[150px] lg:min-w-[223px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
                          form.getFieldState(field.name).error &&
                            "border-[#D00000]"
                        )}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex border-b border-b-[#D2D2D2] h-[50px] lg:h-[70px]">
            <div className="bg-[#F4F5FA] min-w-[102px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                생년월일
              </span>
            </div>
            <div className="w-full flex items-center gap-x-3">
              <FormField
                control={form.control}
                name="birth"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center pl-2 lg:pl-[22px]">
                    <FormControl>
                      <Input
                        placeholder="생년월일 8자리"
                        className={cn(
                          "w-[150px] lg:min-w-[223px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
                          form.getFieldState(field.name).error &&
                            "border-[#D00000]"
                        )}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex border-b border-b-[#D2D2D2] h-[50px] lg:h-[70px]">
            <div className="bg-[#F4F5FA] min-w-[102px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                성별
              </span>
            </div>
            <div className="w-full flex items-center gap-x-3">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center pl-2 lg:pl-[22px]">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue="M"
                        className="flex items-center gap-4 lg:gap-[54px]"
                      >
                        <FormItem className="flex items-center space-x-1.5 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="M" />
                          </FormControl>
                          <FormLabel className="text-xs lg:text-base pt-0.5 lg:pt-0 font-normal text-[#828282] leading-[19.2px] custom-letter-spacing">
                            남자
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1.5 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="F" />
                          </FormControl>
                          <FormLabel className="text-xs lg:text-base pt-0.5 lg:pt-0 font-medium text-[#828282] leading-[19.2px] custom-letter-spacing">
                            여자
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex border-b border-b-[#D2D2D2] h-auto lg:h-[70px]">
            <div className="bg-[#F4F5FA] min-w-[102px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                휴대전화
              </span>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-x-8 pl-2 lg:pl-0 gap-y-2 lg:gap-y-0 pt-2 lg:pt-0 pb-2 lg:pb-0">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center pl-0 lg:pl-[22px] gap-1 lg:gap-3">
                    <FormControl>
                      <Input
                        placeholder="번호 입력"
                        className={cn(
                          "w-[135px] lg:min-w-[249px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
                          form.getFieldState(field.name).error &&
                            "border-[#D00000]"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={async () => {
                        const result = await sendAuthCode(field.value);
                        if (result.code === "000" && result.msg === "success") {
                          window.alert("인증번호가 발송되었습니다.");
                        } else {
                          window.alert("인증번호 발송에 실패하였습니다.");
                        }
                      }}
                      className={cn(
                        "h-[38px] lg:h-10 rounded-[6px] lg:rounded-full w-auto lg:min-w-[116px] text-xs lg:text-sm font-medium custom-letter-spacing text-white leading-[16.8px] !m-0 text-nowrap px-1 lg:px-0",
                        form.getFieldState(field.name).invalid ||
                          form.getValues(field.name) === ""
                          ? "bg-[#828282]"
                          : "bg-black"
                      )}
                    >
                      인증번호 발송
                    </button>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNumber"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center pr-0 lg:pr-[22px] gap-1 lg:gap-3">
                    <FormControl>
                      <Input
                        placeholder="인증번호 6자리 입력"
                        className={cn(
                          "w-[135px] lg:min-w-[202px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
                          form.getFieldState(field.name).error &&
                            "border-[#D00000]"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={async () => {
                        const res = await authCodeConfirm(
                          field.value,
                          form.getValues("phone")
                        );

                        if (res.code === "000" && res.msg === "success") {
                          form.setValue("phoneConfirm", true);
                          window.alert("인증에 성공하였습니다.");
                        } else {
                          form.setValue("phoneConfirm", false);
                          window.alert("인증에 실패하였습니다.");
                        }
                      }}
                      className={cn(
                        "h-[38px] lg:h-10 rounded-[6px] lg:rounded-full w-auto lg:min-w-[116px] text-xs lg:text-sm font-medium custom-letter-spacing text-white leading-[16.8px] !m-0 text-nowrap px-3 lg:px-0",
                        form.getFieldState(field.name).invalid ||
                          form.getValues(field.name) === ""
                          ? "bg-[#828282]"
                          : "bg-black"
                      )}
                    >
                      확인
                    </button>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex border-b border-b-[#D2D2D2] h-[50px] lg:h-[70px]">
            <div className="bg-[#F4F5FA] min-w-[102px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                이메일
              </span>
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center px-2 lg:px-[22px]">
                    <FormControl>
                      <Input
                        placeholder="이메일 입력"
                        className={cn(
                          "w-[150px] lg:max-w-[292px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
                          form.getFieldState(field.name).error &&
                            "border-[#D00000]"
                        )}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex border-b border-b-[#D2D2D2] h-[50px] lg:h-[70px]">
            <div className="bg-[#F4F5FA] min-w-[102px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              <span className="hidden lg:block text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                학회공지수신방법
              </span>
              <span className="lg:hidden text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                학회공지
                <br />
                수신방법
              </span>
            </div>
            <div className="w-full flex items-center gap-x-2 lg:gap-x-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center pl-2 lg:pl-[22px]">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue="S"
                        className="flex items-center gap-6 lg:gap-[54px]"
                      >
                        {/* <FormItem className="flex items-center space-x-1.5 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="K" />
                          </FormControl>
                          <FormLabel className="font-normal text-[#828282] leading-[19.2px] custom-letter-spacing">
                            카카오톡
                          </FormLabel>
                        </FormItem> */}
                        <FormItem className="flex items-center space-x-1.5 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="S" />
                          </FormControl>
                          <FormLabel className="text-xs lg:text-base pt-0.5 lg:pt-0 font-medium text-[#828282] leading-[19.2px] custom-letter-spacing">
                            문자
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1.5 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="E" />
                          </FormControl>
                          <FormLabel className="text-xs lg:text-base pt-0.5 lg:pt-0 font-medium text-[#828282] leading-[19.2px] custom-letter-spacing">
                            이메일
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div
            className={cn(
              "flex border-b border-b-[#D2D2D2]",
              addressType === "H"
                ? "h-auto lg:h-[190px]"
                : "h-auto lg:h-[250px]"
            )}
          >
            <div className="bg-[#F4F5FA] min-w-[102px] lg:min-w-[206px] px-2 lg:px-[22px] flex flex-col items-start pt-2 lg:pt-6">
              <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing mb-3">
                우편물 수령지
              </span>
              <p className="hidden lg:block text-[11px] font-semibold leading-[13px] max-w-[150px] custom-letter-spacing">
                * 올바른 입회 승인을 위해
                <br />
                가급적 근무처로 기입 부탁드립니다.
              </p>
              <p className="lg:hidden text-[10px] font-semibold custom-letter-spacing">
                * 올바른 입회 승인을 위해 가급적 근무처로 기입 부탁드립니다.
              </p>
            </div>
            <div className="flex flex-col justify-between px-2 lg:px-[22px] py-2 lg:py-6 space-y-2 lg:space-y-0">
              <div className="w-full flex items-center gap-x-2 lg:gap-x-3">
                <FormField
                  control={form.control}
                  name="addressType"
                  render={({ field }) => {
                    return (
                      <FormItem className="h-full flex items-center">
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              form.setValue(field.name, value);
                              setAddressType(value as "H" | "J");
                              form.setValue("addressName", "");
                              form.setValue("addressTel", "");
                            }}
                            defaultValue="J"
                            className="flex items-center gap-6"
                          >
                            <FormItem className="flex items-center space-x-1.5 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="H" />
                              </FormControl>
                              <FormLabel className="text-xs lg:text-base pt-0.5 lg:pt-0 font-normal text-[#828282] leading-[19.2px] custom-letter-spacing">
                                자택
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-1.5 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="J" />
                              </FormControl>
                              <FormLabel className="text-xs lg:text-base pt-0.5 lg:pt-0 font-normal text-[#828282] leading-[19.2px] custom-letter-spacing">
                                근무처
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div
                className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-3"
                hidden={addressType === "H"}
              >
                <FormField
                  control={form.control}
                  name="addressName"
                  render={({ field }) => (
                    <FormItem hidden={addressType === "H"}>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="근무처명"
                          className="h-[38px] lg:h-12 w-[150px] lg:w-[215px] rounded-[6px] lg:rounded-[10px] border-[#D2D2D2] placeholder:text-xs lg:placeholder:text-base"
                          disabled={addressType === "H"}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressTel"
                  render={({ field }) => (
                    <FormItem hidden={addressType === "H"}>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="근무처 전화번호"
                          className="h-[38px] lg:h-12 w-[150px] lg:w-[215px] rounded-[6px] lg:rounded-[10px] border-[#D2D2D2] placeholder:text-xs lg:placeholder:text-base"
                          disabled={addressType === "H"}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-1 lg:gap-3">
                <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="우편번호"
                          className={cn(
                            "h-[38px] lg:h-12 w-[150px] lg:w-[215px] rounded-[6px] lg:rounded-[10px] border-[#D2D2D2] placeholder:text-xs lg:placeholder:text-base",
                            form.getFieldState(field.name).error &&
                              "border-[#D00000]"
                          )}
                          readOnly
                          value={zipcode}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Postcode
                  form={form}
                  setAddress={setAddress}
                  setZipcode={setZipcode}
                />
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-3">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="주소 입력"
                          className={cn(
                            "h-[38px] lg:h-12 w-[226px] lg:w-[327px] rounded-[6px] lg:rounded-[10px] border-[#D2D2D2] placeholder:text-xs lg:placeholder:text-base",
                            form.getFieldState(field.name).error &&
                              "border-[#D00000]"
                          )}
                          readOnly
                          value={address}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressDetail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="상세 주소 입력"
                          className="h-[38px] lg:h-12 w-[226px] lg:w-[327px] rounded-[6px] lg:rounded-[10px] border-[#D2D2D2] placeholder:text-xs lg:placeholder:text-base"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="my-10 lg:my-[100px]">
            <div className="mb-5">
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            form.setValue("term1", true);
                            form.setValue("term2", true);
                          } else {
                            form.setValue("term1", false);
                            form.setValue("term2", false);
                          }
                        }}
                        className="size-4 lg:size-5 rounded-none"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm lg:text-[23px] font-bold">
                        전체 약관에 모두 동의합니다.
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-2">
              <Accordion
                type="single"
                collapsible
                className="w-[335px] lg:w-full"
              >
                <AccordionItem
                  value="term1"
                  className="border border-[#D2D2D2] p-0 lg:p-2 px-3 lg:px-5 rounded-[10px]"
                >
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="term1"
                      render={({ field }) => (
                        <FormItem className="flex flex-1 flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="size-4 lg:size-[18px] rounded-none"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm lg:text-[18px] font-medium custom-letter-spacing">
                              [필수] 이용약관 동의
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <AccordionTrigger />
                  </div>
                  <AccordionContent className="space-y-5 text-lg custom-letter-spacing leading-[21px] font-normal max-h-[300px] overflow-auto scrollbar-hide">
                    <p className="font-bold pt-5">
                      한국생체모방치의학회 회원가입 이용약관
                    </p>
                    <p className="font-bold">제1조(목적)</p>
                    <p>
                      본 약관은 한국생체모방치의학회(이하 "학회")가 제공하는
                      회원가입 및 관련 서비스(이하 "서비스")의 이용과 관련하여,
                      학회와 회원 간의 권리, 의무, 책임사항 및 절차 등을
                      규정함을 목적으로 합니다.
                    </p>
                    <p className="font-bold">제2조(학회의 목적)</p>
                    <p>
                      한국생체모방치의학회는 생체모방치의학의 발전을 위해
                      노력하는 치과계 의료 전문가들과 유관 분야 연구자들이 모인
                      공동체로, 학회는 학술 교류, 연구 협력, 임상 기술 발전을
                      목표로 합니다.
                    </p>
                    <p className="font-bold">제3조(회원 자격 및 가입)</p>
                    <ul>
                      <li>
                        1. 학회 회원은 치과의사뿐만 아니라 치과와 관련된 연구를
                        수행하는 연구자 및 관련 전문가도 가입할 수 있습니다.
                      </li>
                      <li>
                        2. 회원가입은 학회의 목적과 취지에 동의한 자에 한하여
                        가능합니다.
                      </li>
                      <li>
                        3. 회원은 소정의 가입 신청서를 작성하고, 입회비와 연회비
                        또는 종신회비를 납부하여야 합니다.
                      </li>
                      <li>
                        4. 회원가입 신청 후, 학회의 이사회 심사를 거쳐 승인된
                        자만이 정회원으로 승인됩니다.
                      </li>
                      <li>
                        5. 이사회 심사 결과, 적합하지 않다고 판단된 회원의 경우
                        승인 요청이 반려될 수 있습니다.
                      </li>
                      <li>6. 정회원으로 승인된 후 회원증이 발급됩니다.</li>
                    </ul>
                    <p className="font-bold">
                      제4조(입회비 및 연회비, 종신회비)
                    </p>
                    <ul>
                      <li>
                        1. 회원가입 시 입회비는 50,000원이며, 이는 회원가입 절차
                        완료 후 이사회 심사와 함께 처리됩니다.
                      </li>
                      <li>
                        2. 정회원이 되기 위해서는 매년 50,000원의 연회비를
                        납부하여야 합니다.
                      </li>
                      <li>
                        3. 회원은 연회비 대신 800,000원의 종신회비를 납부하여
                        평생 회원 자격을 취득할 수 있습니다. 종신회비 납부 시,
                        더 이상 연회비를 납부하지 않으셔도 됩니다.
                      </li>
                      <li>
                        4. 연회비는 매년 1회 납부해야 하며, 3년간 연회비를
                        미납할 경우 자동으로 회원 자격이 상실됩니다.
                      </li>
                      <li>
                        5. 입회비 및 연회비, 종신회비 납부는 계좌이체 또는
                        카드결제가 가능합니다.
                      </li>
                      <li>
                        6. 납부 계좌는 다음과 같습니다:
                        <ul className="list-disc list-inside px-5">
                          <li>
                            신한은행 140-014-665217 (예금주:
                            (사)한국생체모방치의학회)
                          </li>
                          <li>
                            치과의사 회원은 입금 시 면허번호와 성함을 기재해
                            주시기 바랍니다 (예: 99999홍길동).
                          </li>
                        </ul>
                      </li>
                      <li>7. 영수증 출력은 회원 마이페이지에서 가능합니다.</li>
                      <li>
                        8. 기타 문의 사항은 학회 사무국으로 연락해 주시기
                        바랍니다 (전화: 070-5153-2795).
                      </li>
                    </ul>
                    <p className="font-bold">제5조(탈퇴 및 환불 규정)</p>
                    <ul>
                      <li>
                        1. 회원은 언제든지 본인의 의사에 따라 탈퇴서를
                        제출함으로써 탈퇴할 수 있으며, 탈퇴 절차는 학회가 정하는
                        방법에 따릅니다.
                      </li>
                      <li>
                        2. 회원이 자발적으로 탈퇴할 경우, 이미 납부한 입회비 및
                        연회비는 반환되지 않습니다.
                      </li>
                      <li>
                        3. 종신회비는 원칙적으로 환불되지 않으며, 회원이
                        종신회원 자격을 포기하고 탈퇴할 경우에도 동일합니다.
                      </li>
                    </ul>
                    <p className="font-bold">제6조(회원의 권리 및 의무)</p>
                    <ul>
                      <li>
                        1. 회원은 학회에서 제공하는 학술 활동 및 정보 등을
                        이용할 권리가 있습니다.
                      </li>
                      <li>
                        2. 회원은 학회의 정관 및 본 약관을 준수하여야 하며,
                        학회의 명예를 손상시키거나 운영에 지장을 초래하는 행위를
                        해서는 안 됩니다.
                      </li>
                      <li>
                        3. 회원은 본인의 계정 정보에 대한 관리 책임이 있으며,
                        계정의 부정 사용에 대한 책임은 회원 본인에게 있습니다.
                      </li>
                    </ul>
                    <p className="font-bold">제7조(서비스의 제공 및 변경)</p>
                    <ul>
                      <li>
                        1. 학회는 회원에게 학술 정보 제공, 학술 행사 초대 등의
                        서비스를 제공합니다.
                      </li>
                      <li>
                        2. 학회는 필요에 따라 제공하는 서비스의 내용을 변경할 수
                        있으며, 이 경우 사전에 공지합니다.
                      </li>
                    </ul>
                    <p className="font-bold">제8조(서비스의 중단)</p>
                    <ul>
                      <li>
                        1. 학회는 천재지변, 시스템 점검, 기술적 문제 등 불가피한
                        사유로 인해 서비스를 일시적으로 중단할 수 있으며, 이
                        경우 회원에게 사전에 공지합니다.
                      </li>
                      <li>
                        2. 학회는 서비스 중단으로 발생하는 손해에 대해 책임지지
                        않습니다.
                      </li>
                    </ul>
                    <p className="font-bold">제9조(회원 탈퇴 및 자격 상실)</p>
                    <ul>
                      <li>
                        1. 회원은 언제든지 본인의 의사에 따라 탈퇴서를
                        제출함으로써 탈퇴할 수 있습니다.
                      </li>
                      <li>
                        2. 3년간 연회비를 미납할 경우 회원 자격이 자동으로
                        상실됩니다.
                      </li>
                      <li>
                        3. 회원이 다음 각 호의 사유에 해당하는 경우, 학회는 회원
                        자격을 제한하거나 상실시킬 수 있습니다.
                        <ul className="px-5">
                          <li>a. 타인의 권리 침해나 법령 위반</li>
                          <li>
                            b. 학회의 명예를 훼손하거나 운영을 방해한 경우
                          </li>
                          <li>c. 본 약관을 위반한 경우</li>
                        </ul>
                      </li>
                    </ul>
                    <p className="font-bold">제10조(개인정보 보호)</p>
                    <ul>
                      <li>
                        1. 학회는 회원의 개인정보를 관련 법령에 따라 보호하며,
                        개인정보의 수집 및 이용에 관한 세부 사항은 학회의
                        개인정보 처리방침에 따릅니다.
                      </li>
                      <li>
                        2. 회원은 언제든지 본인의 개인정보 열람, 수정, 삭제를
                        요청할 수 있습니다.
                      </li>
                    </ul>
                    <p className="font-bold">제11조(저작권 및 사용권)</p>
                    <ul>
                      <li>
                        1. 학회가 제공하는 모든 콘텐츠에 대한 저작권은 학회에
                        있으며, 회원은 이를 무단으로 복제, 배포, 상업적 이용할
                        수 없습니다.
                      </li>
                      <li>
                        2. 회원은 학회의 승인 없이 학회의 명칭이나 로고를 사용할
                        수 없습니다.
                      </li>
                    </ul>
                    <p className="font-bold">제12조(손해배상)</p>
                    <ul>
                      <li>
                        회원이 본 약관을 위반하여 학회에 손해를 끼친 경우,
                        회원은 그 손해를 배상할 책임이 있습니다.
                      </li>
                    </ul>
                    <p className="font-bold">제13조(분쟁 해결)</p>
                    <ul>
                      <li>
                        1. 본 약관과 관련하여 발생한 분쟁에 대해서는 학회와 회원
                        간의 상호 협의에 의해 해결하는 것을 원칙으로 합니다.
                      </li>
                      <li>
                        2. 협의가 이루어지지 않을 경우, 관련 법령에 따른 관할
                        법원에 의해 해결합니다.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <Accordion
                type="single"
                collapsible
                className="w-[335px] lg:w-full"
              >
                <AccordionItem
                  value="term2"
                  className="border border-[#D2D2D2] p-0 lg:p-2 px-3 lg:px-5 rounded-[10px]"
                >
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="term2"
                      render={({ field }) => (
                        <FormItem className="flex flex-1 flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="size-4 lg:size-[18px] rounded-none"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm lg:text-[18px] font-medium custom-letter-spacing">
                              [필수] 개인정보 수집 및 이용 동의
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <AccordionTrigger />
                  </div>
                  <AccordionContent className="space-y-5 text-lg custom-letter-spacing leading-[21px] font-normal max-h-[300px] overflow-auto scrollbar-hide">
                    <p className="font-bold pt-5">
                      개인정보 수집 및 이용 동의서
                    </p>
                    <p>
                      한국생체모방치의학회(이하 "학회")는 회원 가입 및 서비스
                      제공을 위해 아래와 같이 개인정보를 수집·이용하고자 합니다.
                      내용을 충분히 읽으신 후 동의 여부를 결정해 주시기
                      바랍니다.
                    </p>
                    <div>
                      <p className="font-bold">1. 개인정보 수집</p>
                      <p>
                        항목학회는 회원가입, 서비스 제공, 상담 등을 위해 아래의
                        개인정보를 수집합니다.
                      </p>
                    </div>
                    <ul className="list-disc list-inside px-5">
                      <li>
                        필수 수집 항목: 이름, 생년월일, 성별, 연락처(전화번호,
                        이메일), 주소, 면허번호(치과의사의 경우), 결제
                        정보(입회비 및 연회비/종신회비 납부 시)
                      </li>
                      <li>선택 수집 항목: 직장명, 직위, 전문 분야</li>
                    </ul>
                    <div>
                      <p className="font-bold">2. 개인정보 수집 및 이용 목적</p>
                      <p>수집된 개인정보는 다음의 목적을 위해 이용됩니다.</p>
                    </div>
                    <ul className="list-decimal list-inside px-5">
                      <li>
                        회원 관리: 회원 가입 의사 확인, 본인 식별 및 인증, 회원
                        자격 유지 관리, 회원증 발급
                      </li>
                      <li>
                        서비스 제공: 학회 활동 및 학술 행사 정보 제공, 뉴스레터
                        발송, 각종 공지사항 전달
                      </li>
                      <li>
                        결제 처리: 입회비, 연회비 및 종신회비 납부 내역 관리 및
                        영수증 발급
                      </li>
                      <li>
                        기타: 학회와 관련된 상담 및 민원 처리, 서비스 품질 개선
                      </li>
                    </ul>
                    <div>
                      <p className="font-bold">3. 개인정보 보유 및 이용 기간</p>
                      <p>
                        학회는 개인정보 수집 및 이용 목적이 달성된 후에는 해당
                        정보를 지체 없이 파기합니다. 단, 관련 법령에 의거하여
                        일정 기간 동안 보관해야 하는 경우, 해당 법령에서 정한
                        기간 동안 개인정보를 보관합니다.
                      </p>
                    </div>
                    <ul className="list-disc list-inside px-5">
                      <li>회원 정보: 회원 자격 유지 기간 동안 보유</li>
                      <li>
                        결제 정보: 5년간 보관 (전자상거래 등에서의 소비자 보호에
                        관한 법률에 따라)
                      </li>
                    </ul>
                    <div>
                      <p className="font-bold">4. 개인정보 제공 및 공유</p>
                      <p>
                        학회는 원칙적으로 회원의 개인정보를 외부에 제공하지
                        않습니다. 다만, 아래의 경우에 한해 개인정보를 제공할 수
                        있습니다.
                      </p>
                    </div>
                    <ul className="list-decimal list-inside px-5">
                      <li>회원이 사전에 동의한 경우</li>
                      <li>법령에 의거해 필요한 경우</li>
                      <li>
                        서비스 제공을 위해 불가피하게 제3자에게 위탁하는
                        경우(예: 결제 대행 서비스)
                      </li>
                    </ul>
                    <div>
                      <p className="font-bold">5. 개인정보 처리 위탁</p>
                      <p>
                        학회는 서비스 향상을 위해 아래와 같이 개인정보 처리
                        업무를 외부 전문 업체에 위탁하고 있으며, 위탁받은 업체는
                        해당 업무 수행을 위해 필요한 최소한의 정보만 처리하게
                        됩니다.
                      </p>
                    </div>
                    <ul className="list-disc list-inside px-5">
                      <li>위탁 업체: 미플즈</li>
                      <li>위탁 업무의 내용: 홈페이지 운영</li>
                    </ul>
                    <div>
                      <p className="font-bold">
                        6. 동의를 거부할 권리 및 거부 시 불이익
                      </p>
                      <p>
                        회원은 개인정보 수집 및 이용에 대한 동의를 거부할 권리가
                        있습니다. 다만, 필수 수집 항목에 대한 동의를 거부할
                        경우, 학회 서비스 제공이 불가능할 수 있습니다.
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">7. 개인정보 보호책임자</p>
                      <p>
                        학회는 개인정보를 보호하고 개인정보와 관련한 불만 처리
                        및 피해 구제를 위하여 아래와 같이 개인정보 보호책임자를
                        지정하고 있습니다.
                      </p>
                    </div>
                    <ul className="list-disc list-inside px-5">
                      <li>성명: 유다연</li>
                      <li>연락처: 070-5153-2795</li>
                      <li>이메일: 2021kabd@gmail.com</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="flex items-center justify-center mb-[50px] lg:mb-[150px]">
            <Button
              type="submit"
              className="w-[280px] lg:w-[345px] h-[50px] lg:h-[55px] rounded-[6px] lg:rounded-[10px] text-base lg:text-[18px] font-semibold custom-letter-spacing"
            >
              회원가입
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GeneralForm;

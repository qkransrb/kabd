"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
import { cn } from "@/lib/utils";
import { authCodeConfirm, sendAuthCode } from "@/actions/auth-actions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Postcode from "@/components/postcode";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  updateDentistProfile,
  updateGeneralProfile,
  withdraw,
} from "@/actions/my-page-actions";
import { Badge } from "../ui/badge";

const majors = [
  {
    id: "구강악안면외과",
    label: "구강악안면외과",
  },
  {
    id: "구강내과",
    label: "구강내과",
  },
  {
    id: "구강병리과",
    label: "구강병리과",
  },
  {
    id: "교정과",
    label: "교정과",
  },
  {
    id: "방사선과",
    label: "방사선과",
  },
  {
    id: "보존과",
    label: "보존과",
  },
  {
    id: "보철과",
    label: "보철과",
  },
  {
    id: "소아치과",
    label: "소아치과",
  },
  {
    id: "예방치과",
    label: "예방치과",
  },
  {
    id: "치주과",
    label: "치주과",
  },
  {
    id: "통합치의학과",
    label: "통합치의학과",
  },
  {
    id: "기타",
    label: "기타",
  },
];

const formSchema = z
  .object({
    userId: z.string().min(1),
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
    license: z.string(),
    university: z.string(),
    major: z.array(z.string()),
    type: z.string(),
    addressType: z.string(),
    addressName: z.string(),
    addressTel: z.string(),
    zipcode: z.string().min(1),
    address: z.string(),
    addressDetail: z.string(),
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

export type EditProfile = z.infer<typeof formSchema>;

interface Props {
  userProfile: UserProfile;
}

const EditProfile = ({ userProfile }: Props) => {
  const [addressType, setAddressType] = useState<"H" | "J">(
    userProfile.mem_info.m_address_select as "H" | "J"
  );
  const [address, setAddress] = useState<string>(
    userProfile.mem_info.m_addr1 || ""
  );
  const [zipcode, setZipcode] = useState<string>(
    userProfile.mem_info.m_zipcode || ""
  );
  const [majorList, setMajorList] = useState<string[]>(
    userProfile.mem_info.m_type === "G"
      ? userProfile.mem_info.m_major.split("|")
      : []
  );

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userProfile.mem_info.m_id,
      password: "",
      confirmPassword: "",
      koreanName: userProfile.mem_info.m_name,
      englishName: userProfile.mem_info.m_en_name,
      birth: userProfile.mem_info.m_jumin,
      gender: userProfile.mem_info.m_sex,
      phone: userProfile.mem_info.m_mobile,
      confirmNumber: "",
      phoneConfirm: false,
      email: userProfile.mem_info.m_email,
      license:
        userProfile.mem_info.m_type === "G"
          ? userProfile.mem_info.m_license_number
          : "",
      university:
        userProfile.mem_info.m_type === "G"
          ? userProfile.mem_info.m_school
          : "",
      major:
        userProfile.mem_info.m_type === "G"
          ? userProfile.mem_info.m_major.split("|")
          : [],
      type: userProfile.mem_info.m_notices_method,
      addressType: userProfile.mem_info.m_address_select,
      addressName: userProfile.mem_info.m_position,
      addressTel: userProfile.mem_info.m_position_phone,
      zipcode: userProfile.mem_info.m_zipcode,
      address: userProfile.mem_info.m_addr1,
      addressDetail: userProfile.mem_info.m_addr2,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (userProfile.mem_info.m_type === "G") {
      const result = await updateDentistProfile(values);
      if (result.code === "200") {
        window.alert("회원정보 수정에 성공하였습니다.");
        router.refresh();
      } else {
        window.alert("회원정보 수정에 실패하였습니다.");
      }
    } else {
      const result = await updateGeneralProfile(values);
      if (result.code === "200") {
        window.alert("회원정보 수정에 성공하였습니다.");
        router.refresh();
      } else {
        window.alert("회원정보 수정에 실패하였습니다.");
      }
    }

    router.refresh();
  };

  return (
    <div>
      <div className="lg:mb-[18px]">
        <p className="text-[21px] lg:text-[26px] font-bold lg:leading-[31.2px]">
          회원정보
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border-t-[2px] lg:border-t-[3px] border-black"
        >
          <div className="flex border-b border-b-[#D2D2D2] h-[50px] lg:h-[70px]">
            <div className="bg-[#F4F5FA] min-w-[100px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                아이디
              </span>
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center gap-3 px-2 lg:px-[22px]">
                    <FormControl>
                      <Input
                        placeholder="아이디 입력"
                        className="w-[150px] lg:max-w-[292px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing cursor-not-allowed"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    {/* <button
                      type="button"
                      onClick={async () => {
                        if (
                          await checkForDuplicates(form.getValues("userId"))
                        ) {
                          form.setValue("userIdConfirm", true);
                          setConfirmUserId(true);
                        } else {
                          form.setValue("userIdConfirm", false);
                          setConfirmUserId(false);
                        }
                      }}
                      className={cn(
                        "h-10 rounded-full w-[93px] text-sm font-medium custom-letter-spacing text-white leading-[16.8px] !m-0",
                        form.getFieldState(field.name).invalid ||
                          form.getValues(field.name) === ""
                          ? "bg-[#828282]"
                          : "bg-black"
                      )}
                    >
                      중복 확인
                    </button> */}
                    {/* {!confirmUserId && (
                      <p className="text-sm font-medium custom-letter-spacing text-[#D00000]">
                        사용하실 수 없는 아이디입니다.
                      </p>
                    )} */}
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex border-b border-b-[#D2D2D2] h-[50px] lg:h-[70px]">
            <div className="bg-[#F4F5FA] min-w-[100px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
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
                          "max-w-[150px] lg:max-w-[292px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
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
            <div className="bg-[#F4F5FA] min-w-[100px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
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
                          "max-w-[150px] lg:max-w-[292px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing text-xs lg:text-base",
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
            <div className="bg-[#F4F5FA] min-w-[100px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                이름
              </span>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-y-1.5 lg:gay-y-0 lg:gap-x-3 py-1.5 lg:py-0">
              <FormField
                control={form.control}
                name="koreanName"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center pl-2 lg:pl-[22px]">
                    <FormControl>
                      <Input
                        placeholder="국문 이름"
                        className={cn(
                          "min-w-[150px] lg:min-w-[223px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
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
                  <FormItem className="h-full flex items-center pl-2 lg:pl-0 lg:pr-[22px]">
                    <FormControl>
                      <Input
                        placeholder="영문 이름"
                        className={cn(
                          "min-w-[150px] lg:min-w-[223px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
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
            <div className="bg-[#F4F5FA] min-w-[100px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
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
                          "min-w-[150px] lg:min-w-[223px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
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
            <div className="bg-[#F4F5FA] min-w-[100px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
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
                        defaultValue={userProfile.mem_info.m_sex}
                        className="flex items-center gap-4 lg:gap-[54px]"
                      >
                        <FormItem className="flex items-center space-x-1.5 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="M" />
                          </FormControl>
                          <FormLabel className="font-normal text-xs lg:text-base text-[#828282] leading-[19.2px] custom-letter-spacing">
                            남자
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1.5 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="F" />
                          </FormControl>
                          <FormLabel className="font-medium text-xs lg:text-base text-[#828282] leading-[19.2px] custom-letter-spacing">
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
            <div className="bg-[#F4F5FA] min-w-[100px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                휴대전화
              </span>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center lg:gap-x-4 gap-y-1.5 lg:gap-y-0 py-1.5 lg:py-0">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center pl-2 lg:pl-[22px] gap-1.5 lg:gap-3">
                    <FormControl>
                      <Input
                        placeholder="번호 입력"
                        className={cn(
                          "w-[135px] lg:min-w-[223px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
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
                        "h-[38px] lg:h-10 rounded-[6px] lg:rounded-full min-w-[86px] lg:min-w-[116px] text-xs lg:text-sm font-medium custom-letter-spacing text-white leading-[16.8px] !m-0",
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
                  <FormItem className="h-full flex items-center pl-2 lg:pl-0 lg:pr-[22px] gap-1.5 lg:gap-3">
                    <FormControl>
                      <Input
                        placeholder="인증번호 6자리 입력"
                        className={cn(
                          "w-[135px] lg:min-w-[202px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
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
                        "h-[38px] lg:h-10 rounded-[6px] lg:rounded-full w-[50px] lg:min-w-[116px] text-xs lg:text-sm font-medium custom-letter-spacing text-white leading-[16.8px] !m-0",
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
            <div className="bg-[#F4F5FA] min-w-[100px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
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
                          "w-[150px] lg:max-w-[292px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
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

          {userProfile.mem_info.m_type === "G" ? (
            <>
              <div className="flex border-b border-b-[#D2D2D2] h-[50px] lg:h-[70px]">
                <div className="bg-[#F4F5FA] min-w-[100px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
                  <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                    면허번호
                  </span>
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="license"
                    render={({ field }) => (
                      <FormItem className="h-full flex items-center px-2 lg:px-[22px]">
                        <FormControl>
                          <Input
                            placeholder="면허번호 입력"
                            className={cn(
                              "w-[150px] lg:max-w-[292px] h-[38px] lg:h-12 rounded-[6px] lg:rounded-[10px] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base placeholder:font-medium placeholder:text-[#828282] custom-letter-spacing",
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
                <div className="bg-[#F4F5FA] min-w-[100px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
                  <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                    출신학교 (학사)
                  </span>
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                      <FormItem className="h-full flex items-center px-2 lg:px-[22px]">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                "h-[38px] lg:h-12 w-[150px] lg:max-w-[208px] text-xs lg:text-base text-[#828282] font-medium custom-letter-spacing rounded-[6px] lg:rounded-[10px]",
                                form.getFieldState(field.name).error &&
                                  "border-[#D00000]"
                              )}
                            >
                              <SelectValue
                                placeholder="출신학교 선택"
                                className="placeholder:text-[#828282]"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="text-xs lg:text-base font-medium custom-letter-spacing">
                            <SelectItem value="강릉대학교">
                              강릉대학교
                            </SelectItem>
                            <SelectItem value="경북대학교">
                              경북대학교
                            </SelectItem>
                            <SelectItem value="경희대학교">
                              경희대학교
                            </SelectItem>
                            <SelectItem value="단국대학교">
                              단국대학교
                            </SelectItem>
                            <SelectItem value="부산대학교">
                              부산대학교
                            </SelectItem>
                            <SelectItem value="서울대학교">
                              서울대학교
                            </SelectItem>
                            <SelectItem value="연세대학교">
                              연세대학교
                            </SelectItem>
                            <SelectItem value="원광대학교">
                              원광대학교
                            </SelectItem>
                            <SelectItem value="전남대학교">
                              전남대학교
                            </SelectItem>
                            <SelectItem value="전북대학교">
                              전북대학교
                            </SelectItem>
                            <SelectItem value="조선대학교">
                              조선대학교
                            </SelectItem>
                            <SelectItem value="기타">기타</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex border-b border-b-[#D2D2D2] h-[50px] lg:h-[70px]">
                <div className="bg-[#F4F5FA] min-w-[100px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
                  <span className="text-sm lg:text-lg font-semibold lg:leading-[21.48px] custom-letter-spacing">
                    전공과목
                  </span>
                </div>
                <div className="w-full flex items-center px-2 lg:px-[22px] lg:gap-x-4">
                  <FormField
                    control={form.control}
                    name="major"
                    render={() => (
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={cn(
                            "w-[150px] lg:w-[208px] h-[38px] lg:h-12 border border-[#D2D2D2] rounded-[6px] lg:rounded-[10px] flex items-center justify-between px-3",
                            form.getFieldState("major").error &&
                              "border-[#D00000]"
                          )}
                        >
                          <span className="text-xs lg:text-base text-[#828282] font-medium custom-letter-spacing">
                            복수 선택 가능
                          </span>
                          <ChevronDown size={16} color="#828282" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {majors.map((major) => (
                            <DropdownMenuItem
                              key={major.id}
                              className="w-[150px] lg:w-[208px]"
                            >
                              <FormField
                                key={major.id}
                                control={form.control}
                                name="major"
                                render={({ field }) => (
                                  <FormItem
                                    key={major.id}
                                    className="w-full flex items-center gap-x-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          major.id
                                        )}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            field.onChange([
                                              ...field.value,
                                              major.id,
                                            ]);

                                            setMajorList((prev) => [
                                              ...prev,
                                              major.id,
                                            ]);
                                          } else {
                                            field.onChange(
                                              field.value?.filter(
                                                (value) => value !== major.id
                                              )
                                            );

                                            setMajorList((prev) =>
                                              prev.filter(
                                                (item) => item !== major.id
                                              )
                                            );
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-xs lg:text-sm font-medium lg:leading-[19.09px] custom-letter-spacing !mt-0">
                                      {major.label}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />
                  {Array.isArray(majorList) && (
                    <div className="hidden lg:grid grid-cols-4 gap-x-2 gap-y-1">
                      {majorList.map((major) => {
                        if (major.length > 1) {
                          return (
                            <Badge
                              key={major}
                              className="flex items-center justify-center font-medium text-sm"
                            >
                              {major}
                            </Badge>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}

          <div className="flex border-b border-b-[#D2D2D2] h-[50px] lg:h-[70px]">
            <div className="bg-[#F4F5FA] min-w-[100px] lg:min-w-[206px] px-2 lg:px-[22px] flex items-center">
              {/* DESKTOP */}
              <span className="text-lg font-semibold leading-[21.48px] custom-letter-spacing hidden lg:block">
                학회공지수신방법
              </span>
              {/* MOBILE */}
              <span className="text-sm font-semibold custom-letter-spacing lg:hidden">
                학회공지
                <br />
                수신방법
              </span>
            </div>
            <div className="w-full flex items-center gap-x-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="h-full flex items-center pl-2 lg:pl-[22px]">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={userProfile.mem_info.m_notices_method}
                        className="flex items-center gap-4 lg:gap-6"
                      >
                        {/* <FormItem className="flex items-center space-x-1.5 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="K" />
                          </FormControl>
                          <FormLabel className="text-xs lg:text-base font-normal text-[#828282] leading-[19.2px] custom-letter-spacing">
                            카카오톡
                          </FormLabel>
                        </FormItem> */}
                        <FormItem className="flex items-center space-x-1.5 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="S" />
                          </FormControl>
                          <FormLabel className="text-xs lg:text-base font-medium text-[#828282] leading-[19.2px] custom-letter-spacing">
                            문자
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1.5 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="E" />
                          </FormControl>
                          <FormLabel className="text-xs lg:text-base font-medium text-[#828282] leading-[19.2px] custom-letter-spacing">
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
            {/* DESKTOP */}
            <div className="bg-[#F4F5FA] min-w-[206px] px-[22px] flex-col items-start pt-6 hidden lg:flex">
              <span className="text-lg font-semibold leading-[21.48px] custom-letter-spacing mb-3">
                우편물 수령지
              </span>
              <p className="text-[11px] font-semibold leading-[13px] max-w-[150px] custom-letter-spacing">
                * 올바른 입회 승인을 위해
                <br />
                가급적 근무처로 기입 부탁드립니다.
              </p>
            </div>
            {/* MOBILE */}
            <div className="bg-[#F4F5FA] min-w-[100px] px-2 flex flex-col items-start pt-3 lg:hidden">
              <span className="text-sm font-semibold custom-letter-spacing mb-1.5">
                우편물 수령지
              </span>
              <p className="text-[10px] font-semibold leading-snug custom-letter-spacing whitespace-nowrap">
                * 올바른 입회 승인을
                <br />
                위해 가급적 근무처로
                <br />
                기입 부탁드립니다.
              </p>
            </div>
            <div className="flex flex-col justify-between px-2 lg:px-[22px] py-3 lg:py-6 gap-y-1.5 lg:gap-y-0">
              <div className="w-full flex items-center gap-x-3">
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
                            defaultValue={userProfile.mem_info.m_address_select}
                            className="flex items-center gap-4 lg:gap-6"
                          >
                            <FormItem className="flex items-center space-x-1.5 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="H" />
                              </FormControl>
                              <FormLabel className="text-xs lg:text-base font-normal text-[#828282] leading-[19.2px] custom-letter-spacing">
                                자택
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-1.5 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="J" />
                              </FormControl>
                              <FormLabel className="text-xs lg:text-base font-medium text-[#828282] leading-[19.2px] custom-letter-spacing">
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
                className="flex flex-col lg:flex-row items-start lg:items-center gap-1.5 lg:gap-3"
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
                          className="h-[38px] lg:h-12 w-[135px] lg:w-[215px] rounded-[6px] lg:rounded-[10px] border-[#D2D2D2] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base"
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
                          className="h-[38px] lg:h-12 w-[135px] lg:w-[215px] rounded-[6px] lg:rounded-[10px] border-[#D2D2D2] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base"
                          disabled={addressType === "H"}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-1.5 lg:gap-3">
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
                            "h-[38px] lg:h-12 w-[135px] lg:w-[215px] rounded-[6px] lg:rounded-[10px] border-[#D2D2D2] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base",
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
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-1.5 lg:gap-3">
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
                            "h-[38px] lg:h-12 w-[226px] lg:w-[215px] rounded-[6px] lg:rounded-[10px] border-[#D2D2D2] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base",
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
                          className="h-[38px] lg:h-12 w-[226px] lg:w-[215px] rounded-[6px] lg:rounded-[10px] border-[#D2D2D2] text-xs lg:text-base placeholder:text-xs lg:placeholder:text-base"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="my-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="link"
                  className="flex items-center gap-x-0.5 px-0 lg:px-4"
                >
                  <span className="text-base text-[#626262] font-medium">
                    회원탈퇴
                  </span>
                  <ChevronRight color="#626262" className="mb-1" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[20px] lg:text-base lg:text-[20px] font-bold custom-letter-spacing text-center mb-4">
                    회원탈퇴
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center space-y-2">
                    <span className="block text-[15px] lg:text-base text-black font-normal leading-[19.2px] custom-letter-spacing">
                      탈퇴 선택시, 계정은 삭제되며 복구되지 않습니다.
                    </span>
                    <span className="block text-[15px] lg:text-base text-black font-normal leading-[19.2px] custom-letter-spacing">
                      탈퇴하시겠습니까?
                    </span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="pt-4 flex flex-row gap-2">
                  <AlertDialogAction
                    className="w-full"
                    onClick={async () => {
                      await withdraw();
                      window.alert("탈퇴가 완료되었습니다.");
                    }}
                  >
                    탈퇴
                  </AlertDialogAction>
                  <AlertDialogCancel className="w-full !m-0">
                    취소
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-[280px] lg:w-[345px] h-[50px] lg:h-[55px] rounded-[10px] text-base lg:text-[18px] font-semibold custom-letter-spacing"
            >
              회원정보 수정
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;

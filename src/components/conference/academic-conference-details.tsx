import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  conference: {
    ac_file1: string;
    ac_date: string;
    ac_title: string;
    ac_seq: string;
    amount: string;
    code: string;
    msg: string;
  };
}

const AcademicConferenceDetails = ({ conference }: Props) => {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-[26px] font-bold leading-[31.2px] custom-letter-spacing">
          {conference.ac_title}
        </h3>
        <span className="text-sm font-medium leading-[16.71px] text-[#626262] custom-letter-spacing">
          {conference.ac_date}
        </span>
      </div>
      <Separator className="h-[3px] bg-black mb-[110px]" />
      <div className="flex flex-col items-center">
        <Image
          src={conference.ac_file1}
          alt={conference.ac_title}
          width={1134}
          height={650}
          className="object-cover w-[1134px] h-[650px] mb-[90px]"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              className="w-[269px] h-[56px] flex items-center justify-center rounded-[10px] mb-[100px]"
            >
              <span className="text-lg text-white font-semibold leading-[21.48px] pl-2">
                결제하기
              </span>
              <ChevronRight size={20} className="mb-0.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="center"
            className="p-9 w-[674px] rounded-[20px]"
          >
            <strong className="text-[20px] font-bold custom-letter-spacing mb-6 block">
              결제 안내
            </strong>
            <div className="custom-letter-spacing space-y-1.5 mb-4">
              <p>현재 카드결제 시스템 도입중으로, 계좌이체만 가능합니다.</p>
              <p className="font-bold underline underline-offset-2">
                신한은행 140-014-665217 ( 예금주:(사)미니쉬생체모방치의학회 )
              </p>
              <p>
                치과의사의 경우 입금 시 면허번호+성함으로 입금 부탁드립니다.
                (ex:99999홍길동)
              </p>
            </div>
          </PopoverContent>
        </Popover>
        <Separator className="bg-[#626262] mb-[100px]" />
        <Link
          href="/conference"
          className="border border-[#626262] w-[150px] h-[60px] bg-[#F5F5F5] flex items-center justify-center mb-[200px]"
        >
          <span className="text-base font-medium custom-letter-spacing leading-[19.06px] pt-1">
            목록
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AcademicConferenceDetails;

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
import ConferencePaymentButton from "./conference-payment-button";

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
          {conference.ac_date.split("-").join(".")}
        </span>
      </div>
      <Separator className="h-[3px] bg-black mb-[110px]" />
      <div className="flex flex-col items-center">
        <div className="mb-[90px]">
          <img
            src={conference.ac_file1}
            alt={conference.ac_title}
            className="object-cover"
          />
        </div>

        <ConferencePaymentButton />
        <Separator className="bg-[#626262] mb-[100px]" />
        <Link
          href="/conference"
          className="w-[108px] h-[50px] rounded-[10px] bg-[#DFDFDF] flex items-center justify-center mb-[200px]"
        >
          <span className="text-base font-semibold custom-letter-spacing leading-[19.06px] pt-1 whitespace-nowrap">
            목록
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AcademicConferenceDetails;

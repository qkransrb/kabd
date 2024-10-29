import Link from "next/link";
import parse from "html-react-parser";

import { Separator } from "@/components/ui/separator";

interface Props {
  noticeDetails: NoticeDetails;
}

const NoticeDetailsContent = ({ noticeDetails }: Props) => {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-[26px] font-bold leading-[31.2px] custom-letter-spacing">
          {noticeDetails.data.b_title}
        </h3>
        <span className="text-sm font-medium leading-[16.71px] text-[#626262] custom-letter-spacing">
          {noticeDetails.data.b_date2?.split("-").join(".")}
        </span>
      </div>
      <Separator className="h-[3px] bg-black mb-[50px]" />

      <article className="w-full text-lg custom-letter-spacing font-normal leading-[34px] mb-[100px]">
        {parse(noticeDetails.data.b_contents)}
      </article>

      <Separator className="bg-[#626262] mb-[100px]" />

      <div className="flex items-center justify-center">
        <Link
          href="/notice"
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

export default NoticeDetailsContent;

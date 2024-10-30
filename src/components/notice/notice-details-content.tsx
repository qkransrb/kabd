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

      <div className="flex items-center justify-center mb-[200px]">
        <Link
          href="/notice"
          className="w-[108px] h-[50px] rounded-[10px] bg-[#DFDFDF] flex items-center justify-center"
        >
          <span className="text-base font-semibold custom-letter-spacing leading-[19.06px] pt-1 whitespace-nowrap">
            목록
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NoticeDetailsContent;

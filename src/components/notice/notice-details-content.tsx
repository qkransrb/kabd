import Link from "next/link";
import parse from "html-react-parser";

import { Separator } from "@/components/ui/separator";
import { Download, Paperclip } from "lucide-react";

interface Props {
  noticeDetails: NoticeDetails;
}

const NoticeDetailsContent = ({ noticeDetails }: Props) => {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2 lg:mb-4">
        <h3 className="text-base lg:text-[26px] font-bold lg:leading-[31.2px] custom-letter-spacing">
          {noticeDetails.data.b_title}
        </h3>
        <span className="text-[10px] lg:text-sm font-medium lg:leading-[16.71px] text-[#626262] custom-letter-spacing">
          {noticeDetails.data.b_date2?.split("-").join(".")}
        </span>
      </div>
      <Separator className="h-[2px] lg:h-[3px] bg-black" />
      <div>
        {noticeDetails.data.b_file3 ? (
          <div>
            <div className="py-1.5 lg:py-4 border-b border-[#D8D8D8] flex items-center gap-1.5">
              <Paperclip size={20} color="#626262" className="mb-0.5" />
              <span className="text-sm lg:text-base text-[#626262] font-bold lg:leading-[19.09px] custom-letter-spacing">
                첨부파일
              </span>
            </div>
            <div className="py-1.5 lg:py-4 border-b border-[#D8D8D8] flex items-center gap-1.5 px-6">
              <Download size={20} className="mb-0.5" />
              <a
                href={noticeDetails.data.b_file3}
                download
                className="text-sm lg:text-base"
              >{`${noticeDetails.data.b_file3_real}`}</a>
            </div>
          </div>
        ) : null}

        <article className="w-full text-base lg:text-lg custom-letter-spacing font-normal leading-normal lg:leading-[34px] mb-[50px] lg:mb-[100px] mt-[30px] lg:mt-[50px]">
          {parse(noticeDetails.data.b_contents)}
        </article>
      </div>

      <Separator className="bg-[#626262] mb-[50px] lg:mb-[100px]" />

      <div className="flex items-center justify-center mb-[100px] lg:mb-[200px]">
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

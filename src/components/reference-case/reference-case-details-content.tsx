import Link from "next/link";
import parse from "html-react-parser";
import { Download, Paperclip } from "lucide-react";

import { Separator } from "@/components/ui/separator";

interface Props {
  referenceCaseDetails: ReferenceCaseDetails;
}

const ReferenceCaseDetailsContent = ({ referenceCaseDetails }: Props) => {
  return (
    <div>
      <div className="flex items-end justify-between mb-2">
        <h3 className="text-base lg:text-[26px] font-bold lg:leading-[31.2px] custom-letter-spacing">
          {referenceCaseDetails.data.b_title}
        </h3>
        <span className="text-[10px] lg:text-sm text-[#626262] lg:font-medium leading-[16.71px] custom-letter-spacing">
          {referenceCaseDetails.data.b_date}
        </span>
      </div>
      <Separator className="h-[2px] lg:h-[3px] bg-black" />
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
            href={referenceCaseDetails.data.b_file3}
            download
            className="text-sm lg:text-base"
          >{`${referenceCaseDetails.data.b_file3_real}`}</a>
        </div>
        <article className="max-w-[1134px] mx-auto pt-5 lg:pt-20">
          {parse(referenceCaseDetails.data.b_contents)}
        </article>
        <Separator className="bg-[#626262] my-[50px] lg:my-[100px]" />
        <div className="flex items-center justify-center mb-[100px] lg:mb-[200px]">
          <Link
            href="/reference-case"
            className="w-20 lg:w-[108px] h-[50px] rounded-[10px] bg-[#DFDFDF] flex items-center justify-center"
          >
            <span className="text-base font-semibold custom-letter-spacing leading-[19.06px] pt-1 whitespace-nowrap">
              목록
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReferenceCaseDetailsContent;

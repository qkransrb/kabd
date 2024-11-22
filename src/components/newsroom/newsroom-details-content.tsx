import Link from "next/link";
import parse from "html-react-parser";

import { Separator } from "@/components/ui/separator";

interface Props {
  newsroomDetails: NewsroomDetails;
}

const NewsroomDetailsContent = ({ newsroomDetails }: Props) => {
  return (
    <div>
      <section className="mb-[50px] lg:mb-[100px]">
        <div className="flex items-end justify-between mb-2 lg:mb-4">
          <h3 className="text-black text-base lg:text-[26px] font-bold lg:leading-[31.2px] custom-letter-spacing">
            {newsroomDetails.data.b_title}
          </h3>
          <span className="text-[10px] lg:text-sm text-[#626262] font-medium lg:leading-[16.7px] custom-letter-spacing">
            {newsroomDetails.data.b_date2?.split("-").join(".")}
          </span>
        </div>
        <Separator className="h-[2px] lg:h-[3px] bg-black mb-[30px] lg:mb-20" />
        {/* <div className="flex items-center justify-end mb-[100px]">
          <span className="text-[26px] text-black font-bold leading-[31.2px] custom-letter-spacing">
            {newsroomDetails.data.b_user_name}
          </span>
        </div> */}

        <div className="flex flex-col items-center justify-center">
          <article className="max-w-[1134px] mx-auto break-all article">
            {parse(newsroomDetails.data.b_contents)}
          </article>
        </div>
      </section>

      <Separator className="bg-[#626262] mb-[50px] lg:mb-[100px]" />

      <div className="flex items-center justify-center mb-[100px] lg:mb-[200px]">
        <Link
          href="/newsroom"
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

export default NewsroomDetailsContent;

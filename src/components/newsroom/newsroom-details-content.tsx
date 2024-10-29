import Link from "next/link";
import parse from "html-react-parser";

import { Separator } from "@/components/ui/separator";

interface Props {
  newsroomDetails: NewsroomDetails;
}

const NewsroomDetailsContent = ({ newsroomDetails }: Props) => {
  return (
    <div>
      <section className="mb-[100px]">
        <div className="flex items-end justify-between mb-4">
          <h3 className="text-black text-[26px] font-bold leading-[31.2px] custom-letter-spacing">
            {newsroomDetails.data.b_title}
          </h3>
          <span className="text-sm text-[#626262] font-medium leading-[16.7px] custom-letter-spacing">
            {newsroomDetails.data.b_date2?.split("-").join(".")}
          </span>
        </div>
        <Separator className="h-[3px] bg-black mb-2.5" />
        <div className="flex items-center justify-end mb-[100px]">
          <span className="text-[26px] text-black font-bold leading-[31.2px] custom-letter-spacing">
            {newsroomDetails.data.b_user_name}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <article className="max-w-[1134px] mx-auto break-all">
            {parse(newsroomDetails.data.b_contents)}
          </article>
        </div>
      </section>

      <Separator className="bg-[#626262] mb-[100px]" />

      <div className="flex items-center justify-center mb-[200px]">
        <Link
          href="/newsroom"
          className="border border-[#626262] w-[150px] h-[60px] bg-[#F5F5F5] flex items-center justify-center"
        >
          <span className="text-base font-medium custom-letter-spacing leading-[19.06px] pt-1">
            목록
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NewsroomDetailsContent;

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import pdf from "@/assets/images/pdf.png";
import { formatBytes } from "@/lib/utils";
import Link from "next/link";

interface Props {
  abstract: AbstractDetails;
}

const AbstractPdfDownload = ({ abstract }: Props) => {
  return (
    <div>
      <div className="mb-2 lg:mb-4">
        <h3 className="text-base lg:text-[26px] font-bold lg:leading-[31.2px] custom-letter-spacing">
          PDF 다운로드
        </h3>
      </div>
      <Separator className="h-[2px] lg:h-[3px] bg-black" />
      <div className="mb-[50px] lg:mb-[200px]">
        <ul>
          {abstract.list.map((item) => (
            <li
              key={item.bf_seq}
              className="h-[60px] flex items-center justify-between border-b border-[#828282] lg:px-3"
            >
              <div className="flex items-center gap-2 lg:gap-4 mr-2 lg:mr-0">
                <Image
                  src={pdf}
                  alt="PDF"
                  width={27}
                  height={27}
                  className="w-[27px] h-[27px]"
                />
                <a
                  href={item.bf_link}
                  download
                  className="flex flex-1 lg:max-w-[800px] lg:truncate text-sm lg:text-base font-medium custom-letter-spacing pt-1"
                >
                  {item.bf_real_name}
                </a>
              </div>
              <span className="text-[10px] lg:text-sm text-[#828282] font-medium custom-letter-spacing text-nowrap">
                {formatBytes(parseInt(item.bf_file_size))}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center mb-[100px] lg:mb-[200px] lg:hidden">
        <Link
          href="/abstract"
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

export default AbstractPdfDownload;

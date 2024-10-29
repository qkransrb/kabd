import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import pdf from "@/assets/images/pdf.png";
import { formatBytes } from "@/lib/utils";

interface Props {
  abstract: AbstractDetails;
}

const AbstractPdfDownload = ({ abstract }: Props) => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-[26px] font-bold leading-[31.2px] custom-letter-spacing">
          PDF 다운로드
        </h3>
      </div>
      <Separator className="h-[3px] bg-black" />
      <div className="mb-[200px]">
        <ul>
          {abstract.list.map((item) => (
            <li
              key={item.bf_seq}
              className="h-[60px] flex items-center justify-between border-b border-[#828282] px-3"
            >
              <div className="flex items-center gap-4">
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
                  className="flex max-w-[800px] truncate text-base font-medium custom-letter-spacing pt-1"
                >
                  {item.bf_real_name}
                </a>
              </div>
              <span className="text-sm text-[#828282] font-medium custom-letter-spacing">
                {formatBytes(parseInt(item.bf_file_size))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AbstractPdfDownload;

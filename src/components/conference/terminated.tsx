"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../pagination";

interface Props {
  endList: Conference[] | [];
  pageCount: number;
}

const Terminated = ({ endList, pageCount }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (event: any) => {
    const { selected } = event;
    const q = searchParams.get("q");
    q
      ? router.push(`/conference?q=${q}&page=${selected + 1}`)
      : router.push(`/conference?page=${selected + 1}`);
  };

  return (
    <div>
      <h3 className="text-[24px] font-bold leading-[28.8px] mb-10">
        종료된 학술 대회
      </h3>
      <div className="grid grid-cols-2 gap-[18px] mb-[100px]">
        {endList.map((conference) => (
          <Link
            href={`/conference/${conference.ac_seq}`}
            key={conference.ac_seq}
            className="w-[632px] h-[492px] rounded-[20px] bg-[#F4F5FA] px-[38px] py-[35px]"
          >
            <Image
              src={conference.ac_file1}
              alt={conference.ac_title}
              width={556}
              height={292}
              className="object-cover rounded-[20px] w-[556px] h-[292px] mb-8"
            />
            <strong className="text-[22px] font-bold leading-[26.4px] mb-5 inline-block">
              {conference.ac_title}
            </strong>
            <div className="space-y-0.5">
              <p className="flex items-center gap-5 leading-[21.6px]">
                <span className="text-lg font-bold">학회일시</span>
                <span className="text-lg font-medium">
                  {conference.ac_date_string}
                </span>
              </p>
              <p className="flex items-center gap-5 leading-[21.6px]">
                <span className="text-lg font-bold">학회장소</span>
                <span className="text-lg font-medium">
                  {conference.ac_location}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mb-[200px] flex items-center justify-center">
        <Pagination onPageChange={onPageChange} pageCount={pageCount} />
      </div>
    </div>
  );
};

export default Terminated;

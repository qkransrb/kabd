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
      {endList.length ? (
        <>
          {/* DESKTOP */}
          <div className="px-5 lg:px-0">
            <h3 className="text-[20px] lg:text-[24px] font-bold lg:leading-[28.8px] mb-10">
              종료된 학술 대회
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px] mb-[100px] space-y-20 lg:space-y-0">
              {endList.map((conference) => (
                <Link
                  href={`/conference/${conference.ac_seq}`}
                  key={conference.ac_seq}
                  className="w-full lg:w-[632px] h-auto lg:h-[492px] rounded-[20px] bg-white lg:bg-[#F4F5FA] p-0 lg:px-[38px] lg:py-[35px]"
                >
                  {/* DESKTOP */}
                  <Image
                    src={conference.ac_file1}
                    alt={conference.ac_title}
                    width={556}
                    height={292}
                    className="object-cover rounded-[20px] w-[556px] h-[292px] mb-8 hidden lg:block"
                  />
                  {/* MOBILE */}
                  <Image
                    src={conference.ac_file1}
                    alt={conference.ac_title}
                    width={335}
                    height={176}
                    className="object-cover rounded-[10px] w-full h-[176px] mb-4 lg:hidden"
                  />
                  <strong className="text-base lg:text-[22px] font-bold lg:leading-[26.4px] mb-4 lg:mb-5 inline-block">
                    {conference.ac_title}
                  </strong>
                  <div className="space-y-4 lg:space-y-0.5">
                    <p className="flex flex-col lg:flex-row items-start lg:items-center lg:gap-5 lg:leading-[21.6px]">
                      <span className="text-base lg:text-lg text-[#525252] font-bold">
                        학회일시
                      </span>
                      <span className="text-base lg:text-lg text-[#525252] font-medium">
                        {conference.ac_date_string}
                      </span>
                    </p>
                    <p className="flex flex-col lg:flex-row items-start lg:items-center lg:gap-5 lg:leading-[21.6px]">
                      <span className="text-base lg:text-lg text-[#525252] font-bold">
                        학회장소
                      </span>
                      <span className="text-base lg:text-lg text-[#525252] font-medium">
                        {conference.ac_location}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-[100px] lg:mb-[200px] flex items-center justify-center">
            <Pagination onPageChange={onPageChange} pageCount={pageCount} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Terminated;

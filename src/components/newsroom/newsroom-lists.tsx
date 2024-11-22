"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import SearchForm from "@/components/newsroom/search-form";
import Pagination from "../pagination";

interface Props {
  newsroomList: NewsroomList;
}

const NewsroomLists = ({ newsroomList }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (event: any) => {
    const { selected } = event;
    const q = searchParams.get("q");
    q
      ? router.push(`/newsroom?q=${q}&page=${selected + 1}`)
      : router.push(`/newsroom?page=${selected + 1}`);
  };

  return (
    <div>
      <div
        className={cn(
          "grid gap-[18px] mb-[50px] lg:mb-[100px]",
          newsroomList.list.length
            ? "grid-cols-1 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {newsroomList.list.length ? (
          newsroomList.list.map((newsroom) => (
            <Link
              href={`/newsroom/${newsroom.b_seq}`}
              key={newsroom.b_seq}
              className={cn(
                "h-[230px] lg:h-[266px] rounded-[10px] lg:rounded-[20px] flex flex-col justify-between px-5 py-7 lg:p-9",
                parseInt(newsroom.rnum) % 2 === 0
                  ? "bg-[#E7E9F2]"
                  : "bg-[#F4F5FA]"
              )}
            >
              <div>
                <span className="mb-4 lg:mb-8 inline-block font-medium lg:leading-[19.2px] text-base text-[#525252]">
                  치의학일반
                </span>
                <p className="text-base lg:text-[22px] text-black font-bold lg:leading-[26.4px]">
                  {newsroom.b_title}
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-1 text-base text-[#525252] leading-[19.2px] font-normal">
                  <span>이재성</span>
                  <span>{newsroom.b_regdate}</span>
                </div>
                <div className="space-x-1 text-base text-[#525252] leading-[19.2px] font-normal">
                  <span>조회수</span>
                  <span>{newsroom.b_count}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="w-full h-[100px] flex items-center justify-center border-b border-t border-[#828282]">
            <p className="text-base text-[#828282] font-medium custom-letter-spacing">
              등록된 게시글이 없습니다.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center mb-[50px]">
        <Pagination
          onPageChange={onPageChange}
          pageCount={newsroomList.page_cnt}
        />
      </div>

      <SearchForm />
    </div>
  );
};

export default NewsroomLists;

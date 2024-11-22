"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchForm from "@/components/news/search-form";
import Pagination from "../pagination";
import { ChevronRight } from "lucide-react";

interface Props {
  newsList: NewsList;
}

const NewsTable = ({ newsList }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (event: any) => {
    const { selected } = event;
    const q = searchParams.get("q");
    q
      ? router.push(`/news?q=${q}&page=${selected + 1}`)
      : router.push(`/news?page=${selected + 1}`);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2 lg:mb-4 mt-[50px] lg:mt-0">
        <h3 className="text-[25px] lg:text-[26px] font-bold lg:leading-[31.2px] custom-letter-spacing">
          보도자료
        </h3>
        <span className="text-[10px] lg:text-sm font-medium lg:leading-[16.71px] text-[#626262] custom-letter-spacing">
          총 {newsList.total}건
        </span>
      </div>
      <div className="mb-[50px]">
        {/* DESKTOP */}
        <div className="hidden lg:block">
          <Table className="border-t-[3px] border-t-black">
            <TableHeader>
              <TableRow className="border-b border-[#828282]">
                <TableHead className="w-[10%] text-center custom-letter-spacing font-bold text-black">
                  번호
                </TableHead>
                <TableHead className="text-center custom-letter-spacing font-bold text-black">
                  제목
                </TableHead>
                <TableHead className="w-[10%] text-center custom-letter-spacing font-bold text-black">
                  등록일
                </TableHead>
                <TableHead className="w-[10%] text-center custom-letter-spacing font-bold text-black">
                  조회수
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsList.list.length
                ? newsList.list.map((news) => (
                    <TableRow key={news.b_seq}>
                      <TableCell className="text-center font-medium custom-letter-spacing">
                        {news.rnum}
                      </TableCell>
                      <TableCell className="text-center max-w-[800px]">
                        <Link href={`/news/${news.b_seq}`}>
                          <p className="truncate font-medium custom-letter-spacing text-start">
                            {news.b_title}
                          </p>
                        </Link>
                      </TableCell>
                      <TableCell className="text-center text-[#828282] font-medium custom-letter-spacing">
                        {news.b_regdate}
                      </TableCell>
                      <TableCell className="text-center text-[#828282] font-medium custom-letter-spacing">
                        {news.b_count}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
        {/* MOBILE */}
        <div className="lg:hidden">
          <ul className="border-t-[2px] border-t-black">
            {newsList.list.length
              ? newsList.list.map((news) => (
                  <li
                    key={`mo_${news.b_seq}`}
                    className="border-b border-[#D8D8D8]"
                  >
                    <Link
                      href={`/news/${news.b_seq}`}
                      className="h-20 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="max-w-[290px] truncate text-base font-normal custom-letter-spacing">
                          {news.b_title}
                        </p>
                        <span className="text-xs text-[#626262] font-medium custom-letter-spacing">
                          {news.b_regdate}
                        </span>
                      </div>
                      <ChevronRight color="#212121" size={20} />
                    </Link>
                  </li>
                ))
              : null}
          </ul>
        </div>
        {!newsList.list.length ? (
          <div className="w-full h-[100px] flex items-center justify-center border-b border-[#828282]">
            <p className="text-base text-[#828282] font-medium custom-letter-spacing">
              등록된 게시글이 없습니다.
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-center mb-[50px]">
        <Pagination onPageChange={onPageChange} pageCount={newsList.page_cnt} />
      </div>

      <SearchForm />
    </div>
  );
};

export default NewsTable;

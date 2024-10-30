"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchForm from "@/components/notice/search-form";
import Pagination from "@/components/pagination";

interface Props {
  noticeList: NoticeList;
}

const NoticeTable = ({ noticeList }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (event: any) => {
    const { selected } = event;
    const q = searchParams.get("q");
    q
      ? router.push(`/notice?q=${q}&page=${selected + 1}`)
      : router.push(`/notice?page=${selected + 1}`);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-[26px] font-bold leading-[31.2px] custom-letter-spacing">
          공지사항
        </h3>
        <span className="text-sm font-medium leading-[16.71px] text-[#626262] custom-letter-spacing">
          총 {noticeList.total}건
        </span>
      </div>
      <div className="mb-[50px]">
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
            {noticeList.list.length
              ? noticeList.list.map((notice) => (
                  <TableRow key={notice.b_seq}>
                    <TableCell className="text-center font-medium custom-letter-spacing">
                      {notice.rnum}
                    </TableCell>
                    <TableCell className="text-start max-w-[800px]">
                      <Link href={`/notice/${notice.b_seq}`}>
                        <p className="truncate font-medium custom-letter-spacing">
                          {notice.b_title}
                        </p>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center text-[#828282] font-medium custom-letter-spacing">
                      {notice.b_regdate}
                    </TableCell>
                    <TableCell className="text-center text-[#828282] font-medium custom-letter-spacing">
                      {notice.b_count}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
        {!noticeList.list.length ? (
          <div className="w-full h-[100px] flex items-center justify-center border-b border-[#828282]">
            <p className="text-base text-[#828282] font-medium custom-letter-spacing">
              등록된 게시글이 없습니다.
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-center mb-[50px]">
        <Pagination
          onPageChange={onPageChange}
          pageCount={noticeList.page_cnt}
        />
      </div>

      <SearchForm />
    </div>
  );
};

export default NoticeTable;

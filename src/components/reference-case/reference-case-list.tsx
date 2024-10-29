"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import ReferenceCaseItem from "@/components/reference-case/reference-case-item";
import SearchForm from "@/components/reference-case/search-form";
import Pagination from "../pagination";

interface Props {
  referenceCaseList: ReferenceCaseList;
}

const ReferenceCaseList = ({ referenceCaseList }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (event: any) => {
    const { selected } = event;
    const q = searchParams.get("q");
    q
      ? router.push(`/reference-case?q=${q}&page=${selected + 1}`)
      : router.push(`/reference-case?page=${selected + 1}`);
  };

  return (
    <div>
      <div className="flex items-center justify-end mb-2">
        <span className="text-[15px] font-medium leading-[17.9px] custom-letter-spacing">
          총 {referenceCaseList.total}건
        </span>
      </div>
      <Separator className="h-[3px] bg-black" />
      {referenceCaseList.list.map((referenceCase) => (
        <ReferenceCaseItem
          key={referenceCase.b_seq}
          referenceCase={referenceCase}
        />
      ))}
      <div className="flex items-center justify-center my-[50px]">
        <Pagination
          onPageChange={onPageChange}
          pageCount={referenceCaseList.page_cnt}
        />
      </div>
      <SearchForm />
    </div>
  );
};

export default ReferenceCaseList;

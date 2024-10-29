"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import SearchForm from "@/components/abstract/search-form";
import Pagination from "@/components/pagination";

interface Props {
  abstractList: AbstractList;
}

const AbstractList = ({ abstractList }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (event: any) => {
    const { selected } = event;
    const q = searchParams.get("q");
    q
      ? router.push(`/abstract?q=${q}&page=${selected + 1}`)
      : router.push(`/abstract?page=${selected + 1}`);
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-[26px] font-bold leading-[31.2px] custom-letter-spacing">
          초록집
        </h3>
      </div>
      <Separator className="h-[3px] bg-black mb-9" />

      <div className="flex items-start justify-between">
        {abstractList.list.map((abstract) => (
          <Link
            href={`/abstract/${abstract.b_seq}`}
            key={abstract.b_seq}
            className="flex flex-col items-center gap-6"
          >
            <Image
              src={abstract.b_file1}
              alt={abstract.b_title}
              width={270}
              height={342}
              className="w-[270px] h-[342px] object-cover"
            />
            <span className="text-lg font-normal leading-[21.6px]">
              {abstract.b_title}
            </span>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center my-[50px]">
        <Pagination
          onPageChange={onPageChange}
          pageCount={abstractList.page_cnt}
        />
      </div>

      <SearchForm />
    </div>
  );
};

export default AbstractList;

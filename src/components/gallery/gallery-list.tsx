"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import GalleryItem from "@/components/gallery/gallery-item";
import SearchForm from "@/components/gallery/search-form";
import Pagination from "@/components/pagination";

interface Props {
  galleryList: GalleryList;
}

const GalleryList = ({ galleryList }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (event: any) => {
    const { selected } = event;
    const q = searchParams.get("q");
    q
      ? router.push(`/gallery?q=${q}&page=${selected + 1}`)
      : router.push(`/gallery?page=${selected + 1}`);
  };

  return (
    <div>
      <div className="flex items-center justify-end mb-2">
        <span className="text-[15px] font-medium leading-[17.9px] custom-letter-spacing">
          총 {galleryList.total}건
        </span>
      </div>
      <Separator className="h-[3px] bg-black mb-5" />
      <div className="grid grid-cols-2 gap-5 mb-[50px]">
        {galleryList.list.map((gallery) => (
          <GalleryItem key={gallery.b_seq} gallery={gallery} />
        ))}
      </div>

      <div className="flex items-center justify-center mb-[50px]">
        <Pagination
          onPageChange={onPageChange}
          pageCount={galleryList.page_cnt}
        />
      </div>
      <SearchForm />
    </div>
  );
};

export default GalleryList;

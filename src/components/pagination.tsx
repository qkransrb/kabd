"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate from "react-paginate";

interface Props {
  onPageChange: (event: any) => void;
  pageCount: number;
}

const Pagination = ({ onPageChange, pageCount }: Props) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<ChevronRight size={20} className="mb-1" color="#626262" />}
      previousLabel={<ChevronLeft size={20} className="mb-1" color="#626262" />}
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      className="pagination w-full flex items-center justify-center gap-x-2.5"
    />
  );
};

export default Pagination;

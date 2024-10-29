import { ChevronRight } from "lucide-react";

interface Props {
  first: string;
  second: string;
  third?: string;
}

const PageNavigation = ({ first, second, third }: Props) => {
  return (
    <div className="w-full flex items-end justify-end h-[19px]">
      <span className="page-navigation uppercase">{first}</span>
      <ChevronRight size={16} className="h-4 w-4 self-start" />
      <span className="page-navigation">{second}</span>
      {third ? (
        <>
          <ChevronRight size={16} className="h-4 w-4 self-start" />
          <span className="page-navigation">{third}</span>
        </>
      ) : null}
    </div>
  );
};

export default PageNavigation;

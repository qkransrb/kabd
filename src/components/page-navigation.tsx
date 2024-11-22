import { ChevronRight } from "lucide-react";

interface Props {
  first: string;
  second: string;
  third?: string;
}

const PageNavigation = ({ first, second, third }: Props) => {
  return (
    <div className="w-full flex items-end justify-end h-[19px]">
      <span className="page-navigation uppercase text-[10px] lg:text-base leading-tight lg:leading-[19.2px]">
        {first}
      </span>
      <ChevronRight className="size-4 self-start hidden lg:block" />
      <ChevronRight className="size-3 self-start mt-1.5 lg:hidden" />
      <span className="page-navigation text-[10px] lg:text-base leading-tight lg:leading-[19.2px]">
        {second}
      </span>
      {third ? (
        <>
          <ChevronRight className="size-4 self-start hidden lg:block" />
          <ChevronRight className="size-3 self-start mt-1.5 lg:hidden" />
          <span className="page-navigation text-[10px] lg:text-base leading-tight lg:leading-[19.2px]">
            {third}
          </span>
        </>
      ) : null}
    </div>
  );
};

export default PageNavigation;

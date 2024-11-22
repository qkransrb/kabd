import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
}

const SubTitle = ({ text, className }: Props) => {
  return (
    <h2 className={cn("sub-title text-[25px] lg:text-[33px]", className)}>
      {text}
    </h2>
  );
};

export default SubTitle;

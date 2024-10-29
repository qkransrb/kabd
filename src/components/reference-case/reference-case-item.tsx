import Image from "next/image";
import Link from "next/link";

interface Props {
  referenceCase: ReferenceCase;
}

const ReferenceCaseItem = ({ referenceCase }: Props) => {
  return (
    <Link
      href={`/reference-case/${referenceCase.b_seq}`}
      className="py-11 border-b border-[#828282] flex items-center gap-7"
    >
      <div>
        <Image
          src={referenceCase.thumbnail}
          alt={referenceCase.b_title}
          width={200}
          height={150}
          className="w-[200px] h-[150px] object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 h-[150px]">
        <div className="space-y-5">
          <h3 className="text-lg font-bold leading-[21.48px] custom-letter-spacing">
            {referenceCase.b_title}
          </h3>
          <p className="text-base font-normal leading-[28.2px] custom-letter-spacing">
            {referenceCase.b_contents}
          </p>
        </div>
        <div>
          <span className="text-sm text-[#828282] font-medium leading-[16.8px] custom-letter-spacing">
            {referenceCase.b_regdate}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ReferenceCaseItem;

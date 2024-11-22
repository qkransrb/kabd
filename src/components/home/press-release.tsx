import Link from "next/link";
import Image from "next/image";
import { PlusIcon } from "lucide-react";

interface Props {
  pressList: HomePressList;
}

const PressRelease = ({ pressList }: Props) => {
  return (
    <div className="px-5 lg:px-0">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[26px] font-bold leading-[31.03px]">보도자료</h3>
        <Link href="/news">
          <PlusIcon className="size-6 lg:size-8" />
        </Link>
      </div>
      {/* DESKTOP */}
      <div className="flex-row items-center justify-between gap-x-5 hidden lg:flex">
        {pressList.map((press) => (
          <Link
            key={press.b_seq}
            href={`/news/${press.b_seq}`}
            className="w-1/3 h-[460px] flex flex-col gap-5"
          >
            <Image
              src={press.b_file1}
              alt={press.b_title}
              width={415}
              height={350}
              className="w-[415px] h-[350px] rounded-[20px] object-cover"
            />
            <div className="space-y-1.5 px-3">
              <span className="text-base font-medium text-[#595959]">
                {press.b_regdate?.split("-").join(".")}
              </span>
              <p className="text-[23px] font-semibold leading-[27.6px] max-w-[354px]">
                {press.b_title}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {/* MOBILE */}
      <div className="lg:hidden flex flex-col items-center justify-between gap-y-16">
        {pressList.map((press) => (
          <Link
            key={press.b_seq}
            href={`/news/${press.b_seq}`}
            className="w-full flex flex-col gap-3"
          >
            <img
              src={press.b_file1}
              alt={press.b_title}
              className="w-full h-[282px] rounded-[10px] object-cover"
            />
            <div className="space-y-0">
              <span className="text-[13px] font-medium text-[#595959]">
                {press.b_regdate?.split("-").join(".")}
              </span>
              <p className="text-[20px] font-semibold max-w-[320px] truncate">
                {press.b_title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PressRelease;

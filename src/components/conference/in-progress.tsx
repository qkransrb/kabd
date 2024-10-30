import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface Props {
  ingList: Conference[] | [];
}

const InProgress = ({ ingList }: Props) => {
  const conference = ingList[0];

  return (
    <div>
      {conference ? (
        <>
          <h3 className="text-[24px] font-bold leading-[28.8px] mb-10">
            진행중인 학술 대회
          </h3>
          <div className="flex items-center justify-between">
            <Image
              src={conference.ac_file1}
              alt={conference.ac_title}
              width={743}
              height={390}
              className="rounded-[20px] object-cover w-[743px] h-[390px]"
            />
            <div className="w-[520px] h-[390px] bg-[#F4F5FA] rounded-[20px] px-[45px] py-[85px] flex flex-col justify-between">
              <div>
                <h4 className="text-[22px] font-bold leading-[26.4px] mb-8">
                  {conference.ac_title}
                </h4>
                <div className="space-y-3">
                  <p className="flex items-center gap-5">
                    <span className="text-lg font-bold">학회일시</span>
                    <span className="text-lg font-medium">
                      {conference.ac_date_string}
                    </span>
                  </p>
                  <p className="flex items-center gap-5">
                    <span className="text-lg font-bold">학회장소</span>
                    <span className="text-lg font-medium">
                      {conference.ac_location}
                    </span>
                  </p>
                </div>
              </div>
              <Link
                href={`/conference/${conference.ac_seq}`}
                className="w-[269px] h-[56px] rounded-[10px] flex items-center justify-center bg-[#2C2C2C]"
              >
                <span className="text-white text-lg custom-letter-spacing leading-[21.48px] font-semibold">
                  등록하기
                </span>
                <ChevronRight size={20} color="white" className="mb-0.5" />
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default InProgress;

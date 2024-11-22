import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Props {
  noticeList: HomeNoticeList;
  conferenceList: HomeConferenceList;
}

const Announcement = ({ noticeList, conferenceList }: Props) => {
  return (
    <div className="lg:h-[343px] flex flex-col lg:flex-row gap-[100px] lg:gap-10">
      <Card className="h-full lg:max-w-[395px] w-full px-5 lg:p-[30px] pr-5 rounded-none lg:rounded-[20px] shadow-none lg:shadow-sm bg-none border-transparent lg:border-[#D2D2D2]">
        <CardTitle className="flex items-center justify-between mb-5 lg:mb-8">
          <span className="text-[25px] lg:text-[26px] font-bold">
            학회주요일정
          </span>
          <Link href="/schedule">
            <PlusIcon className="size-6 lg:size-8" />
          </Link>
        </CardTitle>
        {/* DESKTOP */}
        <CardDescription className="space-y-4 hidden lg:block">
          {conferenceList.map((conference) => (
            <span
              key={conference.ac_seq}
              className="inline-block text-[17px] font-normal truncate max-w-[330px] leading-[20.4px]"
            >
              {conference.ac_title}
            </span>
          ))}
        </CardDescription>
        <CardDescription className="space-y-2 lg:hidden">
          {conferenceList.map((conference) => (
            <span
              key={`mo_${conference.ac_seq}`}
              className="border border-[#D2D2D2] rounded-[10px] h-[50px] flex items-center px-[15px] lg:hidden"
            >
              <span className="text-base text-black font-normal truncate max-w-[297px]">
                {conference.ac_title}
              </span>
            </span>
          ))}
        </CardDescription>
      </Card>
      <div className="flex-1 h-full flex flex-col gap-y-3 lg:gap-y-5 px-5 lg:px-0">
        <div className="flex justify-between items-center">
          <h3 className="text-[25px] lg:text-[26px] font-bold lg:leading-[31.03px]">
            공지사항
          </h3>
          <Link href="/notice">
            <PlusIcon className="size-6 lg:size-8" />
          </Link>
        </div>
        <Separator className="h-[3px] bg-[#111111]" />
        <ul className="h-full flex flex-col justify-between">
          {noticeList.map((notice) => (
            <li key={notice.b_seq} className="pb-3 lg:pb-5">
              <Link
                href={`/notice/${notice.b_seq}`}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-lg lg:text-[26px] font-bold lg:leading-[31.3px] mb-2.5 max-w-[330px] lg:max-w-[520px] truncate">
                    {notice.b_title}
                  </p>
                  <p className="text-sm lg:text-[15px] font-normal lg:leading-[18px] max-w-[330px] lg:max-w-[520px] truncate">
                    {notice.b_contents}
                  </p>
                </div>
                <span className="text-base text-[#595959] font-medium leading-[19.09px] hidden lg:block">
                  {notice.b_regdate?.split("-").join(".")}
                </span>
              </Link>

              <Separator className="mt-4 bg-[#D2D2D2]" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Announcement;

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
    <div className="h-[343px] flex gap-10">
      <Card className="h-full max-w-[395px] w-full p-[30px] pr-5 rounded-[20px]">
        <CardTitle className="flex items-center justify-between mb-8">
          <span className="text-[26px] font-bold">학회주요일정</span>
          <Link href="/schedule">
            <PlusIcon size={32} />
          </Link>
        </CardTitle>
        <CardDescription className="space-y-4">
          {conferenceList.map((conference) => (
            <span
              key={conference.ac_seq}
              // href={`/conference/${conference.ac_seq}`}
              className="inline-block text-[17px] font-normal truncate max-w-[330px] leading-[20.4px]"
            >
              {conference.ac_title}
            </span>
          ))}
        </CardDescription>
      </Card>
      <div className="flex-1 h-full flex flex-col gap-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-[26px] font-bold leading-[31.03px]">공지사항</h3>
          <Link href="/notice">
            <PlusIcon size={32} />
          </Link>
        </div>
        <Separator className="h-[3px] bg-[#111111]" />
        <ul className="h-full flex flex-col justify-between">
          {noticeList.map((notice) => (
            <li key={notice.b_seq} className="pb-5">
              <Link
                href={`/notice/${notice.b_seq}`}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-[26px] font-bold leading-[31.3px] mb-2.5 max-w-[520px] truncate">
                    {notice.b_title}
                  </p>
                  <p className="text-[15px] font-normal leading-[18px] max-w-[520px] truncate">
                    {notice.b_contents}
                  </p>
                </div>
                <span className="text-base text-[#595959] font-medium leading-[19.09px]">
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

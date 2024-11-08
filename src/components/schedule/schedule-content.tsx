"use client";

import { useState } from "react";
import { subMonths } from "date-fns";

import useCalendar, { DAY_LIST } from "@/hooks/use-calendar";
import { cn } from "@/lib/utils";
import {
  getScheduleListForMonth,
  getScheduleListForYaerMonthDay,
} from "@/actions/schedule-actions";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  scheduleListForMonth: ScheduleListForMonth;
}

const ScheduleContent = ({ scheduleListForMonth }: Props) => {
  const [scheduleList, setScheduleList] = useState<Schedule[]>(
    scheduleListForMonth.list
  );

  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);

  const { weekCalendarList, currentDate, setCurrentDate } = useCalendar();

  return (
    <>
      <div className="flex items-center justify-center mb-20 gap-5">
        <button
          onClick={async () => {
            setCurrentDate(subMonths(currentDate, 1));
            const data = await getScheduleListForMonth(
              `${subMonths(currentDate, 1).getFullYear()}-${
                subMonths(currentDate, 1).getMonth() + 1
              }`
            );

            setScheduleList(data.list);
            setSelectedDay(undefined);
          }}
        >
          <ChevronLeft size={42} className="mb-2" />
        </button>
        <h3 className="text-center text-5xl">
          {`${currentDate.getFullYear()}.${
            String(currentDate.getMonth() + 1).length > 1
              ? currentDate.getMonth() + 1
              : `0${currentDate.getMonth() + 1}`
          }`}
        </h3>
        <button
          onClick={async () => {
            setCurrentDate(subMonths(currentDate, -1));
            const data = await getScheduleListForMonth(
              `${subMonths(currentDate, -1).getFullYear()}-${
                subMonths(currentDate, -1).getMonth() + 1
              }`
            );

            setScheduleList(data.list);
            setSelectedDay(undefined);
          }}
        >
          <ChevronRight size={42} className="mb-2" />
        </button>
      </div>
      <div className="flex justify-between">
        <div className="w-[684px] h-fit pb-10 border-b border-b-[#828282]">
          <div className="flex bg-[#F4F5FA] border-t-[3px] border-black border-b border-b-[#828282]">
            {DAY_LIST.map((day) => (
              <div
                key={`DAY-${day}`}
                className="w-24 h-14 flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>
          {weekCalendarList.map((item) => (
            <div key={`WCL-${Math.random()}`} className="flex w-full">
              {item.map((day, index) => {
                return (
                  <button
                    key={`WL-${Math.random()}`}
                    onClick={async () => {
                      setSelectedDay(day);

                      const data = await getScheduleListForYaerMonthDay(
                        `${currentDate.getFullYear()}-${
                          String(currentDate.getMonth() + 1).length > 1
                            ? currentDate.getMonth() + 1
                            : `0${currentDate.getMonth() + 1}`
                        }-${String(day).length > 1 ? day : `0${day}`}`
                      );

                      setScheduleList(data.list);
                    }}
                  >
                    <div
                      className={cn(
                        "w-24 h-20 flex items-center justify-center",
                        day === 0 ? "opacity-0" : "opacity-100",
                        index === 0 ? "text-[#D00000]" : "",
                        index === 6 ? "text-[#5194FB]" : ""
                      )}
                    >
                      <span
                        className={cn(
                          "text-lg font-medium w-9 h-9 rounded-full flex items-center justify-center",
                          selectedDay === day ? "bg-[#EAEDFF] font-bold" : ""
                        )}
                      >
                        {day}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="w-[575px] border-t-[3px] border-black max-h-[650px] overflow-auto scrollbar-hide">
          <div className="pt-5 space-y-5">
            {scheduleList.map((schedule) => (
              <div
                key={`SL-${schedule.c_seq}`}
                className="bg-[#F4F5FA] px-10 py-9 rounded-[20px] overflow-hidden flex flex-col justify-between max-h-[192px]"
              >
                <div className="mb-5">
                  {selectedDay ? (
                    <span className="text-[22px] font-bold block mb-1.5 leading-[26.25px]">{`${
                      currentDate.getMonth() + 1
                    }월 ${selectedDay}일`}</span>
                  ) : null}
                  <p className="truncate text-[20px] font-bold block leading-[23.87px]">
                    {schedule.c_title}
                  </p>
                </div>
                <div className="text-lg text-[#525252] leading-[21.6px] space-y-1">
                  <div className="space-x-5">
                    <span className="font-bold">학회일시</span>
                    <span className="font-medium">
                      {schedule.c_date_string}
                    </span>
                  </div>
                  <div className="space-x-5">
                    <span className="font-bold">학회장소</span>
                    <span className="font-medium">{schedule.c_location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleContent;

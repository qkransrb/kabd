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
      <div className="flex items-center justify-center mb-2 lg:mb-20 gap-2 lg:gap-5">
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
          <ChevronLeft className="mb-2 size-6 mt-1.5 lg:mt-0 lg:size-[42px]" />
        </button>
        <h3 className="text-center text-lg lg:text-5xl font-bold lg:font-medium">
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
          <ChevronRight className="mb-2 size-6 mt-1.5 lg:mt-0 lg:size-[42px]" />
        </button>
      </div>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="min-w-[335px] lg:w-[684px] h-fit pb-5 lg:pb-10 border-b-[3px] lg:border-b-[1px] border-b-black lg:border-b-[#828282]">
          <div className="flex bg-[#F4F5FA] border-t-[3px] border-black border-b border-b-[#828282]">
            {DAY_LIST.map((day) => (
              <div
                key={`DAY-${day}`}
                className="w-[14.2%] lg:w-24 h-[38px] lg:h-14 flex items-center justify-center"
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
                    className="w-[14.2%] lg:w-24 flex items-center justify-center"
                  >
                    <div
                      className={cn(
                        "w-[14.2%] lg:w-24 h-[38px] lg:h-20 flex items-center justify-center",
                        day === 0 ? "opacity-0" : "opacity-100",
                        index === 0 ? "text-[#D00000]" : "",
                        index === 6 ? "text-[#5194FB]" : ""
                      )}
                    >
                      <span
                        className={cn(
                          "text-sm lg:text-lg font-medium w-auto h-auto p-0.5 lg:p-0 lg:w-9 lg:h-9 rounded-full flex items-center justify-center",
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
        <div className="min-w-[335px] lg:w-[575px] lg:border-t-[3px] border-black lg:max-h-[650px] overflow-auto scrollbar-hide mb-[100px] lg:mb-0">
          <div className="pt-5 space-y-5">
            {scheduleList.map((schedule) => (
              <div
                key={`SL-${schedule.c_seq}`}
                className="bg-[#F4F5FA] px-5 lg:px-10 py-7 lg:py-9 rounded-[10px] lg:rounded-[20px] overflow-hidden flex flex-col justify-between lg:max-h-[192px]"
              >
                <div className="mb-3 lg:mb-5">
                  {selectedDay ? (
                    <span className="text-base lg:text-[22px] font-bold mb-0 lg:mb-1.5 lg:leading-[26.25px] hidden lg:block">{`${
                      currentDate.getMonth() + 1
                    }월 ${selectedDay}일`}</span>
                  ) : null}
                  <p className="truncate text-base lg:text-[20px] font-bold block lg:leading-[23.87px]">
                    {schedule.c_title}
                  </p>
                </div>
                <div className="text-base lg:text-lg text-[#525252] leading-[21.6px] space-y-3 lg:space-y-1">
                  <div className="flex flex-col lg:flex-row lg:space-x-5">
                    <span className="font-bold">학회일시</span>
                    <span className="text-[15px] lg:text-base font-medium">
                      {schedule.c_date_string}
                    </span>
                  </div>
                  <div className="flex flex-col lg:flex-row lg:space-x-5">
                    <span className="font-bold">학회장소</span>
                    <span className="text-[15px] lg:text-base font-medium">
                      {schedule.c_location}
                    </span>
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

import { getScheduleListForMonth } from "@/actions/schedule-actions";
import ScheduleContent from "@/components/schedule/schedule-content";
import { getYearAndMonth } from "@/lib/utils";

const Schedule = async () => {
  const scheduleListForMonth = await getScheduleListForMonth(getYearAndMonth());

  return (
    <div className="max-w-screen-xl mx-auto py-20 mb-[150px]">
      <ScheduleContent scheduleListForMonth={scheduleListForMonth} />
    </div>
  );
};

export default Schedule;

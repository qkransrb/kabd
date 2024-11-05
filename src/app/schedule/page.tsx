import { redirect } from "next/navigation";

import { isRegularMember } from "@/actions/auth-actions";
import { getScheduleListForMonth } from "@/actions/schedule-actions";
import ScheduleContent from "@/components/schedule/schedule-content";
import { getYearAndMonth } from "@/lib/utils";

export const dynamic = "force-dynamic";

const Schedule = async () => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const scheduleListForMonth = await getScheduleListForMonth(getYearAndMonth());

  return (
    <div className="max-w-screen-xl mx-auto py-20 mb-[150px]">
      <ScheduleContent scheduleListForMonth={scheduleListForMonth} />
    </div>
  );
};

export default Schedule;

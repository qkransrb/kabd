import { redirect } from "next/navigation";

import { isRegularMember } from "@/actions/auth-actions";
import { getScheduleListForMonth } from "@/actions/schedule-actions";
import ScheduleContent from "@/components/schedule/schedule-content";
import { getYearAndMonth } from "@/lib/utils";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

export const dynamic = "force-dynamic";

const Schedule = async () => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const scheduleListForMonth = await getScheduleListForMonth(getYearAndMonth());

  return (
    <div className="max-w-screen-xl mx-auto lg:py-20 lg:mb-[150px] mt-9 lg:mt-0 px-5 lg:px-0">
      <div className="lg:hidden">
        <PageNavigation first="Home" second="학회소식" third="주요일정" />
      </div>

      <section className="lg:hidden">
        <SubTitle text="주요일정" className="mt-[50px] mb-9" />
      </section>

      <ScheduleContent scheduleListForMonth={scheduleListForMonth} />
    </div>
  );
};

export default Schedule;

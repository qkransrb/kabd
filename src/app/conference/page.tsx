import { getConferenceList } from "@/actions/conference-actions";
import InProgress from "@/components/conference/in-progress";
import Terminated from "@/components/conference/terminated";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    q: string;
    page: number;
  };
}

const Conference = async ({ searchParams: { q, page } }: Props) => {
  const conferenceList: ConferenceList = await getConferenceList(q, page);

  return (
    <div className="mt-9 lg:mt-[38px] max-w-screen-xl mx-auto">
      <div className="px-5 lg:px-0">
        <PageNavigation first="Home" second="학술대회안내" />
      </div>

      <section className="mb-9 lg:mb-[105px] px-5 lg:px-0">
        <SubTitle text="학술대회안내" className="mt-[30px] lg:mb-[58px]" />
      </section>

      <section
        className={
          conferenceList.ingList.length ? "mb-[100px] lg:mb-[200px]" : ""
        }
      >
        <InProgress ingList={conferenceList.ingList} />
      </section>

      <section>
        <Terminated
          endList={conferenceList.endList}
          pageCount={conferenceList.page_cnt}
        />
      </section>
    </div>
  );
};

export default Conference;

import { getConferenceList } from "@/actions/conference-actions";
import InProgress from "@/components/conference/in-progress";
import Terminated from "@/components/conference/terminated";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

interface Props {
  q: string | undefined;
  page: number | undefined;
}

const Conference = async ({ q, page }: Props) => {
  const conferenceList: ConferenceList = await getConferenceList(q, page);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="학술대회안내" />

      <section className="mb-[105px]">
        <SubTitle text="학술대회안내" className="mt-[30px] mb-[58px]" />
      </section>

      <section className={conferenceList.ingList.length ? "mb-[200px]" : ""}>
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

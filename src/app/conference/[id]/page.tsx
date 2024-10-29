import { getConferenceDetails } from "@/actions/conference-actions";
import AcademicConferenceDetails from "@/components/conference/academic-conference-details";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

interface Props {
  params: { id: string };
}

const ConferenceDetails = async ({ params: { id } }: Props) => {
  const conference = await getConferenceDetails(id);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="학술대회안내" />

      <section className="mb-[105px]">
        <SubTitle text="학술대회안내" className="mt-[30px] mb-[58px]" />
      </section>

      <AcademicConferenceDetails conference={conference} />
    </div>
  );
};

export default ConferenceDetails;

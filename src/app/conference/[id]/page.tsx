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
    <div className="mt-9 lg:mt-[38px] max-w-screen-xl mx-auto px-5 lg:px-0">
      <PageNavigation first="Home" second="학술대회안내" />

      <section className="mb-0 lg:mb-[105px]">
        <SubTitle
          text="학술대회안내"
          className="mt-[50px] lg:mt-[30px] mb-9 lg:mb-[58px]"
        />
      </section>

      <AcademicConferenceDetails id={id} conference={conference} />
    </div>
  );
};

export default ConferenceDetails;

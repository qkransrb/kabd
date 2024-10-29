import { getReferenceCaseDetails } from "@/actions/reference-case-actions";
import PageNavigation from "@/components/page-navigation";
import ReferenceCaseDetailsContent from "@/components/reference-case/reference-case-details-content";
import SubTitle from "@/components/sub-title";

interface Props {
  params: { id: string };
}

const ReferenceCaseDetails = async ({ params: { id } }: Props) => {
  const referenceCaseDetails = await getReferenceCaseDetails(id);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="자료실" third="Case공유" />

      <section className="mb-[105px]">
        <SubTitle text="Case 공유" className="mt-[30px]" />
      </section>

      <ReferenceCaseDetailsContent
        referenceCaseDetails={referenceCaseDetails}
      />
    </div>
  );
};

export default ReferenceCaseDetails;

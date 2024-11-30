import { isRegularMember } from "@/actions/auth-actions";
import { getReferenceCaseDetails } from "@/actions/reference-case-actions";
import PageNavigation from "@/components/page-navigation";
import ReferenceCaseDetailsContent from "@/components/reference-case/reference-case-details-content";
import SubTitle from "@/components/sub-title";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

const ReferenceCaseDetails = async ({ params: { id } }: Props) => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const referenceCaseDetails = await getReferenceCaseDetails(id);

  return (
    <div className="mt-9 lg:mt-[38px] max-w-screen-xl mx-auto px-5 lg:px-0">
      <PageNavigation first="Home" second="자료실" third="Case공유" />

      <section className="lg:mb-[105px]">
        <SubTitle
          text="Case 공유"
          className="mt-[50px] lg:mt-[30px] mb-[30px] lg:mb-0"
        />
      </section>

      <ReferenceCaseDetailsContent
        referenceCaseDetails={referenceCaseDetails}
      />
    </div>
  );
};

export default ReferenceCaseDetails;

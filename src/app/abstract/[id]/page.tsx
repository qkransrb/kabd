import { getAbstractDetails } from "@/actions/abstract-actions";
import { isRegularMember } from "@/actions/auth-actions";
import AbstractPdfDownload from "@/components/abstract/abstract-pdf-download";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

const AbstractDetails = async ({ params: { id } }: Props) => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const abstract = await getAbstractDetails(id);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="자료실" third="학술대회 초록집" />

      <section className="mb-[105px]">
        <SubTitle text="학술대회초록집" className="mt-[30px]" />
      </section>

      <AbstractPdfDownload abstract={abstract} />
    </div>
  );
};

export default AbstractDetails;

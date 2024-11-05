import { isRegularMember } from "@/actions/auth-actions";
import { getReferenceCaseList } from "@/actions/reference-case-actions";

import PageNavigation from "@/components/page-navigation";
import ReferenceCaseList from "@/components/reference-case/reference-case-list";
import SubTitle from "@/components/sub-title";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    q: string;
    page: number;
  };
}

const ReferenceCase = async ({ searchParams: { q, page } }: Props) => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const referenceCaseList = await getReferenceCaseList(q, page);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="자료실" third="Case공유" />

      <section className="mb-[60px]">
        <SubTitle text="Case 공유" className="mt-[30px]" />
      </section>

      <ReferenceCaseList referenceCaseList={referenceCaseList} />
    </div>
  );
};

export default ReferenceCase;

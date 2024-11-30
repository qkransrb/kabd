import { getAbstractList } from "@/actions/abstract-actions";
import { isRegularMember } from "@/actions/auth-actions";
import AbstractList from "@/components/abstract/abstract-list";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { q: string; page: number };
}

const Abstract = async ({ searchParams: { q, page } }: Props) => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const abstractList = await getAbstractList(q, page);

  return (
    <div className="mt-9 lg:mt-[38px] max-w-screen-xl mx-auto px-5 lg:px-0">
      <PageNavigation first="Home" second="자료실" third="학술대회 초록집" />

      <section className="lg:mb-[105px]">
        <SubTitle
          text="학술대회초록집"
          className="mt-[50px] lg:mt-[30px] mb-[30px] lg:mb-0"
        />
      </section>

      <AbstractList abstractList={abstractList} />
    </div>
  );
};

export default Abstract;

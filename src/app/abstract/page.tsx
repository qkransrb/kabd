import { getAbstractList } from "@/actions/abstract-actions";
import AbstractList from "@/components/abstract/abstract-list";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

interface Props {
  searchParams: { q: string | undefined; page: number | undefined };
}

const Abstract = async ({ searchParams: { q, page } }: Props) => {
  const abstractList = await getAbstractList(q, page);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="자료실" third="학술대회 초록집" />

      <section className="mb-[105px]">
        <SubTitle text="학술대회초록집" className="mt-[30px]" />
      </section>

      <AbstractList abstractList={abstractList} />
    </div>
  );
};

export default Abstract;

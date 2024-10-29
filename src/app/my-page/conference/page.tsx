import MyPageConference from "@/components/my-page/my-page-conference";
import MyPageSidebar from "@/components/my-page/my-page-sidebar";

import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

const MyConference = () => {
  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="마이페이지" />

      <section className="mb-[105px]">
        <SubTitle text="마이페이지" className="mt-[30px]" />
      </section>

      <section className="flex mb-[200px]">
        <div className="w-3/12 pr-6">
          <MyPageSidebar />
        </div>

        <div className="w-9/12 pl-6 border-l border-[#D9D9D9]">
          <MyPageConference />
        </div>
      </section>
    </div>
  );
};

export default MyConference;

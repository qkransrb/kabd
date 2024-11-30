import MyPageSidebar from "@/components/my-page/my-page-sidebar";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";
import EditProfile from "@/components/my-page/edit-profile";
import { getUserProfile } from "@/actions/my-page-actions";

export const dynamic = "force-dynamic";

const MyPage = async () => {
  const userProfile = await getUserProfile();

  return (
    <div className="mt-9 lg:mt-[38px] max-w-screen-xl mx-auto px-5 lg:px-0">
      <PageNavigation first="Home" second="마이페이지" />

      <section className="lg:mb-[105px]">
        <SubTitle
          text="마이페이지"
          className="mt-[50px] lg:mt-[30px] mb-[30px] lg:mb-0"
        />
      </section>

      <section className="flex flex-col lg:flex-row mb-[100px] lg:mb-[200px]">
        <div className="lg:w-3/12 lg:pr-6">
          <MyPageSidebar />
        </div>

        <div className="lg:w-9/12 lg:pl-6 lg:border-l border-[#D9D9D9]">
          <EditProfile userProfile={userProfile} />
        </div>
      </section>
    </div>
  );
};

export default MyPage;

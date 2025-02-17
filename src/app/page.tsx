import { isAuthenticated } from "@/actions/auth-actions";
import { getHomeResources } from "@/actions/home-actions";
import Announcement from "@/components/home/announcement";
import LoginForm from "@/components/home/login-form";
import MainCarousel from "@/components/home/main-carousel";
import MobileMainCarousel from "@/components/home/mobile-main-carousel";
import PressRelease from "@/components/home/press-release";
import UserProfile from "@/components/home/user-profile";

export const dynamic = "force-dynamic";

export default async function Home() {
  const authenticated = await isAuthenticated();
  const homeResources: HomeResources = await getHomeResources();

  return (
    <div className="relative">
      <div className="lg:mt-[38px] max-w-screen-xl mx-auto mb-[90px] lg:mb-[190px]">
        {/* DESKTOP */}
        <section className="hidden lg:flex justify-between">
          <MainCarousel />
          {authenticated ? <UserProfile /> : <LoginForm />}
        </section>
        {/* MOBILE */}
        <section className="lg:hidden">
          <MobileMainCarousel />
        </section>
      </div>

      <div className="max-w-screen-xl mx-auto mb-[100px]">
        <section>
          <Announcement
            noticeList={homeResources.notice}
            conferenceList={homeResources.conference}
          />
        </section>
      </div>

      <div className="max-w-screen-xl mx-auto mb-[200px]">
        <section>
          <PressRelease pressList={homeResources.press} />
        </section>
      </div>

      <div className="w-full h-[344px] absolute top-[180px] bg-[#F4F5FA] -z-10 hidden lg:block" />

      {/* <MainPopup /> */}
    </div>
  );
}

import { isAuthenticated } from "@/actions/auth-actions";
import { getHomeResources } from "@/actions/home-actions";
import Announcement from "@/components/home/announcement";
import LoginForm from "@/components/home/login-form";
import MainCarousel from "@/components/home/main-carousel";
import PressRelease from "@/components/home/press-release";
import UserProfile from "@/components/home/user-profile";

export default async function Home() {
  const authenticated = await isAuthenticated();
  const homeResources: HomeResources = await getHomeResources();

  return (
    <div className="relative">
      <div className="mt-[38px] max-w-screen-xl mx-auto mb-[190px]">
        <section className="flex justify-between">
          <MainCarousel />
          {authenticated ? <UserProfile /> : <LoginForm />}
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

      <div className="w-full h-[344px] absolute top-[180px] bg-[#F4F5FA] -z-10" />
    </div>
  );
}

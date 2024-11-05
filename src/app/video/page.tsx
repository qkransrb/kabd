import { isRegularMember } from "@/actions/auth-actions";
import { getVideoList } from "@/actions/video-actions";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";
import VideoList from "@/components/video/video-list";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Video = async () => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const videoList = await getVideoList();

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="자료실" third="학술대회 강의영상" />

      <section className="mb-[105px]">
        <SubTitle text="학술대회 강의영상" className="mt-[30px]" />
      </section>

      <VideoList videoList={videoList} />
    </div>
  );
};

export default Video;

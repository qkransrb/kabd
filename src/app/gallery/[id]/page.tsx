import { isRegularMember } from "@/actions/auth-actions";
import { getGalleryDetails } from "@/actions/gallery-actions";
import GalleryDetailsContent from "@/components/gallery/gallery-details-content";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

const GalleryDetails = async ({ params: { id } }: Props) => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const galleryDetails = await getGalleryDetails(id);

  return (
    <div className="mt-9 lg:mt-[38px] max-w-screen-xl mx-auto px-5 lg:px-0">
      <PageNavigation first="Home" second="학회소식" third="사진첩" />

      <section className="lg:mb-[60px]">
        <SubTitle
          text="사진첩"
          className="mt-[50px] lg:mt-[30px] mb-[30px] lg:mb-0"
        />
      </section>

      <GalleryDetailsContent galleryDetails={galleryDetails} />
    </div>
  );
};

export default GalleryDetails;

import { getGalleryDetails } from "@/actions/gallery-actions";
import GalleryDetailsContent from "@/components/gallery/gallery-details-content";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

interface Props {
  params: { id: string };
}

const GalleryDetails = async ({ params: { id } }: Props) => {
  const galleryDetails = await getGalleryDetails(id);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="학회소식" third="사진첩" />

      <section className="mb-[60px]">
        <SubTitle text="사진첩" className="mt-[30px]" />
      </section>

      <GalleryDetailsContent galleryDetails={galleryDetails} />
    </div>
  );
};

export default GalleryDetails;

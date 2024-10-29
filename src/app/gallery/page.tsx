import { getGalleryList } from "@/actions/gallery-actions";
import GalleryList from "@/components/gallery/gallery-list";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";

interface Props {
  q: string;
  page: number;
}

const Gallery = async ({ q, page }: Props) => {
  const galleryList = await getGalleryList(q, page);

  return (
    <div className="mt-[38px] max-w-screen-xl mx-auto">
      <PageNavigation first="Home" second="학회소식" third="사진첩" />

      <section className="mb-[60px]">
        <SubTitle text="사진첩" className="mt-[30px]" />
      </section>

      <GalleryList galleryList={galleryList} />
    </div>
  );
};

export default Gallery;

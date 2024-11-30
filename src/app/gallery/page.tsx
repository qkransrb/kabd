import { isRegularMember } from "@/actions/auth-actions";
import { getGalleryList } from "@/actions/gallery-actions";
import GalleryList from "@/components/gallery/gallery-list";
import PageNavigation from "@/components/page-navigation";
import SubTitle from "@/components/sub-title";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    q: string;
    page: number;
  };
}

const Gallery = async ({ searchParams: { q, page } }: Props) => {
  const regularMember = await isRegularMember();
  if (!regularMember) return redirect("/");

  const galleryList = await getGalleryList(q, page);

  return (
    <div className="mt-9 lg:mt-[38px] max-w-screen-xl mx-auto">
      <div className="px-5 lg:px-0">
        <PageNavigation first="Home" second="학회소식" third="사진첩" />
      </div>

      <section className="lg:mb-[60px] px-5 lg:px-0">
        <SubTitle
          text="사진첩"
          className="mt-[50px] lg:mt-[30px] mb-[30px] lg:mb-0"
        />
      </section>

      <GalleryList galleryList={galleryList} />
    </div>
  );
};

export default Gallery;

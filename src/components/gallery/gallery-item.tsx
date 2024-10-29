import Image from "next/image";
import Link from "next/link";

interface Props {
  gallery: Gallery;
}

const GalleryItem = ({ gallery }: Props) => {
  return (
    <Link
      href={`/gallery/${gallery.b_seq}`}
      className="bg-[#F4F5FA] h-[492px] rounded-[20px] py-[35px] px-[38px]"
    >
      <div className="mb-8">
        <Image
          src={`${gallery.thumbnail}`}
          alt={`${gallery.b_title}`}
          width={556}
          height={292}
          className="w-[556px] h-[292px] object-cover"
        />
      </div>
      <div>
        <p className="text-[22px] font-bold leading-[26.4px] mb-5">
          {gallery.b_title}
        </p>
        <div className="space-y-2">
          <p className="text-lg leading-[21.6px] space-x-5">
            <span className="font-bold">학회일시</span>
            <span className="font-medium">{gallery.b_date_string}</span>
          </p>
          <p className="text-lg leading-[21.6px] space-x-5">
            <span className="font-bold">학회장소</span>
            <span className="font-medium">{gallery.b_location}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default GalleryItem;

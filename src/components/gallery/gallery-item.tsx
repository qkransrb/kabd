import Image from "next/image";
import Link from "next/link";

interface Props {
  gallery: Gallery;
}

const GalleryItem = ({ gallery }: Props) => {
  return (
    <Link
      href={`/gallery/${gallery.b_seq}`}
      className="bg-[#F4F5FA] h-auto lg:h-[492px] lg:rounded-[20px] px-5 py-7 lg:py-[35px] lg:px-[38px]"
    >
      <div className="mb-8">
        <Image
          src={`${gallery.thumbnail}`}
          alt={`${gallery.b_title}`}
          width={556}
          height={292}
          className="w-[556px] h-[292px] object-cover hidden lg:block"
        />
        <Image
          src={`${gallery.thumbnail}`}
          alt={`${gallery.b_title}`}
          width={335}
          height={176}
          className="w-full h-[176px] object-cover lg:hidden rounded-[10px]"
        />
      </div>
      <div>
        <p className="text-base lg:text-[22px] font-bold lg:leading-[26.4px] mb-4 lg:mb-5">
          {gallery.b_title}
        </p>
        <div className="space-y-4 lg:space-y-2">
          <p className="text-[#525252] text-base lg:text-lg lg:leading-[21.6px] lg:space-x-5 flex flex-col lg:flex-row">
            <span className="font-bold">학회일시</span>
            <span className="text-[15px] lg:text-base font-medium">
              {gallery.b_date_string}
            </span>
          </p>
          <p className="text-[#525252] text-base lg:text-lg lg:leading-[21.6px] lg:space-x-5 flex flex-col lg:flex-row">
            <span className="font-bold">학회장소</span>
            <span className="text-[15px] lg:text-base font-medium">
              {gallery.b_location}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default GalleryItem;

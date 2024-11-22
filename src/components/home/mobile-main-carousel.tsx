import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import conferenceInfo from "@/assets/images/mobile-main-carousel-conference-info.png";

const list = [
  {
    id: 1,
    image: conferenceInfo,
  },
];

const MobileMainCarousel = () => {
  return (
    <Carousel className="!w-full !h-[320px]">
      <CarouselContent>
        {list.map((item) => (
          <CarouselItem key={item.id}>
            <Link href="/conference" className="block overflow-hidden">
              <Card>
                <CardContent className="p-0">
                  <Image
                    src={item.image}
                    alt="Main Carousel"
                    className="h-[320px] w-full object-cover"
                  />
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default MobileMainCarousel;

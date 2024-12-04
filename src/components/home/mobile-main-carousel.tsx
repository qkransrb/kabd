import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import thx from "@/assets/images/thx_mo.jpeg";

const MobileMainCarousel = () => {
  return (
    <Carousel className="!w-full !h-[320px]">
      <CarouselContent>
        <CarouselItem>
          <Link href="/news" className="block overflow-hidden">
            <Card>
              <CardContent className="p-0">
                <Image
                  src={thx}
                  alt="Main Carousel"
                  className="h-[320px] w-full object-cover"
                />
              </CardContent>
            </Card>
          </Link>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default MobileMainCarousel;

import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import thx from "@/assets/images/thx_pc.jpeg";

const MainCarousel = () => {
  return (
    <Carousel className="w-[849px] !h-[441px] flex-shrink-0">
      <CarouselContent>
        <CarouselItem>
          <Link href="/news" className="block overflow-hidden rounded-[20px]">
            <Card>
              <CardContent className="p-0">
                <Image src={thx} alt="Main Carousel" width={849} height={141} />
              </CardContent>
            </Card>
          </Link>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default MainCarousel;

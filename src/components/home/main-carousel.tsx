import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import mc02 from "@/assets/images/mc02.png";
import mc01 from "@/assets/images/mc01.png";

const list = [
  {
    id: 1,
    image: mc02,
  },
  {
    id: 2,
    image: mc01,
  },
];

const MainCarousel = () => {
  return (
    <Carousel className="w-[849px] !h-[441px]">
      <CarouselContent>
        {list.map((item) => (
          <CarouselItem key={item.id}>
            <div className="overflow-hidden rounded-[20px]">
              <Card>
                <CardContent className="p-0">
                  <Image
                    src={item.image}
                    alt="Main Carousel"
                    width={849}
                    height={141}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default MainCarousel;

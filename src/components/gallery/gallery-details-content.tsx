"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  galleryDetails: GalleryDetails;
}

const GalleryDetailsContent = ({ galleryDetails }: Props) => {
  const [mainPhoto, setMainPhoto] = useState<string>(
    galleryDetails.list[0].bf_link || ""
  );

  return (
    <div>
      <div className="flex items-end justify-between mb-2 lg:mb-4">
        <p className="text-base lg:text-[26px] lg:leading-[31.2px] font-bold custom-letter-spacing">
          {galleryDetails.data.b_title}
        </p>
        <span className="text-sm font-medium leading-[16.7px] custom-letter-spacing hidden lg:block">
          {galleryDetails.data.b_date}
        </span>
        <span className="text-xs font-medium custom-letter-spacing lg:hidden">
          {galleryDetails.data.b_date.split(" ")[0].split("-").join(".")}
        </span>
      </div>
      <Separator className="h-[3px] bg-black mb-[30px] lg:mb-[110px]" />
      <div className="max-w-[1134px] mx-auto w-full mb-[100px] hidden lg:block">
        <Image
          src={mainPhoto}
          alt=""
          width={1134}
          height={650}
          className="w-[1134px] h-[650px] object-cover mb-8"
        />
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {galleryDetails.list.map((item) => (
              <CarouselItem
                key={item.bf_seq}
                className="md:basis-1/2 lg:basis-1/6"
              >
                <div className="p-1">
                  <Card>
                    <CardContent
                      onClick={() => setMainPhoto(item.bf_link)}
                      className="flex items-center justify-center h-[110px] !p-0 cursor-pointer"
                    >
                      <span className="text-3xl font-semibold">
                        <Image
                          src={item.bf_link}
                          alt=""
                          width={165.66}
                          height={110}
                          className="w-[166px] h-[110px] object-cover"
                        />
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="lg:hidden space-y-3">
        {galleryDetails.list.map((item) => (
          <div key={`mo_gallery_${item.bf_seq}`}>
            <Image
              src={item.bf_link}
              alt={item.bf_real_name}
              width={335}
              height={192}
              className="w-full h-[192px] object-cover"
            />
          </div>
        ))}
      </div>
      <Separator className="bg-[#626262] mb-[50px] lg:mb-[100px]" />
      <div className="flex items-center justify-center mb-[100px] lg:mb-[200px]">
        <Link
          href="/gallery"
          className="w-[108px] h-[50px] rounded-[10px] bg-[#DFDFDF] flex items-center justify-center"
        >
          <span className="text-base font-semibold custom-letter-spacing leading-[19.06px] pt-1 whitespace-nowrap">
            목록
          </span>
        </Link>
      </div>
    </div>
  );
};

export default GalleryDetailsContent;

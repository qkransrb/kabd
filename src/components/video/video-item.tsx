"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { getVideoId } from "@/lib/utils";
import { Loader } from "lucide-react";

interface Props {
  video: Video;
  setSelectedVideo: React.Dispatch<React.SetStateAction<Video | null>>;
}

const VideoItem = ({ video, setSelectedVideo }: Props) => {
  const [thumbnail, setThumbnail] = useState<string>("");

  useEffect(() => {
    function getVideoThumbnails(videoid: string) {
      fetch(`https://vimeo.com/api/v2/video/${videoid}.json`)
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          const { thumbnail_large } = JSON.parse(data)[0];
          setThumbnail(thumbnail_large);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getVideoThumbnails(getVideoId(video.b_file2_real));
  }, [video]);

  return (
    <div
      onClick={() => setSelectedVideo(video)}
      className="bg-[#F4F5FA] h-auto lg:h-[492px] lg:rounded-[20px] py-[25px] lg:py-[35px] px-5 lg:px-[38px] cursor-pointer hover:bg-[#E5E7F2] transition-colors"
    >
      <div className="mb-4 lg:mb-8">
        {thumbnail ? (
          <>
            <Image
              src={thumbnail}
              alt={video.b_title}
              width={556}
              height={292}
              className="w-[556px] h-[292px] rounded-[20px] object-cover hidden lg:block"
            />
            <Image
              src={thumbnail}
              alt={video.b_title}
              width={335}
              height={176}
              className="w-full h-[176px] rounded-[10px] lg:rounded-[20px] object-cover lg:hidden"
            />
          </>
        ) : (
          <div className="w-[556px] h-[292px] flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        )}
      </div>
      <div>
        <p className="text-base lg:text-[22px] font-bold lg:leading-[26.4px] mb-4 lg:mb-5">
          {video.b_title}
        </p>
        <div className="space-y-4 lg:space-y-2">
          <p className="text-[#525252] text-base lg:text-lg lg:leading-[21.6px] lg:space-x-5 flex flex-col lg:flex-row">
            <span className="font-bold">학회일시</span>
            <span className="text-[15px] font-medium">
              {video.b_date_string}
            </span>
          </p>
          <p className="text-[#525252] text-base lg:text-lg lg:leading-[21.6px] lg:space-x-5 flex flex-col lg:flex-row">
            <span className="font-bold">학회장소</span>
            <span className="text-[15px] font-medium">{video.b_location}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;

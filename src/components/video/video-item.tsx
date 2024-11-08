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
      className="bg-[#F4F5FA] h-[492px] rounded-[20px] py-[35px] px-[38px] cursor-pointer hover:bg-[#E5E7F2] transition-colors"
    >
      <div className="mb-8">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt=""
            width={556}
            height={292}
            className="w-[556px] h-[292px] rounded-[20px] object-cover"
          />
        ) : (
          <div className="w-[556px] h-[292px] flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        )}
      </div>
      <div>
        <p className="text-[22px] font-bold leading-[26.4px] mb-5">
          {video.b_title}
        </p>
        <div className="space-y-2">
          <p className="text-lg leading-[21.6px] space-x-5">
            <span className="font-bold">학회일시</span>
            <span className="font-medium">{video.b_date_string}</span>
          </p>
          <p className="text-lg leading-[21.6px] space-x-5">
            <span className="font-bold">학회장소</span>
            <span className="font-medium">{video.b_location}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;

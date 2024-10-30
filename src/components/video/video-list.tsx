"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Pagination from "@/components/pagination";
import VideoItem from "@/components/video/video-item";
import VimeoPlayer from "@/components/video/vimeo-player";
import { getVideoId } from "@/lib/utils";

interface Props {
  videoList: VideoList;
}

const VideoList = ({ videoList }: Props) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (event: any) => {
    const { selected } = event;
    const q = searchParams.get("q");
    q
      ? router.push(`/video?q=${q}&page=${selected + 1}`)
      : router.push(`/video?page=${selected + 1}`);
  };

  return (
    <div>
      <div className="mb-10">
        {selectedVideo ? (
          <>
            <h3 className="text-[24px] font-bold leading-[28.8px] mb-3">
              {selectedVideo.b_title}
            </h3>
            {selectedVideo ? (
              <div className="rounded-[20px] overflow-hidden">
                <VimeoPlayer videoId={getVideoId(selectedVideo.b_file2_real)} />
              </div>
            ) : null}
          </>
        ) : (
          <h3 className="text-[24px] font-bold leading-[28.8px]">목록</h3>
        )}
      </div>
      <div className="grid grid-cols-2 gap-[18px] mb-[100px]">
        {videoList.list.map((video) => (
          <VideoItem
            key={video.b_seq}
            video={video}
            setSelectedVideo={setSelectedVideo}
          />
        ))}
      </div>
      <div className="flex items-center justify-center mb-[200px]">
        <Pagination
          onPageChange={onPageChange}
          pageCount={videoList.page_cnt}
        />
      </div>
    </div>
  );
};

export default VideoList;

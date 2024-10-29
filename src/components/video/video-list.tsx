"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import VideoItem from "./video-item";
import Pagination from "../pagination";

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
            <h3 className="text-[24px] font-bold leading-[28.8px]">
              {selectedVideo.b_title}
            </h3>
            {selectedVideo ? (
              <div className="rounded-[20px] overflow-hidden">
                {/* <iframe
                  width="1280"
                  height="678"
                  // src={selectedVideo.b_file2_real}
                  src="https://vimeo.com/1023629912?share=copy"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                /> */}

                <video controls preload="none" aria-label="Video player">
                  <source src="https://vimeo.com/1023629912" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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

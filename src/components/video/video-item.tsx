import Image from "next/image";

interface Props {
  video: Video;
  setSelectedVideo: React.Dispatch<React.SetStateAction<Video | null>>;
}

const VideoItem = ({ video, setSelectedVideo }: Props) => {
  return (
    <div
      onClick={() => setSelectedVideo(video)}
      className="bg-[#F4F5FA] h-[492px] rounded-[20px] py-[35px] px-[38px] cursor-pointer hover:bg-[#E5E7F2] transition-colors"
    >
      <div className="mb-8">
        <Image
          src={`https://vumbnail.com/1023629912.jpg`}
          alt=""
          width={556}
          height={292}
          className="w-[556px] h-[292px] rounded-[20px] object-cover"
        />
      </div>
      <div>
        <p className="text-[22px] font-bold leading-[26.4px] mb-5">
          {video.b_title}
        </p>
        <div className="space-y-2">
          <p className="text-lg leading-[21.6px] space-x-5">
            <span className="font-bold">학회일시</span>
            <span className="font-medium">2024년 10월 26일(토) ~ 27일(일)</span>
          </p>
          <p className="text-lg leading-[21.6px] space-x-5">
            <span className="font-bold">학회장소</span>
            <span className="font-medium">
              서울특별시 강남구 언주로 728, 5층(논현동)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;

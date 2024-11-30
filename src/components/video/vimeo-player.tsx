"use client";

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

interface Props {
  videoId: string;
}

const VimeoPlayer = ({ videoId }: Props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const playerRef = useRef(null);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    let player;

    if (playerRef.current) {
      player = new Player(playerRef.current, {
        id: parseInt(videoId),
        width: width > 640 ? 1280 : 350,
      });

      player.on("play", () => {});
    }

    if (player) return () => player.destroy();
  }, [videoId]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div ref={playerRef} />
    </div>
  );
};

export default VimeoPlayer;

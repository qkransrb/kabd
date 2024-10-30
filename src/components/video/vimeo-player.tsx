"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

interface Props {
  videoId: string;
}

const VimeoPlayer = ({ videoId }: Props) => {
  const playerRef = useRef(null);

  useEffect(() => {
    let player;

    if (playerRef.current) {
      player = new Player(playerRef.current, {
        id: parseInt(videoId),
        width: 1280,
      });

      player.on("play", () => {});
    }

    if (player) return () => player.destroy();
  }, [videoId]);

  return <div ref={playerRef}></div>;
};

export default VimeoPlayer;

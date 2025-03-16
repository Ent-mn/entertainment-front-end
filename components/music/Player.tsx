// import YouTube from "react-youtube";

import YouTubeModal from "../profile/youtube-modal";

interface PlayerProps {
  videoId: string;
}

export function Player({ videoId }: PlayerProps) {
  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="overflow-hidden rounded-lg bg-black">
      <YouTubeModal videoId={videoId} opts={opts} />
    </div>
  );
}

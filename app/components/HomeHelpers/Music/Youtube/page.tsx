"use client";

import { useYoutube } from "@/app/store/useMusicStore";
import { useRef, useState } from "react";
import Draggable from "react-draggable";

export default function Youtube() {
  const nodeRef = useRef<HTMLDivElement>(null);

  const toggleYTBox = useYoutube((state) => state.toggleYTBox);

  const isYtBoxOpen = useYoutube((state) => state.isYtBoxOpen);

  const [youtubeUrl, setYoutubeUrl] = useState(
    "https://www.youtube.com/embed/n61ULEU7CO0",
  );

  const handleYoutubeUrl = (url: string) => {
    const playlistMatch = url.match(/[?&]list=([^&]+)/);

    if (playlistMatch?.[1]) {
      setYoutubeUrl(
        `https://www.youtube.com/embed/videoseries?list=${playlistMatch[1]}`,
      );
      return;
    }
    const shortVideoMatch = url.match(/youtu\.be\/([^?&]+)/);

    if (shortVideoMatch?.[1]) {
      setYoutubeUrl(`https://www.youtube.com/embed/${shortVideoMatch[1]}`);
      return;
    }

    const videoMatch = url.match(/[?&]v=([^&]+)/);

    if (videoMatch?.[1]) {
      setYoutubeUrl(`https://www.youtube.com/embed/${videoMatch[1]}`);
    }
  };
  return (
    isYtBoxOpen && (
      <Draggable nodeRef={nodeRef} bounds="body" handle=".drag-handle">
        <div ref={nodeRef} className="absolute top-0 right-0 md:right-20 z-50">
          <div className="bg-black/70 backdrop-blur-md rounded-xl p-5 min-w-[400px] h-[340px] shadow-2xl">
            {/* Header */}
            <div className="drag-handle flex justify-between items-center mb-4 cursor-move">
              <h2 className="text-white font-semibold text-lg">YouTube</h2>

              <button
                className="text-red-400 hover:text-red-300 cursor-pointer"
                onClick={() => toggleYTBox()}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleYTBox();
                }}
              >
                ✕
              </button>
            </div>

            {/* YouTube Embed */}
            <div className="overflow-hidden rounded-xl">
              <iframe
                src={youtubeUrl}
                width="100%"
                height="200"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Paste YouTube URL"
              className="mt-4 w-full bg-black/60 text-sm px-4 py-2 text-white outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleYoutubeUrl((e.target as HTMLInputElement).value);
                }
              }}
            />
          </div>
        </div>
      </Draggable>
    )
  );
}

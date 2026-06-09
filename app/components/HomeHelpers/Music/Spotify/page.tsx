"use client";

import { useSpotify } from "@/app/store/useMusicStore";
import { useRef, useState } from "react";
import Draggable from "react-draggable";

export default function SpotifyWidget() {
  const nodeRef = useRef<HTMLDivElement>(null);
  const toggleSpotifyBox = useSpotify((state) => state.toggleSpotifyBox);
  const isSpotifyBoxOpen = useSpotify((state) => state.isSpotifyBoxOpen);

  const [spotifyUrl, setSpotifyUrl] = useState(
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWZd79rJ6a7lp",
  );

  const handleSpotifyUrl = (url: string) => {
    const playlistMatch = url.match(/playlist\/([a-zA-Z0-9]+)/);
    const albumMatch = url.match(/album\/([a-zA-Z0-9]+)/);
    const trackMatch = url.match(/track\/([a-zA-Z0-9]+)/);

    if (playlistMatch?.[1]) {
      setSpotifyUrl(
        `https://open.spotify.com/embed/playlist/${playlistMatch[1]}`,
      );
    }

    if (albumMatch?.[1]) {
      setSpotifyUrl(`https://open.spotify.com/embed/album/${albumMatch[1]}`);
    }

    if (trackMatch?.[1]) {
      setSpotifyUrl(`https://open.spotify.com/embed/track/${trackMatch[1]}`);
    }
  };
  return (
    isSpotifyBoxOpen && (
      <Draggable nodeRef={nodeRef} bounds="body" handle=".drag-handle">
        <div ref={nodeRef} className="absolute top-2 right-4 z-50">
          <div className="bg-black/70 backdrop-blur-md rounded-xl p-4 min-w-[380px] shadow-2xl">
            {/* Header */}
            <div className="drag-handle flex justify-between items-center mb-4 cursor-move">
              <h2 className="text-white font-semibold text-lg">Spotify</h2>

              <button
                className="text-red-400 hover:text-red-300 cursor-pointer font-bold"
                onClick={() => toggleSpotifyBox()}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSpotifyBox();
                }}
              >
                X
              </button>
            </div>

            {/* Spotify Embed */}
            <div className="overflow-hidden rounded-xl">
              <iframe
                src={`${spotifyUrl}?theme=0`}
                width="100%"
                height="400"
                allow="autoplay; clipboard-write; encrypted-media"
                loading="lazy"
                className="bg-black/60"
              />
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Paste Spotify Playlist URL"
              className="mt-4 w-full bg-black/60 text-sm px-4 py-2 text-white outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSpotifyUrl((e.target as HTMLInputElement).value);
                }
              }}
            />
          </div>
        </div>
      </Draggable>
    )
  );
}

"use client";

import { useRef } from "react";
import Draggable from "react-draggable";
import { useBgBoxOpen, useBgUrl } from "@/app/store/useAppStore";

const videos = [
  "avtar.mp4",
  "boy.mp4",
  "boy-2.mp4",
  "boy-3.mp4",
  "bus.mp4",
  "cat.mp4",
  "computers.mp4",
  "flours.mp4",
  "fuji.mp4",
  "girl.mp4",
  "girl-1.mp4",
  "girl-2.mp4",
  "girl-3.mp4",
  "girl-4.mp4",
  "girl-study-room.mp4",
  "house.mp4",
  "lights.mp4",
  "lofi-girl.mp4",
  "mountain.mp4",
  "night-mountain.mp4",
  "stream.mp4",
  "stream-2.mp4",
  "tree-nature.mp4",
];

const spaces = videos.map((video, index) => ({
  id: index + 1,
  title: video.replace(".mp4", ""),
  video: `/backgrounds/videos/${video}`,
}));

const Page = () => {
  const isBgBoxOpen = useBgBoxOpen((state) => state.isBgBoxOpen);
  const toggleBgBoxOpen = useBgBoxOpen((state) => state.toggleBgBoxOpen);
  const setBg = useBgUrl((state) => state.setBg);

  const nodeRef = useRef<HTMLElement>(null);

  if (!isBgBoxOpen) return null;

  return (
    <Draggable nodeRef={nodeRef} bounds="body" handle=".drag-handle">
      <main
        ref={nodeRef}
        className="
          absolute top-5 left-0 md:left-20 z-30 select-none
          w-[420px] md:w-[420px]
          max-md:w-[95vw]
          max-md:left-1/2
          max-md:-translate-x-1/2
          max-md:top-20
        "
      >
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <p className="text-md font-bold text-white cursor-move">
              Explore Backgrounds
            </p>

            <button
              className="text-red-400 font-bold cursor-pointer"
              onClick={toggleBgBoxOpen}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleBgBoxOpen();
              }}
            >
              X
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
            {spaces.map((space) => (
              <div
                key={space.id}
                className="group cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setBg(space.video)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setBg(space.video);
                }}
              >
                <video
                  src={space.video}
                  muted
                  preload="metadata"
                  className="w-full h-24 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />

                {/* <p className="text-white text-xs text-center mt-2 capitalize truncate">
                  {space.title}
                </p> */}
              </div>
            ))}
          </div>
        </div>
      </main>
    </Draggable>
  );
};

export default Page;

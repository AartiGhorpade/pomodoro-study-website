"use client";
import React from "react";

type backgrounds = {
  src: string;
  alt: string;
  id: number;
  type: "image" | "video";
};

const page = () => {
  const [currentBackground, setCurrentBackground] = React.useState<backgrounds>(
    {
      id: 1,
      type: "image",
      src: "/backgrounds/images/girl-on-terrace.jpg",
      alt: "Lofi Room",
    },
  );

  const backgrounds = [
    {
      id: "1",
      type: "video",
      src: "/backgrounds/videos/tree-nature.mp4",
      title: "Tree Nature",
    },
    {
      id: "2",
      type: "video",
      src: "/backgrounds/rain.mp4",
      title: "Rain",
    },
    {
      id: "3",
      type: "image",
      src: "/backgrounds/mountain.jpg",
      title: "Mountain",
    },
    {
      id: "4",
      type: "image",
      src: "/backgrounds/cafe.jpg",
      title: "Cafe",
    },
  ];
  return (
    <div>
      {currentBackground.type === "video" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={currentBackground.src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={currentBackground.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
};

export default page;

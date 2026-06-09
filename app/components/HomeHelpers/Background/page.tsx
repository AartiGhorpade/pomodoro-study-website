"use client";
import { useBgUrl } from "@/app/store/useAppStore";
import React, { useEffect } from "react";

const page = () => {
  const bgUrl = useBgUrl((state) => state.bgUrl);
  const [currentBackground, setCurrentBackground] = React.useState(bgUrl);

  useEffect(() => {
    setCurrentBackground(bgUrl);
  }, [bgUrl]);

  console.log(bgUrl)

  return (
    <div>
      <video
        key={currentBackground}
        src={currentBackground}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
};

export default page;

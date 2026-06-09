"use client";
import Background from "./components/HomeHelpers/Background/page";
import Sidebar from "./components/HomeHelpers/Sidebar/page";
import Pomodoro from "./components/HomeHelpers/Pomodoro/page";
import Settings from "./components/HomeHelpers/Settings/page";
import ImgVidList from "@/app/components/HomeHelpers/Background/ImgVidList/page";
import Quotes from "@/app/components/HomeHelpers/Quotes/page";
import Sounds from "@/app/components/HomeHelpers/Music/Sounds/page";
import Spotify from "@/app/components/HomeHelpers/Music/Spotify/page";
import Youtube from "@/app/components/HomeHelpers/Music/Youtube/page";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
          <Loader className="animate-spin text-white" />
        </div>
      )}

      <Background />
      <Sidebar />
      <Pomodoro />
      <Settings />
      <ImgVidList />
      <Quotes />
      <Sounds />
      <Spotify />
      <Youtube />
    </>
  );
}

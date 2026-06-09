"use client";

import { useState } from "react";
import {
  Music,
  Timer,
  Image as MonitorPlay,
  Settings,
  Expand,
  Quote,
  Menu,
  X,
} from "lucide-react";

import { FaSpotify, FaYoutube } from "react-icons/fa";

import {
  useBgBoxOpen,
  useFullScreen,
  useQuotes,
  useSettings,
  useTimerBox,
} from "@/app/store/useAppStore";

import { useSound, useSpotify, useYoutube } from "@/app/store/useMusicStore";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFullScreen = useFullScreen((state) => state.toggleFullScreen);
  const toggleTimerBox = useTimerBox((state) => state.toggleTimerBox);
  const toggleSettingBox = useSettings((state) => state.toggleSettingBox);
  const toggleBgBoxOpen = useBgBoxOpen((state) => state.toggleBgBoxOpen);
  const toggleQuotesBox = useQuotes((state) => state.toggleQuotesBox);
  const toggleSoundsBox = useSound((state) => state.toggleSoundsBox);
  const toggleSpotifyBox = useSpotify((state) => state.toggleSpotifyBox);
  const toggleYTBox = useYoutube((state) => state.toggleYTBox);

  const menuItems = [
    { icon: Music, id: "music", fun: toggleSoundsBox },
    { icon: FaSpotify, id: "spotify", fun: toggleSpotifyBox },
    { icon: FaYoutube, id: "youtube", fun: toggleYTBox },
    { icon: Timer, id: "timer", fun: toggleTimerBox },
    { icon: MonitorPlay, id: "background", fun: toggleBgBoxOpen },
    { icon: Settings, id: "settings", fun: toggleSettingBox },
    { icon: Expand, id: "expand", fun: toggleFullScreen },
    { icon: Quote, id: "quotes", fun: toggleQuotesBox },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-6 left-4 z-80 bg-black p-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="text-white" />
        ) : (
          <Menu className="text-white" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative
          lg:top-0 left-0 top-6
          max-lg:h-screen
          lg:h-full
          overflow-y-auto
          max-lg:pb-10
          w-20
          bg-transparent
          flex flex-col items-center mt-12 md:mt-2 gap-2
          z-80
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            className="bg-black p-3 rounded-xl cursor-pointer hover:bg-black/80 transition-colors"
            onClick={() => {
              item.fun?.();
              setIsOpen(false);
            }}
          >
            <item.icon size={24} className="text-white" />
          </button>
        ))}
      </aside>
    </>
  );
}

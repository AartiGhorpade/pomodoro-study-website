"use client";
import {
  useBgBoxOpen,
  useFullScreen,
  useQuotes,
  useSettings,
  useSound,
  useSpotify,
  useTimerBox,
} from "@/app/store/useAppStore";
import {
  Music,
  Timer,
  Image as MonitorPlay,
  Settings,
  Expand,
  Quote,
} from "lucide-react";

import { FaSpotify } from "react-icons/fa";

export default function Sidebar() {
  const toggleFullScreen = useFullScreen((state) => state.toggleFullScreen);
  const toggleTimerBox = useTimerBox((state) => state.toggleTimerBox);
  const toggleSettingBox = useSettings((state) => state.toggleSettingBox);
  const toggleBgBoxOpen = useBgBoxOpen((state) => state.toggleBgBoxOpen);
  const toggleQuotesBox = useQuotes((state) => state.toggleQuotesBox);
  const toggleSoundsBox = useSound((state) => state.toggleSoundsBox);
  const toggleSpotifyBox = useSpotify((state) => state.toggleSpotifyBox);

  const menuItems = [
    { icon: Music, id: "music", fun: toggleSoundsBox },
    { icon: FaSpotify, id: "spotify", fun: toggleSpotifyBox },
    { icon: Timer, id: "timer", fun: toggleTimerBox },
    { icon: MonitorPlay, id: "background", fun: toggleBgBoxOpen },
    { icon: Settings, id: "settings", fun: toggleSettingBox },
    // { icon: LayoutGrid, id: "layout" },
    { icon: Expand, id: "expand", fun: toggleFullScreen },
    { icon: Quote, id: "quotes", fun: toggleQuotesBox },
  ];

  return (
    <main className="relative h-screen overflow-hidden">
      {/* Background */}

      <div className="relative z-10 h-full flex">
        {/* Sidebar */}
        <aside className="w-20 h-full flex flex-col items-center mt-10 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="bg-[#000000] backdrop-blur-md p-3 rounded-xl cursor-pointer hover:bg-[#000000]/80 transition-colors"
              onClick={() => item.fun?.()}
            >
              <item.icon size={24} className="text-white" />
            </button>
          ))}
        </aside>
      </div>
    </main>
  );
}

import {
  Music,
  Timer,
  Image as MonitorPlay,
  Settings,
  LayoutGrid,
  Expand,
} from "lucide-react";

type menuItems = {
  icon: React.ReactNode;
  id: string;
};

export default function Sidebar() {
  const menuItems = [
    { icon: Music, id: "music" },
    { icon: Timer, id: "timer" },
    { icon: MonitorPlay, id: "background" },
    { icon: Settings, id: "settings" },
    { icon: LayoutGrid, id: "layout" },
    { icon: Expand, id: "focus" },
  ];
  return (
    <main className="relative h-screen overflow-hidden">
      {/* Background */}

      <div className="relative z-10 h-full flex">
        {/* Sidebar */}
        <aside className="w-20 h-full flex flex-col items-center justify-center gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="bg-[#000000] backdrop-blur-md p-3 rounded-xl"
            >
              <item.icon size={24} className="text-white" />
            </button>
          ))}
        </aside>
      </div>
    </main>
  );
}

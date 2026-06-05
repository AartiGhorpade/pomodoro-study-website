"use client";
import { useBgBoxOpen, useBgUrl } from "@/app/store/useAppStore";

const spaces = [
  {
    id: 1,
    title: "Rainy Cafe",
    video: "./backgrounds/videos/girl-study-room.mp4",
  },
  {
    id: 2,
    title: "Forest Cabin",
    video: "./backgrounds/videos/stream-2.mp4",
  },
  {
    id: 3,
    title: "Cozy Room",
    video: "./backgrounds/videos/stream.mp4",
  },
  {
    id: 4,
    title: "Mountain View",
    video: "./backgrounds/videos/tree-nature.mp4",
  },
];

const Page = () => {
  const isBgBoxOpen = useBgBoxOpen((state) => state.isBgBoxOpen);
  const toggleBgBoxOpen = useBgBoxOpen((state) => state.toggleBgBoxOpen);
  const setBg = useBgUrl((state) => state.setBg);

  return (
    isBgBoxOpen && (
      <main className="bg-zinc-950 p-4 absolute top-10 left-20 w-[420px] z-30">
        <div className="mx-auto">
          <p className="mb-4 text-md font-bold text-white">
            Explore Backgrounds
          </p>
          <span
            className="text-red-400 absolute top-5 right-5 font-bold cursor-pointer"
            onClick={() => toggleBgBoxOpen()}
          >
            X
          </span>
          <div className="grid md:grid-cols-2 gap-6">
            {spaces.map((space) => (
              <div
                key={space.id}
                className="group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
              >
                <div className="overflow-hidden">
                  <video
                    src={space.video}
                    className="w-[180px] h-[100px] object-cover transition-transform duration-500 group-hover:scale-105"
                    onClick={() => {
                      setBg(space.video);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  );
};

export default Page;

"use client";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { Play, Pause } from "lucide-react";

const page = () => {
  const nodeRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState("calm-piano");
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sounds = [
    {
      id: "calm-piano",
      name: "Calm Piano",
      icon: "🎹",
      url: "/sounds/alexzavesa-calm-inspiring-piano-logo-short-version-518990.mp3",
    },
    {
      id: "lofi-bell",
      name: "Lofi Bell",
      icon: "🔔",
      url: "/sounds/black_kumizhi-lofi-ambient-bell-atmosphere-521324.mp3",
    },
    {
      id: "rain",
      name: "Rain",
      icon: "🌧️",
      url: "/sounds/dragon-studio-relaxing-rain-444802.mp3",
    },
    {
      id: "guitar",
      name: "Relaxing Guitar",
      icon: "🎸",
      url: "/sounds/idoberg-relaxing-guitar-loop-v5-245859.mp3",
    },
    {
      id: "forest",
      name: "Forest Birds",
      icon: "🌲",
      url: "/sounds/soundreality-birds-forest-nature-445379.mp3",
    },
    {
      id: "thunder",
      name: "Thunder",
      icon: "⛈️",
      url: "/sounds/soundreality-thunder-sound-375727.mp3",
    },
    {
      id: "jazz",
      name: "Lo-Fi Jazz",
      icon: "☕",
      url: "/sounds/vibehorn-lo-fi-music-romantic-jazzy-love-479215.mp3",
    },
    {
      id: "rainy-town",
      name: "Rainy Town",
      icon: "🏙️",
      url: "/sounds/whitenoisesleepers-rainy-day-in-town-with-birds-singing-194011.mp3",
    },
  ];
  const playSound = () => {
    const sound = sounds.find((s) => s.id === selected);

    if (!sound) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(sound.url);
    }

    audioRef.current.play();
    setIsPlaying(true);
  };
  const togglePlayPause = () => {
    if (!audioRef.current) {
      playSound();
      return;
    }

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSoundChange = (id: string) => {
    setSelected(id);
    const sound = sounds.find((s) => s.id === id);
    if (!sound) return;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(sound.url);
    audio.loop = true;
    audio.play();
    audioRef.current = audio;
    setIsPlaying(true);
  };
  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <Draggable nodeRef={nodeRef} bounds="parent">
        <section
          ref={nodeRef}
          className="absolute top-10 right-20 pointer-events-auto"
        >
          <div className="bg-black/60 backdrop-blur-md px-8 pb-8 min-w-[320px] text-center">
            <div className="pt-6 cursor-move">
              <span
                className="text-red-400 absolute top-3 right-5 font-bold cursor-pointer"
                //   onClick={() => toggleTimerBox()}
              >
                X
              </span>
            </div>
            {/* <div className="mt-4">
              <label className="block text-sm mb-2">Volume: {volume}%</label>

              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
            </div> */}
            <button
              onClick={togglePlayPause}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/50 transition">
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span>{isPlaying ? "Playing" : "Paused"}</span>
            </button>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {sounds.map((sound) => (
                <div key={sound.id} className="flex items-center">
                  <input
                    type="radio"
                    name="ambience"
                    id={sound.id}
                    className="cursor-pointer"
                    checked={selected === sound.id}
                    onChange={() => handleSoundChange(sound.id)}
                  />

                  <label htmlFor={sound.id} className="ml-3">
                    {sound.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Draggable>
    </div>
  );
};
export default page;

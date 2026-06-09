"use client";

import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { Play, Pause } from "lucide-react";
import { useSound } from "@/app/store/useAppStore";

const Page = () => {
  const nodeRef = useRef<HTMLElement>(null);
  const isSoundsOn = useSound((state) => state.isSoundsOn);

  const [selected, setSelected] = useState("calm-piano");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isSoundsBoxOpen = useSound((state) => state.isSoundsBoxOpen);
  const toggleSounds = useSound((state) => state.toggleSounds);
  const toggleSoundsBox = useSound((state) => state.toggleSoundsBox);


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

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const togglePlayPause = async () => {
    const sound = sounds.find((s) => s.id === selected);

    if (!sound) return;

    // First Play
    if (!audioRef.current) {
      const audio = new Audio(sound.url);

      audio.loop = true;

      try {
        await audio.play();

        audioRef.current = audio;
        setIsPlaying(true);

        if (!isSoundsOn) {
          toggleSounds();
        }
      } catch (err) {
        console.error(err);
      }

      return;
    }

    // Resume
    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();

        setIsPlaying(true);

        if (!isSoundsOn) {
          toggleSounds();
        }
      } catch (err) {
        console.error(err);
      }
    }
    // Pause
    else {
      audioRef.current.pause();

      setIsPlaying(false);

      if (isSoundsOn) {
        toggleSounds();
      }
    }
  };

  const handleSoundChange = async (id: string) => {
    setSelected(id);

    const sound = sounds.find((s) => s.id === id);

    if (!sound) return;

    // If paused, only change selection
    if (!isPlaying) return;

    audioRef.current?.pause();

    const audio = new Audio(sound.url);

    audio.loop = true;

    try {
      await audio.play();

      audioRef.current = audio;
      setIsPlaying(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    isSoundsBoxOpen && (
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
                  onClick={() => toggleSoundsBox()}
                >
                  X
                </span>
              </div>

              <button
                onClick={togglePlayPause}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}

                <span className="text-sm">
                  {isPlaying ? "Playing" : "Paused"}
                </span>
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

                    <label htmlFor={sound.id} className="ml-3 cursor-pointer">
                      {sound.icon} {sound.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Draggable>
      </div>
    )
  );
};

export default Page;

"use client";
import { usePomodoroTimer, useSettings } from "@/app/store/useAppStore";
import { useEffect, useState, useRef } from "react";
import Draggable from "react-draggable";

const Page = () => {
  const time = usePomodoroTimer((state) => state.globalTime);

  const setGlobalTime = usePomodoroTimer((state) => state.setGlobalTime);
  const setGlobalBreak = usePomodoroTimer((state) => state.setGlobalBreak);

  const isSettingsBoxOpen = useSettings((state) => state.isSettingBoxOpen);
  const toggleSettingBox = useSettings((state) => state.toggleSettingBox);
  const minutes = Math.floor(time / 60);

  const [pomodoro, setPomodoro] = useState(minutes);
  const [shortBreak, setShortBreak] = useState(5);
  const [volume, setVolume] = useState(50);
  // Save handler
  const handleSave = () => {
    setGlobalTime(pomodoro);
    setGlobalBreak(shortBreak);
    toggleSettingBox();
  };

  return (
    isSettingsBoxOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="w-[420px] bg-black/60 backdrop-blur-md p-8 text-white shadow-xl relative">
          {/* Close button */}
          <button
            onClick={toggleSettingBox}
            className="absolute right-5 top-4 font-bold text-red-400 text-xl cursor-pointer"
          >
            ✕
          </button>

          <h2 className="text-center text-lg font-semibold mb-4">Settings</h2>

          {/* TIME SETTINGS */}
          <div className="mb-4">
            <p className="text-sm text-gray-300 mb-2">Time (minutes)</p>

            <div className="flex justify-between gap-3">
              <Counter
                label="Pomodoro"
                value={pomodoro}
                setValue={setPomodoro}
              />

              <Counter
                label="Break"
                value={shortBreak}
                setValue={setShortBreak}
              />
            </div>
          </div>

          {/* VOLUME */}
          {/* <div className="mb-4">
            <p className="text-sm text-gray-300 mb-2">Alarm Volume</p>

            <input
              type="range"
              className="w-full"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div> */}

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            className="w-full bg-[#000000] hover:bg-black/80 py-2 rounded-lg mt-2 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    )
  );
};

export default Page;

/* ================= COUNTER ================= */

function Counter({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
}) {
  return (
    <div className="flex flex-col items-center flex-1">
      <span className="text-[14px] text-gray-400">{label}</span>

      <div className="flex items-center gap-4 mt-2">
        <button
          className="px-2 bg-[#2a3142] rounded"
          onClick={() => setValue(Math.max(1, value - 1))}
        >
          ‹
        </button>

        <span>{value}</span>

        <button
          className="px-2 bg-[#2a3142] rounded"
          onClick={() => setValue(value + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}

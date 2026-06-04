"use client";
import { useState } from "react";

/* ================= PAGE ================= */

const Page = () => {

  // Local states (UI only)
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [volume, setVolume] = useState(50);

  // Save handler
  const handleSave = () => {
  
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[420px] rounded-2xl bg-[#1e2430] text-white shadow-xl p-5 relative">
        {/* Close button */}
        <button
        //   onClick={toggleSettings}
          className="absolute right-3 top-2 text-red-400 text-xl"
        >
          ✕
        </button>

        <h2 className="text-center text-lg font-semibold mb-4">Settings</h2>

        {/* TIME SETTINGS */}
        <div className="mb-4">
          <p className="text-sm text-gray-300 mb-2">Time (minutes)</p>

          <div className="flex justify-between gap-3">
            <Counter label="Pomodoro" value={pomodoro} setValue={setPomodoro} />

            <Counter
              label="Break"
              value={shortBreak}
              setValue={setShortBreak}
            />
          </div>
        </div>

        {/* VOLUME */}
        <div className="mb-4">
          <p className="text-sm text-gray-300 mb-2">Alarm Volume</p>

          <input
            type="range"
            className="w-full"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg mt-2"
        >
          Save
        </button>
      </div>
    </div>
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

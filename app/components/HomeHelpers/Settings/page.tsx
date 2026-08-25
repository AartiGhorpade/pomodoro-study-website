"use client";

import {
  usePomodoroTimer,
  useSettings,
} from "@/app/store/useAppStore";

import { useEffect, useState } from "react";

const Page = () => {
  const globalTime = usePomodoroTimer(
    (state) => state.globalTime
  );

  const globalBreak = usePomodoroTimer(
    (state) => state.globalBreak
  );

  const setGlobalTime = usePomodoroTimer(
    (state) => state.setGlobalTime
  );

  const setGlobalBreak = usePomodoroTimer(
    (state) => state.setGlobalBreak
  );

  const isSettingsBoxOpen = useSettings(
    (state) => state.isSettingBoxOpen
  );

  const toggleSettingBox = useSettings(
    (state) => state.toggleSettingBox
  );

  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);

  /* Load current values when settings open */
  useEffect(() => {
    if (isSettingsBoxOpen) {
      setPomodoro(Math.floor(globalTime / 60));
      setShortBreak(Math.floor(globalBreak / 60));
    }
  }, [
    isSettingsBoxOpen,
    globalTime,
    globalBreak,
  ]);

  /* Save */
  const handleSave = () => {
    if (pomodoro < 1 || shortBreak < 1) {
      return;
    }

    setGlobalTime(pomodoro);
    setGlobalBreak(shortBreak);

    toggleSettingBox();
  };

  return (
    isSettingsBoxOpen && (
      <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/60">
        <div className="relative w-[420px] bg-black/60 p-8 text-white shadow-xl backdrop-blur-md">

          {/* Close */}
          <button
            onClick={toggleSettingBox}
            className="absolute right-5 top-4 cursor-pointer text-xl font-bold text-red-400"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="mb-6 text-center text-lg font-semibold">
            Settings
          </h2>

          {/* Time settings */}
          <div className="mb-6">
            <p className="mb-3 text-sm text-gray-300">
              Time (minutes)
            </p>

            <div className="flex gap-4">

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

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={pomodoro < 1 || shortBreak < 1}
            className="w-full cursor-pointer rounded-lg bg-black py-2 hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
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
  setValue: (value: number) => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center">

      <span className="text-[14px] text-gray-400">
        {label}
      </span>

      <div className="mt-2 flex items-center gap-3">

        {/* Previous */}
        <button
          type="button"
          className="cursor-pointer rounded bg-[#2a3142] px-2"
          onClick={() =>
            setValue(Math.max(1, value - 1))
          }
        >
          ‹
        </button>

        {/* Input */}
        <input
          type="number"
          min="1"
          value={value}
          onChange={(e) => {
            const inputValue = e.target.value;

            if (inputValue === "") {
              setValue(0);
              return;
            }

            setValue(Number(inputValue));
          }}
          className="
            w-16
            rounded
            border
            border-gray-600
            bg-black/40
            px-2
            py-1
            text-center
            outline-none
            [appearance:textfield]
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
          "
        />

        {/* Next */}
        <button
          type="button"
          className="cursor-pointer rounded bg-[#2a3142] px-2"
          onClick={() =>
            setValue(value + 1)
          }
        >
          ›
        </button>

      </div>
    </div>
  );
}
"use client";

import React, { useEffect, useRef } from "react";
import Draggable from "react-draggable";

import { successToast, errorToast } from "@/app/Helpers/Toasts";

import { usePomodoroTimer, useTimerBox } from "@/app/store/useAppStore";

const Page = () => {
  const isTimerBoxOpen = useTimerBox((state) => state.isTimerBoxOpen);
  const toggleTimerBox = useTimerBox((state) => state.toggleTimerBox);
  const globalTime = usePomodoroTimer((state) => state.globalTime);
  const globalBreak = usePomodoroTimer((state) => state.globalBreak);

  const [started, setStarted] = React.useState(false);
  const [time, setTime] = React.useState(globalTime);
  const [isBreak, setIsBreak] = React.useState(false);
  const nodeRef = useRef<HTMLElement>(null);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const breakMinutes =
    globalBreak >= 60 ? Math.floor(globalBreak / 60) : globalBreak;

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [started]);


  useEffect(() => {
    if (!started || time > 0) return;

    if (!isBreak) {
      setIsBreak(true);
      setTime(globalBreak);
      setStarted(true);

      successToast("Time for a break! 🧘‍♂️");

      return;
    }

    setIsBreak(false);
    setTime(globalTime);
    setStarted(true);

    errorToast("Time to study! 📚");
  }, [time, started, isBreak, globalTime, globalBreak]);


  useEffect(() => {
    if (isBreak) return;

    setTime(globalTime);
  }, [globalTime]);

  useEffect(() => {
    if (!isBreak) return;

    setTime(globalBreak);
  }, [globalBreak]);


  const handleStartPause = () => {
    setStarted((prev) => !prev);
  };
  const handleReset = () => {
    setStarted(false);
    setIsBreak(false);
    setTime(globalTime);
  };


  return (
    isTimerBoxOpen && (
      <div className="fixed inset-0 z-20 pointer-events-none">
        <Draggable nodeRef={nodeRef} bounds="parent">
          <section
            ref={nodeRef}
            className="absolute md:top-10 top-16 left-8 md:left-20 pointer-events-auto"
          >
            <div className="bg-black/30 backdrop-blur-md px-8 pb-8 min-w-[320px] text-center">
    

              <span
                className="text-red-400 absolute top-5 right-5 font-bold cursor-pointer"
                onClick={toggleTimerBox}
              >
                X
              </span>


              <div className="flex justify-center gap-6 pt-8 cursor-move">
                <button
                  className="px-6 py-1 font-bold rounded-lg cursor-pointer text-white border border-gray-500"
                  onClick={() =>
                    successToast(`${breakMinutes} Minutes Break Added!`)
                  }
                >
                  {breakMinutes} Minutes Break
                </button>
              </div>


              <h1 className="text-white text-8xl font-bold mt-4 mb-6">
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </h1>


              <div className="flex justify-center gap-8">
      

                <button
                  className="px-6 text-sm py-1.5 font-medium rounded-lg cursor-pointer bg-white text-black"
                  onClick={handleStartPause}
                >
                  {started ? "Pause" : "Start"}
                </button>

                <button
                  className="px-6 py-1.5 text-sm font-medium rounded-lg cursor-pointer bg-white/10 text-white"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </section>
        </Draggable>
      </div>
    )
  );
};

export default Page;

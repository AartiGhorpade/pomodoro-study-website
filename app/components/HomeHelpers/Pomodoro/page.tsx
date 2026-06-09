"use client";
import React, { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { successToast, errorToast } from "@/app/Helpers/Toasts";
import { usePomodoroTimer, useTimerBox } from "@/app/store/useAppStore";

const page = () => {
  const isTimerBoxOpen = useTimerBox((state) => state.isTimerBoxOpen);
  const toggleTimerBox = useTimerBox((state) => state.toggleTimerBox);
  const globalTime = usePomodoroTimer((state) => state.globalTime);
  const globalBreak = usePomodoroTimer((state) => state.globalBreak);

  const [started, setStarted] = React.useState(false);
  const [time, setTime] = React.useState(globalTime);
  const [timeBreak, setTimeBreak] = React.useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const isFirstRender = useRef(true);

  const nodeRef = useRef<HTMLElement>(null);

  const breakMinutes =
    globalBreak >= 60 ? Math.floor(globalBreak / 60) : globalBreak;

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    if (time <= 0) {
      setTimeBreak((prev) => !prev);
      setStarted(false);
    }
    return () => clearInterval(interval);
  }, [started, time]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!timeBreak) {
      setTime(globalTime);
      errorToast("Time to study! 🧘‍♂️");
      setStarted(true);
    } else {
      setTime(globalBreak);
      setStarted(true);
      successToast("Time for a break! 🧘‍♂️");
    }
  }, [timeBreak]);

  useEffect(() => {
    if (!started) {
      setTime(globalTime);
    }
  }, [globalTime]);

  return (
    isTimerBoxOpen && (
      <div className="fixed inset-0 z-20 pointer-events-none">
        <Draggable nodeRef={nodeRef} bounds="parent">
          <section
            ref={nodeRef}
            className="absolute top-10 left-20 pointer-events-auto"
          >
            <div className="bg-black/30 backdrop-blur-md px-8 pb-8 min-w-[320px] text-center">
              <span
                className="text-red-400 absolute top-5 right-5 font-bold cursor-pointer"
                onClick={() => toggleTimerBox()}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTimerBox();
                }}
              >
                X
              </span>

              <div className="flex justify-center gap-6 pt-8 cursor-move">
                <button
                  className="px-6 py-1 font-bold rounded-lg cursor-pointer text-white border border-gray-500"
                  onClick={() => successToast("5 Minutes Break Added!")}
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
                  className="px-6 text-sm py-1 font-medium rounded-lg cursor-pointer bg-white text-black"
                  onClick={() => setStarted((prev) => !prev)}
                >
                  {started ? "Pause" : "Start"}
                </button>

                <button
                  className="px-6 py-1 text-sm font-medium rounded-lg cursor-pointer bg-white/10 text-white"
                  onClick={() => {
                    setTime(globalTime);
                    setStarted(false);
                  }}
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

export default page;

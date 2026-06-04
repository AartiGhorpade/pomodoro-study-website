"use client";
import React, { useEffect, useRef } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable/page";
import { successToast, errorToast } from "@/app/Helpers/Toasts";

const page = () => {
  const [started, setStarted] = React.useState(false);
  const [time, setTime] = React.useState(5);
  const [timeBreak, setTimeBreak] = React.useState(false);
  const [breakTime, setBreakTime] = React.useState(5);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const isFirstRender = useRef(true);
  const isTimerBoxOpen = true; // For now, always open. You can replace this with your state logic.
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
      setTime(5);
      errorToast("Time to study! 🧘‍♂️");
      setStarted(true);
    } else {
      setTime(breakTime);
      setStarted(true);
      successToast("Time for a break! 🧘‍♂️");
    }
  }, [timeBreak]);

  return (
    <DndContext>
      {" "}
      {/* <Draggable id="timer"> */}
      {isTimerBoxOpen && (
        <section className="flex-1 flex items-center justify-center absolute top-10 md:left-20 z-20">
          <div className="bg-black/30 backdrop-blur-md rounded-3xl p-14 min-w-[370px] text-center">
            <span
              className="text-red-400 absolute top-5 right-5 font-bold cursor-pointer"
              // onClick={() => toggleTimerBox()}
            >
              X
            </span>

            <div className="flex justify-center gap-6">
              <button
                className="px-6 py-1 font-bold rounded-lg cursor-pointer text-white border border-gray-500"
                onClick={() => successToast("5 Minutes Break Added!")}
              >
                {breakTime} Minutes Break
              </button>
            </div>

            <h1 className="text-white text-8xl font-bold mt-4 mb-6">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </h1>

            <div className="flex justify-center gap-8">
              <button
                className="px-6 py-2 font-medium rounded-lg cursor-pointer bg-white text-black"
                onClick={() => setStarted((prev) => !prev)}
              >
                {started ? "Pause" : "Start"}
              </button>

              <button
                className="px-6 py-2 font-medium rounded-lg cursor-pointer bg-white/10 text-white"
                onClick={() => {
                  setTime(5);
                  setStarted(false);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </section>
      )}
      {/* </Draggable> */}
    </DndContext>
  );
};

export default page;

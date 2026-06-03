"use client";
import React, { useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable/page";

const page = () => {
  const [started, setStarted] = React.useState(false);
  const [time, setTime] = React.useState(1 * 60);
  const [timeBreak, setTimeBreak] = React.useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    if (time <= 0) {
      setTimeBreak((prev) => !prev);
      setTime(5 * 60);
      setStarted(false);
    }

    return () => clearInterval(interval);
  }, [started, time]);

  return (
    <DndContext>
      {" "}
      {/* <Draggable id="timer"> */}
      <section className="flex-1 flex items-center justify-center absolute top-10 md:left-20 z-20">
        <div className="bg-black/30 backdrop-blur-md rounded-3xl p-14 min-w-[370px] text-center">
          <span className="text-red-400 absolute top-5 right-5 font-bold cursor-pointer">
            X
          </span>

          <div className="flex justify-center gap-6">
            <button className="px-6 py-2 font-bold rounded-lg cursor-pointer text-white">
              Short Break
            </button>

            <button className="px-6 py-2 font-bold rounded-lg cursor-pointer text-white">
              Long Break
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
                setTime(1 * 60);
                setStarted(false);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </section>
      {/* </Draggable> */}
    </DndContext>
  );
};

export default page;

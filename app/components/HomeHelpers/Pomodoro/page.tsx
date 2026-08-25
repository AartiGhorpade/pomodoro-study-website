"use client";

import React, { useEffect, useRef } from "react";

import Draggable from "react-draggable";

import { successToast, errorToast } from "@/app/Helpers/Toasts";

import {
  usePomodoroTimer,
  useTimerBox,
  useDailyStudy,
} from "@/app/store/useAppStore";

const Page = () => {
  const isTimerBoxOpen = useTimerBox((state) => state.isTimerBoxOpen);

  const toggleTimerBox = useTimerBox((state) => state.toggleTimerBox);

  const globalTime = usePomodoroTimer((state) => state.globalTime);

  const globalBreak = usePomodoroTimer((state) => state.globalBreak);

  const addStudyTime = useDailyStudy((state) => state.addStudyTime);

  const [started, setStarted] = React.useState(false);

  const [time, setTime] = React.useState(globalTime);

  const [isBreak, setIsBreak] = React.useState(false);

  const nodeRef = useRef<HTMLElement>(null);

  const previousGlobalTime = useRef(globalTime);

  const previousGlobalBreak = useRef(globalBreak);

  const minutes = Math.floor(time / 60);

  const seconds = time % 60;

  const breakMinutes =
    globalBreak >= 60 ? Math.floor(globalBreak / 60) : globalBreak;

  /* ================= DATE ================= */

  const currentDate = new Date();

  const currentDay = currentDate.getDate();

  const currentMonth = currentDate.toLocaleString("en-US", {
    month: "long",
  });

  const getOrdinal = (day: number) => {
    if (day > 10 && day < 20) {
      return "th";
    }

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const studyTitle = `${currentDay}${getOrdinal(
    currentDay,
  )} ${currentMonth} Study`;

  /* ================= TODAY ================= */

  const year = currentDate.getFullYear();

  const month = String(currentDate.getMonth() + 1).padStart(2, "0");

  const day = String(currentDate.getDate()).padStart(2, "0");

  const todayDate = `${year}-${month}-${day}`;

  const dailyStudyTime = useDailyStudy(
    (state) => state.dailyStudyTime[todayDate] || 0,
  );

  const studyHours = Math.floor(dailyStudyTime / 3600);

  const studyMinutes = Math.floor((dailyStudyTime % 3600) / 60);

  const studySeconds = dailyStudyTime % 60;

  /* ================= COUNTDOWN ================= */

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);

      if (!isBreak) {
        addStudyTime(1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [started, isBreak, addStudyTime]);

  /* ================= TIMER FINISHED ================= */

  useEffect(() => {
    if (!started || time > 0) {
      return;
    }

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

  /* ================= SETTINGS UPDATE ================= */

  useEffect(() => {
    if (previousGlobalTime.current !== globalTime) {
      previousGlobalTime.current = globalTime;

      if (!isBreak) {
        setTime(globalTime);
      }
    }
  }, [globalTime, isBreak]);

  useEffect(() => {
    if (previousGlobalBreak.current !== globalBreak) {
      previousGlobalBreak.current = globalBreak;

      if (isBreak) {
        setTime(globalBreak);
      }
    }
  }, [globalBreak, isBreak]);

  /* ================= START / PAUSE ================= */

  const handleStartPause = () => {
    setStarted((prev) => !prev);
  };

  /* ================= RESET ================= */

  const handleReset = () => {
    setStarted(false);

    setIsBreak(false);

    setTime(globalTime);

    previousGlobalTime.current = globalTime;

    previousGlobalBreak.current = globalBreak;
  };

  return (
    <>
      {isTimerBoxOpen && (
        <div className="fixed inset-0 z-20 pointer-events-none">
          <Draggable nodeRef={nodeRef} bounds="parent" handle=".drag-handle">
            <section
              ref={nodeRef}
              className="absolute md:top-10 top-30 left-8 md:left-20 pointer-events-auto"
            >
              <div className="bg-black/30 backdrop-blur-md px-8 pb-8 min-w-[320px] text-center">
                {/* ================= DRAG HANDLE ================= */}

                <div className="drag-handle flex justify-center pt-8 cursor-move touch-none">
                  <button
                    className="px-6 py-1 font-bold rounded-lg text-white border border-gray-500"
                    onClick={() =>
                      successToast(`${breakMinutes} Minutes Break Added!`)
                    }
                  >
                    {breakMinutes} Minutes Break
                  </button>
                </div>

                {/* ================= CLOSE ================= */}

                <span
                  className="text-red-400 absolute top-5 right-5 font-bold cursor-pointer z-10"
                  onClick={toggleTimerBox}
                >
                  X
                </span>

                {/* ================= TIMER ================= */}

                <h1 className="text-white text-8xl font-bold mt-4 mb-6">
                  {minutes.toString().padStart(2, "0")}:
                  {seconds.toString().padStart(2, "0")}
                </h1>

                {/* ================= CONTROLS ================= */}

                <div className="flex justify-center gap-8">
                  <button
                    type="button"
                    className="px-6 text-sm py-1 font-medium rounded-lg cursor-pointer bg-white text-black"
                    onClick={handleStartPause}
                  >
                    {started ? "Pause" : "Start"}
                  </button>

                  <button
                    type="button"
                    className="px-6 py-1 text-sm font-medium rounded-lg cursor-pointer bg-white/10 text-white"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </section>
          </Draggable>
        </div>
      )}

      {/* TODAY'S STUDY */}
      <div className="mt-6 text-white absolute right-5 bg-black backdrop-blur-md p-5">
        <p className="text-sm text-gray-400 mb-1">{studyTitle}</p>

        <p className="text-xl font-semibold">
          {studyHours}h {studyMinutes.toString().padStart(2, "0")}m{" "}
          {studySeconds.toString().padStart(2, "0")}s
        </p>
      </div>
    </>
  );
};

export default Page;

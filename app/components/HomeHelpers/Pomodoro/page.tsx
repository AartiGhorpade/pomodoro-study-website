"use client";

import React, { useEffect, useRef, useState } from "react";
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

  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(globalTime);
  const [isBreak, setIsBreak] = useState(false);

  const nodeRef = useRef<HTMLElement>(null);

  /*
   * ----------------------------------------------------
   * TIMER REFS
   * ----------------------------------------------------
   */

  // When current running period started
  const startTimestampRef = useRef<number | null>(null);

  // Seconds already completed before current start/resume
  const elapsedBeforeStartRef = useRef(0);

  // Used to prevent repeatedly adding same study seconds
  const lastStudySecondRef = useRef(0);

  /*
   * ----------------------------------------------------
   * DATE
   * ----------------------------------------------------
   */

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
  )} ${currentMonth}'s Focus`;

  /*
   * ----------------------------------------------------
   * TODAY
   * ----------------------------------------------------
   */

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

  /*
   * ----------------------------------------------------
   * DISPLAY TIME
   * ----------------------------------------------------
   */

  const minutes = Math.floor(Math.max(0, time) / 60);

  const seconds = Math.max(0, time) % 60;

  const breakMinutes =
    globalBreak >= 60 ? Math.floor(globalBreak / 60) : globalBreak;

  /*
   * ----------------------------------------------------
   * START / PAUSE
   * ----------------------------------------------------
   */

  const handleStartPause = () => {
    /*
     * PAUSE
     */
    if (started) {
      if (startTimestampRef.current !== null) {
        const elapsed = Math.floor(
          (Date.now() - startTimestampRef.current) / 1000,
        );

        elapsedBeforeStartRef.current += elapsed;
      }

      startTimestampRef.current = null;

      setStarted(false);

      return;
    }

    /*
     * START / RESUME
     */

    startTimestampRef.current = Date.now();

    lastStudySecondRef.current = elapsedBeforeStartRef.current;

    setStarted(true);
  };

  /*
   * ----------------------------------------------------
   * RESET
   * ----------------------------------------------------
   */

  const handleReset = () => {
    startTimestampRef.current = null;

    elapsedBeforeStartRef.current = 0;

    lastStudySecondRef.current = 0;

    setStarted(false);

    setIsBreak(false);

    setTime(globalTime);
  };

  /*
   * ----------------------------------------------------
   * ACCURATE TIMER
   * ----------------------------------------------------
   */

  useEffect(() => {
    if (!started) {
      return;
    }

    if (startTimestampRef.current === null) {
      startTimestampRef.current = Date.now();
    }

    /*
     * Update immediately
     */
    const updateTimer = () => {
      if (startTimestampRef.current === null) {
        return;
      }

      const currentElapsed = Math.floor(
        (Date.now() - startTimestampRef.current) / 1000,
      );

      const totalElapsed = elapsedBeforeStartRef.current + currentElapsed;

      /*
       * ------------------------------------------------
       * STUDY TIMER
       * ------------------------------------------------
       */

      if (!isBreak) {
        const remaining = globalTime - totalElapsed;

        setTime(Math.max(0, remaining));

        /*
         * Add ONLY newly completed seconds
         */
        const newStudySeconds = totalElapsed - lastStudySecondRef.current;

        if (newStudySeconds > 0) {
          addStudyTime(newStudySeconds);

          lastStudySecondRef.current = totalElapsed;
        }

        return;
      }

      /*
       * ------------------------------------------------
       * BREAK TIMER
       * ------------------------------------------------
       */

      const remaining = globalBreak - totalElapsed;

      setTime(Math.max(0, remaining));
    };

    /*
     * 250ms update makes display smooth.
     *
     * IMPORTANT:
     * Accuracy does NOT depend on 250ms.
     * Date.now() calculates actual elapsed time.
     */
    const interval = setInterval(updateTimer, 250);

    updateTimer();

    return () => {
      clearInterval(interval);
    };
  }, [started, isBreak, globalTime, globalBreak, addStudyTime]);

  /*
   * ----------------------------------------------------
   * TIMER FINISHED
   * ----------------------------------------------------
   */

  useEffect(() => {
    if (!started || time > 0) {
      return;
    }

    /*
     * STUDY -> BREAK
     */
    if (!isBreak) {
      startTimestampRef.current = Date.now();

      elapsedBeforeStartRef.current = 0;

      lastStudySecondRef.current = 0;

      setIsBreak(true);

      setTime(globalBreak);

      setStarted(true);

      successToast("Time for a break! 🧘‍♂️");

      return;
    }

    /*
     * BREAK -> STUDY
     */

    startTimestampRef.current = Date.now();

    elapsedBeforeStartRef.current = 0;

    lastStudySecondRef.current = 0;

    setIsBreak(false);

    setTime(globalTime);

    setStarted(true);

    errorToast("Time to study! 📚");
  }, [time, started, isBreak, globalTime, globalBreak]);

  /*
   * ----------------------------------------------------
   * SETTINGS UPDATE
   * ----------------------------------------------------
   */

  useEffect(() => {
    if (!started) {
      setTime(isBreak ? globalBreak : globalTime);

      elapsedBeforeStartRef.current = 0;

      lastStudySecondRef.current = 0;
    }
  }, [globalTime, globalBreak, isBreak, started]);

  /*
   * ----------------------------------------------------
   * RENDER
   * ----------------------------------------------------
   */

  return (
    <>
      {isTimerBoxOpen && (
        <div className="fixed inset-0 z-20 pointer-events-none">
          <Draggable nodeRef={nodeRef} bounds="parent" handle=".drag-handle">
            <section
              ref={nodeRef}
              className="
                absolute
                md:top-10
                top-30
                left-8
                md:left-20
                pointer-events-auto
              "
            >
              <div
                className="
                  bg-black/30
                  backdrop-blur-md
                  px-8
                  pb-8
                  min-w-[320px]
                  text-center
                  rounded-xl
                "
              >
                {/* ================= DRAG HANDLE ================= */}

                <div
                  className="
                    drag-handle
                    flex
                    justify-center
                    pt-8
                    cursor-move
                    touch-none
                  "
                >
                  <button
                    type="button"
                    className="
                      px-6
                      py-1
                      font-bold
                      rounded-lg
                      text-white
                      border
                      border-gray-500
                      cursor-pointer
                    "
                    onClick={(e) => {
                      /*
                       * Prevent draggable from
                       * treating this click as drag
                       */
                      e.stopPropagation();

                      successToast(`${breakMinutes} Minutes Break Added!`);
                    }}
                  >
                    {breakMinutes} Minutes Break
                  </button>
                </div>

                {/* ================= CLOSE ================= */}

                <button
                  type="button"
                  className="
                    text-red-400
                    absolute
                    top-5
                    right-5
                    font-bold
                    cursor-pointer
                    z-10
                  "
                  onClick={toggleTimerBox}
                >
                  X
                </button>

                {/* ================= TIMER ================= */}

                <h1
                  className="
                    text-white
                    text-8xl
                    font-bold
                    mt-4
                    mb-6
                  "
                >
                  {minutes.toString().padStart(2, "0")}:
                  {seconds.toString().padStart(2, "0")}
                </h1>

                {/* ================= CONTROLS ================= */}

                <div className="flex justify-center gap-8">
                  <button
                    type="button"
                    className="
                      px-6
                      text-sm
                      py-1
                      font-medium
                      rounded-lg
                      cursor-pointer
                      bg-white
                      text-black
                    "
                    onClick={handleStartPause}
                  >
                    {started ? "Pause" : "Start"}
                  </button>

                  <button
                    type="button"
                    className="
                      px-6
                      py-1
                      text-sm
                      font-medium
                      rounded-lg
                      cursor-pointer
                      bg-white/10
                      text-white
                    "
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

      {/* ================= TODAY'S STUDY ================= */}

      <div
        className="
          mt-6
          text-white
          absolute
          right-5
          bg-black
          backdrop-blur-md
          p-5
          rounded-lg
        "
      >
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

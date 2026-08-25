import { create } from "zustand";
import { persist } from "zustand/middleware";

type fullScreen = {
  toggleFullScreen: () => void;
  isFullScreen: boolean;
};

export const useFullScreen = create<fullScreen>((set, get) => ({
  isFullScreen: false,

  toggleFullScreen: () => {
    const isFs = get().isFullScreen;

    if (!isFs) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    set({ isFullScreen: !isFs });
  },
}));

/* ================= TIMER BOX ================= */

type timerBox = {
  isTimerBoxOpen: boolean;
  toggleTimerBox: () => void;
};

export const useTimerBox = create<timerBox>((set) => ({
  isTimerBoxOpen: true,

  toggleTimerBox: () => {
    set((state) => ({
      isTimerBoxOpen: !state.isTimerBoxOpen,
    }));
  },
}));

/* ================= SETTINGS ================= */

type settings = {
  isSettingBoxOpen: boolean;
  toggleSettingBox: () => void;
};

export const useSettings = create<settings>((set) => ({
  isSettingBoxOpen: false,

  toggleSettingBox: () => {
    set((state) => ({
      isSettingBoxOpen: !state.isSettingBoxOpen,
    }));
  },
}));

/* ================= POMODORO ================= */

type pomodoroTimer = {
  globalTime: number;
  globalBreak: number;

  setGlobalTime: (minutes: number) => void;
  setGlobalBreak: (minutes: number) => void;
};

export const usePomodoroTimer = create<pomodoroTimer>()(
  persist(
    (set) => ({
      // 25 minutes
      globalTime: 25 * 60,

      // 5 minutes
      globalBreak: 5 * 60,

      setGlobalTime: (minutes) =>
        set({
          globalTime: minutes * 60,
        }),

      setGlobalBreak: (minutes) =>
        set({
          globalBreak: minutes * 60,
        }),
    }),
    {
      name: "pomodoro-storage",
    },
  ),
);

/* ================= BACKGROUND ================= */

type openBackgroundGrid = {
  isBgBoxOpen: boolean;
  toggleBgBoxOpen: () => void;
};

export const useBgBoxOpen = create<openBackgroundGrid>((set) => ({
  isBgBoxOpen: false,

  toggleBgBoxOpen: () => {
    set((state) => ({
      isBgBoxOpen: !state.isBgBoxOpen,
    }));
  },
}));

type backgroundSet = {
  bgUrl: string;
  setBg: (url: string) => void;
};

export const useBgUrl = create<backgroundSet>()(
  persist(
    (set) => ({
      bgUrl: "./backgrounds/videos/girl-4.mp4",

      setBg: (url) =>
        set({
          bgUrl: url,
        }),
    }),
    {
      name: "bgUrl",
    },
  ),
);

/* ================= QUOTES ================= */

type quotes = {
  isQuotesBoxOpen: boolean;
  toggleQuotesBox: () => void;
};

export const useQuotes = create<quotes>((set) => ({
  isQuotesBoxOpen: false,

  toggleQuotesBox: () => {
    set((state) => ({
      isQuotesBoxOpen: !state.isQuotesBoxOpen,
    }));
  },
}));

/* ================= Total study ================= */

type dailyStudy = {
  dailyStudyTime: Record<string, number>;
  addStudyTime: (seconds: number) => void;
  getTodayStudyTime: () => number;
};

export const useDailyStudy = create<dailyStudy>()(
  persist(
    (set, get) => ({
      dailyStudyTime: {},

      addStudyTime: (seconds) => {
        const today = new Date().toISOString().split("T")[0];

        set((state) => ({
          dailyStudyTime: {
            ...state.dailyStudyTime,
            [today]: (state.dailyStudyTime[today] || 0) + seconds,
          },
        }));
      },

      getTodayStudyTime: () => {
        const today = new Date().toISOString().split("T")[0];

        return get().dailyStudyTime[today] || 0;
      },
    }),
    {
      name: "daily-study-storage",
    },
  ),
);

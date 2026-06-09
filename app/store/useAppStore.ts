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

type timerBox = {
  isTimerBoxOpen: boolean;
  toggleTimerBox: () => void;
};

export const useTimerBox = create<timerBox>((set, get) => ({
  isTimerBoxOpen: true,

  toggleTimerBox: () => {
    set((state) => ({
      isTimerBoxOpen: !state.isTimerBoxOpen,
    }));
  },
}));

type settings = {
  isSettingBoxOpen: boolean;
  toggleSettingBox: () => void;
};

export const useSettings = create<settings>((set, get) => ({
  isSettingBoxOpen: false,

  toggleSettingBox: () => {
    set((state) => ({
      isSettingBoxOpen: !state.isSettingBoxOpen,
    }));
  },
}));

type pomodoroTimer = {
  globalTime: number;
  globalBreak: number;

  setGlobalTime: (minutes: number) => void;
  setGlobalBreak: (minutes: number) => void;
};

export const usePomodoroTimer = create<pomodoroTimer>()(
  persist(
    (set) => ({
      globalTime: 25 * 60,
      globalBreak: 5 * 60,

      setGlobalTime: (minutes: number) => set({ globalTime: minutes * 60 }),

      setGlobalBreak: (minutes: number) => set({ globalBreak: minutes * 60 }),
    }),
    {
      name: "pomodoro-storage",
    },
  ),
);

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
      bgUrl: "./backgrounds/videos/stream-2.mp4",

      setBg: (url: string) => set({ bgUrl: url }),
    }),
    {
      name: "bgUrl",
    },
  ),
);

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

type Sounds = {
  isSoundsBoxOpen: boolean;
  isSoundsOn: boolean;

  toggleSoundsBox: () => void;
  toggleSounds: () => void;
};

export const useSound = create<Sounds>()(
  persist(
    (set) => ({
      isSoundsBoxOpen: false,
      isSoundsOn: true,

      toggleSoundsBox: () =>
        set((state) => ({
          isSoundsBoxOpen: !state.isSoundsBoxOpen,
        })),

      toggleSounds: () =>
        set((state) => ({
          isSoundsOn: !state.isSoundsOn,
        })),
    }),
    {
      name: "sound-storage",
    }
  )
);


type spotify = {
  isSpotifyBoxOpen: boolean;
  toggleSpotifyBox: () => void;
};

export const useSpotify = create<spotify>((set) => ({
  isSpotifyBoxOpen: false,
  toggleSpotifyBox: () => {
    set((state) => ({
      isSpotifyBoxOpen: !state.isSpotifyBoxOpen,
    }));
  },
}));
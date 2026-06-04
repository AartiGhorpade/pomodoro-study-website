import { create } from "zustand";

type fullScreen = {
  toggleFullScreen: () => void;
  isFullScreen: boolean;
};

export const fullScreen = create<fullScreen>((set, get) => ({
  isFullScreen: false,
  toggleFullScreen: () => {
    const isFs = get().isFullScreen;
    if (!isFs) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    console.log("Toggling fullscreen. Current state:", isFs);
    set({ isFullScreen: !isFs });
  },
}));

type timerBox = {
  isTimerBoxOpen: boolean;
  toggleTimerBox: () => void;
};


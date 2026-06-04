import { create } from "zustand";

type Station = {
  id: string;
  name: string;
};

type MusicState = {
  stations: Station[];
  currentStation: Station | null;
  isPlaying: boolean;
  volume: number;

  setStation: (station: Station) => void;
  togglePlay: () => void;
  setVolume: (value: number) => void;
};

export const useMusicPlayer = create<MusicState>((set) => ({
  stations: [
    { id: "lofi", name: "Default Lofi Station" },
    { id: "coffee", name: "Lofi Coffee Station" },
    { id: "hiphop", name: "Lofi Hip Hop Station" },
    { id: "tokyo", name: "Tokyo Lofi Station" },
  ],

  currentStation: null,
  isPlaying: false,
  volume: 50,

  setStation: (station) =>
    set(() => ({
      currentStation: station,
      isPlaying: true,
    })),

  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  setVolume: (value) =>
    set(() => ({
      volume: value,
    })),
}));

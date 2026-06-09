import { create } from "zustand";
import { persist } from "zustand/middleware";

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
    },
  ),
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

type youtube = {
  isYtBoxOpen: boolean;
  toggleYTBox: () => void;
};

export const useYoutube = create<youtube>((set) => ({
  isYtBoxOpen: false,
  toggleYTBox: () => {
    set((state) => ({
      isYtBoxOpen: !state.isYtBoxOpen,
    }));
  },
}));

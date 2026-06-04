import { create } from "zustand";

type Video = {
  id: number;
  src: string;
  title: string;
};

type VideoStore = {
  videos: Video[];
  currentVideo: Video | null;
  loading: boolean;

  fetchVideos: (query: string) => Promise<void>;
  setCurrentVideo: (video: Video) => void;
};

export const useVideoStore = create<VideoStore>((set) => ({
  videos: [],
  currentVideo: null,
  loading: false,

  fetchVideos: async (query) => {
    set({ loading: true });

    const res = await fetch(`/api/videos?query=${encodeURIComponent(query)}`);

    const data = await res.json();

    const videos = data.videos.map((video: any) => ({
      id: video.id,
      title: video.user?.name || "Video",
      src: video.video_files[0].link,
    }));

    set({
      videos,
      currentVideo: videos[0] ?? null,
      loading: false,
    });
  },

  setCurrentVideo: (video) =>
    set({
      currentVideo: video,
    }),
}));

import Background from "./components/HomeHelpers/Background/page";
import Sidebar from "./components/HomeHelpers/Sidebar/page";
import Pomodoro from "./components/HomeHelpers/Pomodoro/page";
import Settings from "./components/HomeHelpers/Settings/page";
// import MusicPlayer from "./components/HomeHelpers/MusicPlayer/page";

export default function Home() {
  return (
    <div>
      <Background />
      <Sidebar />
      <Pomodoro />
      <Settings />
      {/* <MusicPlayer /> */}
    </div>
  );
}

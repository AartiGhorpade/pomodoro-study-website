import Background from "./components/HomeHelpers/Background/page";
import Sidebar from "./components/HomeHelpers/Sidebar/page";
import Pomodoro from "./components/HomeHelpers/Pomodoro/page";
import Settings from "./components/HomeHelpers/Settings/page";
// import MusicPlayer from "./components/HomeHelpers/MusicPlayer/page";
import ImgVidList from "@/app/components/HomeHelpers/Background/ImgVidList/page";
import Quotes from "@/app/components/HomeHelpers/Quotes/page";
import Sounds from "@/app/components/HomeHelpers/Music/Sounds/page";


export default function Home() {
  return (
    <div>
      <Background />
      <Sidebar />
      <Pomodoro />
      <Settings />
      {/* <MusicPlayer /> */}
      <ImgVidList />
      <Quotes />
      <Sounds/>
    </div>
  );
}

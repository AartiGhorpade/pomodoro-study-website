import Image from "next/image";
import Background from "./components/HomeHelpers/Background/page";
import Sidebar from "./components/HomeHelpers/Sidebar/page";
import Pomodoro from "./components/HomeHelpers/Pomodoro/page";

export default function Home() {
  return (
    <div>
      <Background />
      <Sidebar />
      <Pomodoro />
    </div>
  );
}

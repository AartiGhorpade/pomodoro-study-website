import Image from "next/image";
import Background from "./components/Helpers/Background/page";
import Sidebar from "./components/Helpers/Sidebar/page";
import Pomodoro from "./components/Helpers/Pomodoro/page";

export default function Home() {
  return (
    <div>
      <Background />
      <Sidebar />
      <Pomodoro />
    </div>
  );
}

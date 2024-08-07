import Onload from "./components/Onload";
import Multilangage from "./components/Multilangage";

export default function Home() {
  return (
    <main className="items-center justify-between">
      <Multilangage />
      <Onload />
    </main>
  );
}

import { Board } from "./components/Board";

export const metadata = {
  title: "Prestalana-Board",
  description: "Trello like board with dnd",
};

export default async function Home() {
  return (
    <main className="main bg-grey-300">
      <div className=" bg-grey-200 w-full p-4">
        <Board />
      </div>
    </main>
  );
}

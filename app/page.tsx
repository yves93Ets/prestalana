// import { getUserSession } from '@/lib/session'
import { Board } from './components/Board'

export default async function Home() {
  // const user = await getUserSession()
  return (
    <main className="">
      <Board />
    </main>
  );
}

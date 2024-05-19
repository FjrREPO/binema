import Navbar from '@/components/client/element/Navbar'
import HomePage from '@/components/client/pages/home/HomePage'
import { getAllMovies } from '@/utils/actions/get-all-movies'
import getCurrentUser from '@/utils/actions/get-current-user';

export default async function Home() {
  const movies = await getAllMovies();
  const currentUser = await getCurrentUser()

  return (
    <main
      className='min-h-screen'
    >
      <Navbar />
      <HomePage movies={movies} currentUser={currentUser}/>
    </main>
  )
}

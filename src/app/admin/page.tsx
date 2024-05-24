import AdminNavbar from "@/components/server/element/AdminNav";
import { getAllMovies } from "@/utils/actions/get-all-movies"
import { getAllPayment } from "@/utils/actions/get-all-payment"
import { getAllPaymentCard } from "@/utils/actions/get-all-payment-card"
import { getAllPaymentPlan } from "@/utils/actions/get-all-payment-plan"
import { getAllPaymentPromo } from "@/utils/actions/get-all-payment-promo"
import { IMovieParams } from "@/utils/actions/get-movie";

interface AdminMovieProps {
  searchParams: IMovieParams;
  movie: IMovieParams[];
}

const Page = async ({ searchParams }: AdminMovieProps) => {
  const payment = await getAllPayment()
  const paymentPlan = await getAllPaymentPlan()
  const paymentCard = await getAllPaymentCard()
  const paymentPromo = await getAllPaymentPromo()
  const movie = await getAllMovies()
  const formattedMovies = movie.map((safeMovie) => ({
    id: safeMovie.id,
    title: safeMovie.title,
    genres: safeMovie.genres, 
    category: safeMovie.category,
    backdrop_path: safeMovie.backdrop_path,
    release_date: safeMovie.release_date
}));

  return (
    <div className="bg-[#333] min-h-screen">
      <AdminNavbar payment={payment} paymentPlan={paymentPlan} paymentCard={paymentCard} paymentPromo={paymentPromo} movie={movie} formattedMovies={formattedMovies} />
    </div>
  );
};

export default Page;

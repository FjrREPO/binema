import Payment from "@/components/client/pages/payment/Payment"
import { getAllPaymentCard } from "@/utils/actions/get-all-payment-card";
import { getAllPaymentPromo } from "@/utils/actions/get-all-payment-promo";
import getCurrentUser from "@/utils/actions/get-current-user";
import getMovieById from "@/utils/actions/get-movie-byid";
import getPaymentPlanById from "@/utils/actions/get-payment-plan-byId";

interface IParams {
    movieId?: string
    paymentPlanId?: string
}

const page = async ({ params }: { params: IParams }) => {
    const movie = await getMovieById(params);
    const paymentPlan = await getPaymentPlanById(params)
    const currentUser = await getCurrentUser()
    const paymentCard = await getAllPaymentCard()
    const paymentPromo = await getAllPaymentPromo()

    if (!movie || !paymentPlan || !paymentCard || !paymentPromo) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div>
            <Payment movie={movie} paymentPlan={paymentPlan} currentUser={currentUser} paymentCard={paymentCard} paymentPromo={paymentPromo}/>
        </div>
    )
}

export default page
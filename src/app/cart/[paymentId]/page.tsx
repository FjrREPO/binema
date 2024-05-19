import CartDetail from "@/components/client/pages/cart/cartDetail/CartDetail"
import getPaymentById from "@/utils/actions/get-payment-byid"

interface IParams {
    paymentId: string
}

async function page({params}: {params: IParams}) {
    const payment = await getPaymentById(params)

    if(!payment) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div>
            <CartDetail payment={payment} />
        </div>
    )
}

export default page
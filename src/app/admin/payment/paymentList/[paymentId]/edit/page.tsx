import EditPaymentList from '@/components/server/pages/payment/paymentList/edit/EditPaymentList'
import getPaymentById from '@/utils/actions/get-payment-byid'
import React from 'react'

interface IParams {
    paymentId?: string
}

async function page({ params }: { params: IParams }) {
    const payment = await getPaymentById(params)

    if(!payment) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div><EditPaymentList payment={payment}/></div>
    )
}

export default page
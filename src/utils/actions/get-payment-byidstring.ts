import prisma from '@/lib/prisma'

export default async function getPaymentByIdString(
    prop: string) {
    try {
        const paymentId = prop

        const payment = await prisma.payment.findUnique({
            where: {
                id: paymentId
            }
        })
        if (!payment) return null

        return {
            ...payment
        }
    } catch (err: any) {
        throw new Error(err)
    }
}

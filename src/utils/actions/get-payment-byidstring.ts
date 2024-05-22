import prisma from '@/lib/prisma';

export default async function getPaymentByIdString(paymentId: string) {
    try {
        const payment = await prisma.payment.findUnique({
            where: {
                id: paymentId
            }
        });

        if (!payment) return null;

        return {
            ...payment
        };
    } catch (error) {
        throw error;
    }
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPaymentByIdParams = async (paymentId: string) => {
    try {
        const payment = await prisma.payment.findUnique({
            where: { id: paymentId },
        });

        return payment;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching payment data');
    } finally {
        await prisma.$disconnect();
    }
};

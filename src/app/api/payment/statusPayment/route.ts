import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
    try {
        const now = new Date();

        const expiredPayments = await prisma.payment.findMany({
            where: {
                expiredPayment: {
                    lt: now
                },
                status: 'pending'
            }
        });

        const updatedPayments = await Promise.all(expiredPayments.map(async (payment) => {
            const updatedPayment = await prisma.payment.update({
                where: {
                    id: payment.id
                },
                data: {
                    status: 'canceled'
                }
            });
            return updatedPayment;
        }));

        return NextResponse.json(updatedPayments);
    } catch (error) {
        console.error("Error updating paymentCard:", error);
        return NextResponse.error();
    }
}
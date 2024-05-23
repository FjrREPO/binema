import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/utils/actions/get-current-user";

interface IParams {
    paymentId?: string;
}

async function parseBody(request: Request) {
    try {
        const contentType = request.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            return await request.json();
        }
        throw new Error("Unsupported content type");
    } catch (error) {
        console.error("Error parsing request body:", error);
        return { error: "Invalid request body" };
    }
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    const { paymentId } = params;

    if (!paymentId || typeof paymentId !== "string") {
        return NextResponse.error();
    }

    try {
        const updatedData = await parseBody(request);

        const updatePayment = await prisma.payment.update({
            where: { id: paymentId },
            data: updatedData,
        });

        return NextResponse.json(updatePayment);
    } catch (error) {
        console.error("Error updating payment:", error);
        return NextResponse.error();
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const { paymentId } = params

    if (!paymentId || typeof paymentId !== 'string') {
        throw new Error('Invalid ID')
    }

    const payment = await prisma.payment.deleteMany({
        where: {
            id: paymentId
        }
    })

    return NextResponse.json(payment)
}
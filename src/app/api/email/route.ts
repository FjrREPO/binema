import { NextResponse } from "next/server"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const { from, to, subject, html } = await request.json();

    try {
        const data = await resend.emails.send({
            from: from,
            to: to,
            subject: subject,
            html: html,
        });

        console.log("Email sent successfully!");
        return NextResponse.json(data)

    } catch (error) {
        console.error("Error sending email:", error);

        return new Response("Error sending email", { status: 500 });
    }
}

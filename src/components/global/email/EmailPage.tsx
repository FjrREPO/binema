import * as React from 'react';
import { Html, Button } from "@react-email/components";
import { SafePayment } from '@/utils/types/safeData';

export async function EmailPage({ to, payment }: { to: any, payment: SafePayment }) {
    return (
        <Html lang="en">
            <Button href={'#'}>penerima email = {to}</Button>
            <Button href={'#'}>email by id = {payment.userEmail}</Button>
        </Html>
    );
}
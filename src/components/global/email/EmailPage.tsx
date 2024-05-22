import * as React from 'react';
import { Html, Button } from "@react-email/components";

export function EmailPage({to}: {to: any}) {
    return (
        <Html lang="en">
            <Button href={'#'}>{to}</Button>
        </Html>
    );
}
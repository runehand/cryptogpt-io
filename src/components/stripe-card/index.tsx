import React from 'react';
import {
    CardElement as OriginalCardElement,
} from "@stripe/react-stripe-js";

const OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#ffffff',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#FF5630',
        },
    },
}

export default function CardElement({ onChange }: { onChange: any }) {
    return (
        <OriginalCardElement
            id="card-element"
            onChange={onChange}
            options={OPTIONS}
        />
    );
}
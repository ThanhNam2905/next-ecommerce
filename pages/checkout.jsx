import React from 'react'
import CheckoutPage from '../components/checkout/checkout-page'
import DefaultLayout from '../components/layouts/index/Default-layout'

export default function CheckoutScreen() {
    return (
        <DefaultLayout title='Phương thức thanh toán'>
            <CheckoutPage />
        </DefaultLayout>
    )
}

CheckoutScreen.auth = true;

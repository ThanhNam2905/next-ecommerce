import React from 'react'
import CartPage from '../components/cart/Cart-Page';
import DefaultLayout from '../components/layouts/index/Default-layout';

export default function Cart() {
    return (
        <DefaultLayout title="Shopping Cart">
            <CartPage/>
        </DefaultLayout>
    )
}

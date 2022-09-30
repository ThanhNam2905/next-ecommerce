import React from 'react'
import CartPage from '../components/cart/Cart-Page';
import DefaultLayout from '../components/layouts/index/default-layout';
import dynamic from 'next/dynamic';

function CartScreen() {
    return (
        <DefaultLayout title="Shopping Cart">
            <CartPage/>
        </DefaultLayout>
    )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
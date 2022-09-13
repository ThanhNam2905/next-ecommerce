import React from 'react'
import CartPage from '../components/cart/Cart-Page';
import DefaultLayout from '../components/layouts/index/Default-layout';
import dynamic from 'next/dynamic';

function Cart() {
    return (
        <DefaultLayout title="Shopping Cart">
            <CartPage/>
        </DefaultLayout>
    )
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
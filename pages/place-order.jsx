import dynamic from 'next/dynamic';
import React from 'react'
import DefaultLayout from '../components/layouts/index/Default-layout'
import PlaceOrderPage from '../components/place-order/place-order-page'

function PlaceOrderScreen() {
    return (
        <>
            <DefaultLayout title='Trang đặt hàng'>
                <PlaceOrderPage/>
            </DefaultLayout>
        </>
    )
}

export default dynamic(() => Promise.resolve(PlaceOrderScreen), { ssr: false });

PlaceOrderScreen.auth = true;
import React from 'react'
import DefaultLayout from '../components/layouts/index/default-layout'
import OrderPage from '../components/orders/order-page'

export default function OrderScreen() {
    return (
        <DefaultLayout title="Trang Đặt Hàng">
            <OrderPage/>
        </DefaultLayout>
    )
}

OrderScreen.auth = true;
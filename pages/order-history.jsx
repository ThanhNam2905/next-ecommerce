import React from 'react'
import DefaultLayout from '../components/layouts/index/Default-layout'
import OrderHistoryPage from '../components/order-history/order-history-page'

export default function OrderHistoryScreen() {
    return (
        <DefaultLayout title='Trang lịch sử đơn hàng'>
            <OrderHistoryPage/>
        </DefaultLayout>
    )
}

OrderHistoryScreen.auth = true;

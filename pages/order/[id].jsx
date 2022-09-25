import React from 'react'
import DefaultLayout from '../../components/layouts/index/Default-layout';
import OrderDetailPage from '../../components/order-detail/order-detail-page';

export default function OrderDetailScreen() {
    return (
        <DefaultLayout title='Trang Chi Tiết Đơn Hàng'>
            <OrderDetailPage/>
        </DefaultLayout>
    )
}

OrderDetailScreen.auth = true;
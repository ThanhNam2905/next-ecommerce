import React from 'react'
import CartPage from '../components/cart/cart-page';
import DefaultLayout from '../components/layouts/index/default-layout';
import dynamic from 'next/dynamic';
import db from '../utils/database';
import ProductDetail from '../models/ProductDetailModel';

function CartScreen({productsDetail}) {
    return (
        <DefaultLayout title="Shopping Cart">
            <CartPage productsDetail={productsDetail}/>
        </DefaultLayout>
    )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });

export async function getServerSideProps() {

    await db.connect();
    const productsDetail = await ProductDetail.find().lean();
    await db.disconnect();
    return {
        props: {
            productsDetail: JSON.parse(JSON.stringify(productsDetail)),
        }
    }
}
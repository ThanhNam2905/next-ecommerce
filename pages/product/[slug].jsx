import React from 'react'
import ProductDetailPage from '../../components/product-detail/product-detail-page';
import DefaultLayout from '../../components/layouts/index/default-layout';
import db from '../../utils/database';
import Product from '../../models/ProductModel';

export default function ProductDetail({ product }) {
    // console.log(props.product);

    return (
        <DefaultLayout title={product?.name}>
            <ProductDetailPage product={product}/>
        </DefaultLayout>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    //  connect databse mongodb
    await db.connect();
    const product = await Product.findOne({slug}).lean(); //  use lean() in mongoose convert from JSON to Object JS.
    await db.disconnect();
    return {
        props: {
            product: product ? db.convertDocToObj(product) : null
        }
    }
}


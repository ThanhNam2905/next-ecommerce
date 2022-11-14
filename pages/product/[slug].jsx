import React from 'react'
import ProductDetailPage from '../../components/product-detail/product-detail-page';
import DefaultLayout from '../../components/layouts/index/default-layout';
import db from '../../utils/database';
import Product from '../../models/ProductModel';
import ProductDetail from '../../models/ProductDetailModel';

export default function ProductDetailScreen({ product, productsDetail }) {
    // console.log(props.product);

    return (
        <DefaultLayout title={product?.name}>
            <ProductDetailPage product={product} productsDetail={productsDetail}/>
        </DefaultLayout>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;

    //  connect databse mongodb
    await db.connect();
    const product = await Product.findOne({slug}).lean(); //  use lean() in mongoose convert from JSON to Object JS.
    const productsDetail = await ProductDetail.find().lean();
    await db.disconnect();
    return {
        props: {
            product: JSON.parse(JSON.stringify(product ? db.convertDocToObj(product) : null)),
            productsDetail: JSON.parse(JSON.stringify(productsDetail)),
        }
    }
}


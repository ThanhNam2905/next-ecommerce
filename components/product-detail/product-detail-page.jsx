
import React from 'react';

import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons';
import ProductImage from './components/Product-Image';
import ProductInfo from './components/Product-Info';
import NotFoundProduct from './components/not-found-product';
import { useRouter } from 'next/router';


function ProductDetailPage({product, productsDetail}) {

    const router = useRouter();
    const query = router.query;
    if(!product) {
        return (
            <NotFoundProduct slug={query.slug}/>
        );
    }

    return (
        <>
            {/* Breadcrumbs component */}
            <div className='py-2'>
                <Link href="/">
                    <a className='flex items-center gap-x-3 hover:text-amber-400 transition ease-linear duration-300'>
                        <HomeOutlined className='mb-1'/>
                        <span>Back to home</span>
                    </a>
                </Link>
            </div>

            {/* Product Detail */}
            <div className='grid grid-cols-12 gap-x-10 my-6'>
                {/* Product Image */}
                <ProductImage product={product}/>
                
                {/* Product Info */}
                <ProductInfo product={product} productsDetail={productsDetail}/>
            </div>
        </>    
    );
}

export default ProductDetailPage;

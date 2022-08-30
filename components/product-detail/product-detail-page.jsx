import { useRouter } from 'next/router';
import React from 'react';
import data from '../../utils/data';
import DefaultLayout from '../layouts/index/Default-layout';
import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons';
import ProductImage from './components/Product-Image';
import ProductInfo from './components/Product-Info';


function ProductDetailPage() {

    const router = useRouter();
    const query = router.query;
    const { slug } = query;     // const slug = query.slug;
    const product = data.products.find(x => x.slug === slug);
    if(!product) {
        return <div>Product Not Found</div>
    }

    return (
        <DefaultLayout title={product.name}>
            
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
            <div className='grid grid-cols-2 gap-x-8 my-6'>
                {/* Product Image */}
                <ProductImage product={product}/>
                
                {/* Product Info */}
                <ProductInfo product={product}/>
            </div>


        </DefaultLayout>
    );
}

export default ProductDetailPage;

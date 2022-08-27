import { useRouter } from 'next/router';
import React from 'react';
import data from '../../utils/data';
import DefaultLayout from '../layouts/index/Default-layout';
import Link from 'next/link';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image';

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
                <div className='col-span-1'>
                    <Image 
                        src={product.images} 
                        alt={product.name}
                        width={100}
                        height={100}
                        layout="responsive"
                        className='bg-blue-50'/>
                </div>
                {/* Product Info */}
                <div className='col-span-1'>
                    <ul className='space-y-2'>
                        <li>
                            <h2 className='text-[26px] font-semibold font-sans'>{product.name}</h2>
                        </li>
                        <li>
                            <p className='text-base'>
                                Mã sản phẩm: <span className='italic text-gray-500 font-semibold ml-1.5'>{product.codeProduct}</span>
                            </p>
                        </li>
                        <li>
                            <p className='text-base'>
                                Thương hiệu sản phẩm: <span className='italic text-gray-500 font-semibold ml-1.5'>{product.brand}</span>
                            </p>
                        </li>
                        <li>
                            <p>{product.rating} of {product.numberReview} reviews</p>
                        </li>
                        <li>
                            <p className='text-xl pt-1 text-[#1b1b1b]'>{product.description}</p>
                        </li>
                        <li>
                            <p className='text-[28px] font-bold font-mono pt-2 text-red-500'>
                                {product.price}
                                <span className='ml-1.5 text-[25px]'>VNĐ</span>
                            </p>
                        </li>
                    </ul>
                    <div className='mt-3'>
                        <button className='btn btn--add-to-cart px-8 py-4 uppercase flex items-center gap-x-2' type='button'>
                            <ShoppingCartOutlined className='text-lg -mt-1'/>
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            </div>


        </DefaultLayout>
    );
}

export default ProductDetailPage;

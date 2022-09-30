import React from 'react';
import { StarOutlined, StarFilled, ShoppingOutlined,  } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductItem({ product }) {
    return (
        <div className='product-item'>
            <Link href={`/product/${product.slug}`}>
                
                    {/* <img 
                        src={product.images} 
                        alt={product.name} 
                        className='rounded shadow-md bg-blue-100'
                    /> */}
                <Image
                    src={product.images} 
                    alt={product.name}
                    width={100}
                    height={100} 
                    layout='responsive'
                    className='rounded shadow-md bg-blue-100/50 cursor-pointer'/>
            </Link>

            {/* info product-item */}
            <div className='flex flex-col items-center justify-center px-5 py-4'>
                <Link  href={`/product/${product.slug}`}>
                    <a>
                        <h3 className='text-lg !font-nunito font-medium capitalize line-clamp-1'>{product.name}</h3>
                    </a>
                </Link>
                <div className='flex items-center !my-1.5 space-x-3.5'>
                    <div className='flex items-center gap-x-1 text-yellow-400 text-[14px]'>
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarOutlined />
                    </div>
                    <p className='text-sm italic'>{product.numberReview} <span className='text-gray-600'>reivew</span></p>
                </div>
                <p className='text-xl !my-1.5'>{product.price} <span className='underline'>đ</span></p>
                <button className='btn btn--primary px-5 my-3 flex items-center gap-x-1.5' type='button'>
                    Mua hàng
                    <ShoppingOutlined />
                </button>
            
            </div>
        </div>
    )
}

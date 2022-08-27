import React from 'react';
import { StarOutlined, StarFilled,  } from '@ant-design/icons';
import Link from 'next/link';

export default function ProductItem({ product }) {
    return (
        <div className='product-item'>
            <Link href={`/product/${product.slug}`}>
                <a>
                    <img 
                        src={product.images} 
                        alt={product.name} 
                        className='rounded shadow-md bg-blue-100'
                    />
                </a>
            </Link>

            {/* info product-item */}
            <div className='flex flex-col items-center justify-center p-5'>
                <Link  href={`/product/${product.slug}`}>
                    <a>
                        <h3 className='text-lg !font-nunito font-medium capitalize line-clamp-1'>{product.name}</h3>
                    </a>
                </Link>
                <div className='flex items-center my-1 space-x-3.5'>
                    <div className='flex items-center gap-x-1 text-yellow-400 text-[14px]'>
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarFilled />
                        <StarOutlined />
                    </div>
                    <p className='text-sm italic'>{product.numberReview} <span className='text-gray-600'>reivew</span></p>
                </div>
                <p className='text-xl my-1.5'>{product.price} <span className='underline'>đ</span></p>
                <button className='btn btn--add-to-cart' type='button'>Thêm vào giỏ hàng</button>
            
            </div>
        </div>
    )
}

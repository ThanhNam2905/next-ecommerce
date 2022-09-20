import Image from 'next/image'
import React from 'react'

export default function NotFoundProduct({ slug }) {
    return (
        <div className='my-16 flex flex-col items-center justify-center'>
            <Image
                src='/images/not-found-product.png'
                alt="Not Found Product Image"
                width={400}
                height={250}
                />

            <p className='text-xl text-center font-semibold'>
                Không tìm thấy sản phẩm 
                <span className='pl-3 inline-block text-xl italic text-orange-500'>{slug}</span>
            </p>
        </div>
    )
}

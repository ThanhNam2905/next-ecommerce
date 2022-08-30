import React from 'react'
import Image from 'next/image';

export default function ProductImage({ product }) {
    return (
        <>
            <div className='col-span-1'>
                <Image 
                    src={product.images} 
                    alt={product.name}
                    width={100}
                    height={100}
                    layout="responsive"
                    className='bg-blue-50'/>
            </div>
        </>
    )
}

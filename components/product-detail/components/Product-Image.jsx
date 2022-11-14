import React from 'react'
import Image from 'next/image';

export default function ProductImage({ product }) {
    return (
        <>
            <div className='col-span-8 grid grid-cols-12 gap-x-6'>
                <div className='col-span-4 grid grid-cols-2 gap-x-4 gap-y-1'>
                    {
                        product.imagesProduct.length > 0 &&
                            product.imagesProduct.map((img, index) => {
                                return (
                                    <div className='col-span-1 h-[90px]' key={index}>
                                        <Image 
                                            src={img.url_img} 
                                            alt={img.url_img}
                                            width={100}
                                            height={100}
                                            layout="responsive"
                                            className='w-full h-full rounded-md'/>
                                    </div>
                                )
                            })
                    }
                </div>
                <div className='col-span-8'>
                    <Image 
                        src={product.imagesProduct[0].url_img} 
                        alt={product.name}
                        width={100}
                        height={100}
                        layout="responsive"
                        className='bg-gray-100'/>
                </div>
                
            </div>
        </>
    )
}

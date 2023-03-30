import React from 'react'
import Image from 'next/image';

export default function ProductImage({ product }) {
    return (
        <>
            <div className='col-span-6 grid grid-cols-12 gap-x-6'>
                <div className='col-span-3 gap-y-3'>
                    {
                        product.imagesProduct.length > 0 &&
                            product.imagesProduct.map((img, index) => {
                                return (
                                    <div className='col-span-1' key={index}>
                                        <Image 
                                            src={img.url} 
                                            alt={img.url}
                                            width={120}
                                            height={150}
                                            
                                            className='object-center object-contain rounded-md'/>
                                    </div>
                                )
                            })
                    }
                </div>
                <div className='col-span-9'>
                    <Image 
                        src={product.imagesProduct[0].url} 
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

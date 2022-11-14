import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { Tag, Tooltip } from 'antd';

export default function ProductItem({ product }) {

    // let listArrayColor = [];
    // const renderListColor = productsDetail.filter((item) => {
    //     if(item.productId === product._id && !listArrayColor.includes(item.color)) {
    //         listArrayColor.push(item.color);
    //         return item;
    //     }
    // });

    return (
        <div className='block rounded-md border-gray-200 shadow-xl group'>
            <div className='relative !overflow-hidden'>
                <Image
                    src={product.imagesProduct[0].url_img} 
                    alt={product.nameProduct}
                    width={100}
                    height={100} 
                    layout='responsive'
                    className='rounded bg-slate-100/80 cursor-pointer'/>

                <div className='absolute z-20 top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-20 transform scale-0 invisible group-hover:visible group-hover:scale-100 transition-all ease-linear duration-300'>
                    <Link href={`/product/${product.slugProduct}`}>
                        <a className='btn btn--primary px-5 py-2'>Xem chi tiết</a>
                    </Link>
                </div>
            </div>
            
            {/* info product-item */}
            <div className='flex flex-col items-center justify-center px-5 pt-2.5 pb-6'>
                <Link  href={`/product/${product.slugProduct}`}>
                    <a>
                        <h3 className='text-lg !font-nunito font-medium capitalize line-clamp-1'>{product.nameProduct}</h3>
                    </a>
                </Link>
                <p className='text-base font-bold italic flex items-center'>
                    {new Intl.NumberFormat().format(product.priceProduct)} 
                    <sup className='underline ml-1 !mt-2.5 inline-block'>đ</sup>
                </p>
                {/* <div className='flex items-center gap-3 my-2'>
                    { renderListColor.length > 0 &&
                        renderListColor.map((item) => (
                            <Tooltip 
                                key={item._id} 
                                placement="bottom" 
                                color={item.subColor !== '#ffffff' ? item.subColor : 'gray'} 
                                title={item.color}>
                                <Tag 
                                    color={item.subColor} 
                                    className='!w-7 !h-7 !border !border-gray-400 !rounded'>
                                    </Tag>
                            </Tooltip>
                        ))
                    }
                </div> */}
            </div>
        </div>
    )
}

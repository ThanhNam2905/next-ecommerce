import React from 'react';

import ProductItem from './components/ProductItem';

export default function ProductPage({ products, productsDetail }) {

    return (
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4 my-16'>
            { 
                products.map((product, index) => (
                    <ProductItem product={product} key={index} productsDetail={productsDetail}/>
                ))
            }
        </div>
    );
}



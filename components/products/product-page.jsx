import React from 'react';

import ProductItem from './components/ProductItem';

export default function ProductPage({ products }) {

    return (
        <div className='grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-3 lg:grid-cols-4'>
            { 
                products.map((product, index) => (
                <ProductItem product={product} key={index}/>
                ))
            }
        </div>
    );
}



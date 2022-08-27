import React from 'react';
import data from '../../utils/data';
import ProductItem from './components/ProductItem';

export default function ProductPage() {
    return (
        <div className='grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-3 lg:grid-cols-4'>
            { data.products.map((product, index) => (
                <ProductItem product={product} key={index}/>
            ))}
        </div>
    );
}

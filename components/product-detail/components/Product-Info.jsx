import React, { useContext } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { StoreContext } from '../../../store/Store';

export default function ProductInfo({ product }) {

    const { state, dispatch } = useContext(StoreContext)

    // Features add Product to Cart
    const handleAddToCart = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
        console.log(existItem);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if(product.countInStock < quantity) {
            alert("Xin lỗi, sản phẩm này đã hết hàng");
        }
        dispatch({ type: 'ADD_CART_ITEM', payload: { ...product, quantity} });
    }


    return (
        <>
            <div className='col-span-1'>
                <ul className='space-y-2'>
                    <li>
                        <h2 className='text-[26px] font-semibold font-sans'>{product.name}</h2>
                    </li>
                    <li>
                        <p className='text-base'>
                            Mã sản phẩm: <span className='italic text-gray-500 font-semibold ml-1.5'>{product.codeProduct}</span>
                        </p>
                    </li>
                    <li>
                        <p className='text-base'>
                            Thương hiệu sản phẩm: <span className='italic text-gray-500 font-semibold ml-1.5'>{product.brand}</span>
                        </p>
                    </li>
                    <li>
                        <p>{product.rating} of {product.numberReview} reviews</p>
                    </li>
                    <li>
                        <p className='text-xl pt-1 text-[#1b1b1b]'>{product.description}</p>
                    </li>
                    <li>
                        <p className='text-[28px] font-bold font-mono pt-2 text-red-500'>
                            {product.price}
                            <span className='ml-1.5 text-[25px]'>VNĐ</span>
                        </p>
                    </li>
                </ul>
                <div className='mt-3'>
                    <button 
                        className='btn btn--add-to-cart px-8 py-4 uppercase flex items-center gap-x-2' 
                        type='button'
                        onClick={() => handleAddToCart()}>
                            <ShoppingCartOutlined className='text-lg -mt-1'/>
                            Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </>
    )
}

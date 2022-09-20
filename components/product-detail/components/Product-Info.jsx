import React, { useContext } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { StoreContext } from '../../../store/Store';
import { message } from 'antd';
import axios from 'axios'
// import { useRouter } from 'next/router';

export default function ProductInfo({ product }) {

    const { state, dispatch } = useContext(StoreContext);
    const {
        cart : { cartItems }
    } = state;

    // const router = useRouter();

    // Features add Product to Cart
    const handleAddToCart = async () => {
        const existItem = cartItems.find((x) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        //  get Product with id
        const { data } = await axios.get(`/api/products/${product._id}`);

        if(data.countInStock < quantity) {
            return message.error({
                content: "Xin lỗi, sản phẩm này đã hết hàng" ,
                className: 'customize__antd--message'
            });
        }
        dispatch({ type: 'ADD_CART_ITEM', payload: { ...product, quantity} });

        message.success({
            content: 'Thêm sản phẩm vào giỏ hàng thành công',
            className: 'customize__antd--message'
        })
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
                        className='btn btn--primary px-8 py-4 uppercase flex items-center gap-x-2' 
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

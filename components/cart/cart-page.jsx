import React, { useContext } from 'react'
import { HomeOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import Link from 'next/link';
import Image from 'next/image'
import { StoreContext } from '../../store/Store';
import { Popconfirm, message } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function CartPage() {

    const { state, dispatch } = useContext(StoreContext);
    const router = useRouter();
    const {
        cart: { cartItems }
    } = state;

    // Hanlde event user remove item in Cart
    const handleRemoveItemProduct = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
        message.success({
            content: 'Xoá sản phẩm thành công',
            className: 'customize__antd--message-success'
        })
    }

    // Handler event user change quantity item in Cart
    const handleUpdateQuantityInCart = async (item, qty) => {
        const quantity = Number(qty);
        const { data } = await axios.get(`/api/products/${item._id}`);
        if(data.countInStock < quantity) {
            return message.error({
                content: "Xin lỗi, sản phẩm này đã hết hàng" ,
                className: 'customize__antd--message-error'
            });
        }
        dispatch({ type: 'ADD_CART_ITEM', payload: { ...item, quantity }});
        return message.success({
            content: 'Sản phẩm đã được cập nhật thành công' ,
            className: 'customize__antd--message-success'
        })
    }

    return (
        <div className='my-16'>
            {/* Breadcrumbs component */}
            <div className='my-2 flex gap-x-2'>
                <Link href={"/"}>
                    <a title='Trang chủ'>
                        <HomeOutlined className='text-lg -mt-2 hover:text-amber-500' />
                    </a>
                </Link>
                <p className='text-xl'>/</p>
                <h2 className='text-lg'>Shopping Cart</h2>
            </div>

            {
                cartItems.length === 0 ? (
                    <div className='flex flex-col items-center justify-center'>
                        <Image
                            src="/images/cart-empty.png"
                            alt="cart-empty"
                            width={350}
                            height={250}
                        />

                        <p className='!mt-6 !mb-3 text-xl font-nunito font-bold'>Hiện chưa có sản phẩm</p>

                        <Link href={"/"}>
                            <a>Tiếp tục mua sắm.</a>
                        </Link>
                    </div>
                ) : (
                    <div className='grid md:grid-cols-12 md:gap-x-8'>
                        <div className='overflow-x-auto md:col-span-8'>
                            <table className='min-w-full'>
                                <thead className='border-b'>
                                    <tr>
                                        <th className='px-5 text-left'>Sản phẩm</th>
                                        <th className='p-5 text-right'>Số lượng</th>
                                        <th className='p-5 text-right'>Giá tiền</th>
                                        <th className='p-5 text-right'>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y'>
                                    {
                                        cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className='!py-4'>
                                                    <Link href={`/product/${item.slug}`}>
                                                        <a className='flex items-center gap-x-4'>
                                                            <Image
                                                                src={item.images}
                                                                alt={item.name}
                                                                width={70}
                                                                height={70}
                                                                className='bg-blue-100 rounded'
                                                            />
                                                            <span className='text-base italic font-semibold hover:underline hover:underline-offset-4 transition ease-linear duration-300'>{item.name}</span>
                                                        </a>
                                                    </Link>
                                                </td>
                                                <td className='p-5 text-right'>
                                                    <select 
                                                        name="quantityItem" id="quantityItem"
                                                        className='select-box__quantity'
                                                        value={item.quantity} onChange={(e) => handleUpdateQuantityInCart(item, e.target.value)}>
                                                        {
                                                            [...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1} className='cursor-pointer'>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                                <td className='p-5 text-right text-base font-semibold'>
                                                    {new Intl.NumberFormat().format(item.price)}
                                                    <sup className='underline ml-1 mt-1.5'>đ</sup>
                                                </td>
                                                <td className='p-5 text-right'>
                                                    <Popconfirm
                                                        title="Bạn xác nhận muốn xoá sản phẩm này khỏi giỏ hàng?"
                                                        onConfirm={() => handleRemoveItemProduct(item)}
                                                        okText="Có"
                                                        cancelText="Cancel">
                                                        <DeleteOutlined className='w-6 h-6 flex justify-end items-center cursor-pointer hover:text-red-500' />
                                                    </Popconfirm>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='md:col-span-4'>
                            <div className='border shadow-xl py-8 px-6 rounded-md bg-gray-50'>
                                <h2 className='text-[18px] !mb-1 font-semibold font-nunito uppercase flex items-center justify-center gap-x-3 border-b-4 border-gray-400 pb-4'>
                                    Giỏ hàng
                                    <ShoppingCartOutlined className='text-xl -mt-1 inline-block'/>
                                </h2>
                                <ul className='space-y-5 text-lg mt-4'>
                                    <li className='flex items-center justify-between'>
                                        <p className='font-semibold'>Số lượng Item:</p>
                                        <p>{cartItems.reduce((a, c) => a + c.quantity, 0)}</p>
                                    </li>
                                    <li className='flex items-center justify-between'>
                                        <p className='font-semibold'>Tổng tiền:</p>
                                        <p className='text-red-500 font-semibold'>{new Intl.NumberFormat('vn-VN').format(cartItems.reduce((a, c) => a + c.quantity * c.price, 0))} VNĐ</p>
                                    </li>
                                </ul>
                                <div className='!pb-4 flex items-center justify-between gap-x-4 border-t-4 border-gray-400 pt-6'>
                                    <button 
                                        type='button' className='btn btn--primary !px-0 w-full uppercase font-semibold'
                                        onClick={() => router.push('/')}>
                                        Tiếp tục mua sắm
                                    </button>
                                    <button 
                                        type='button' className='btn btn--primary !px-0 w-full uppercase font-semibold'
                                        onClick={() => router.push('login?redirect=/order')}>
                                        Thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

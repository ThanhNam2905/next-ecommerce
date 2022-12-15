import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { StoreContext } from '../../store/Store'
import CheckoutWizard from '../orders/components/checkout-wizard'
import axios from 'axios'
import Cookies from 'js-cookie'
import SpinLoading from '../shared/spin-loading';

export default function PlaceOrderPage() {
    const { state, dispatch } = useContext(StoreContext);
    const { cart } = state;
    const { cartItems, infoOrder } = cart;

    const router = useRouter();

    const round2 = (number) => Math.round(number * 100 + Number.EPSILON) / 100;
    const itemPrice = round2(cartItems.reduce((a, c) => a + c.quantityItem * c.price, 0)); // 123.576 ==> 124
    const shippingPrice = infoOrder.shippingMethod === 'Nội thành' ? 25000 : 45000;
    const totalPrice = round2(itemPrice + shippingPrice);

    const  [loading, setLoading] = useState(false);
    const handlerPlaceOrder = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress: infoOrder.shippingAddress,
                paymentMethod: infoOrder.paymentMethod,
                shippingMethod: infoOrder.shippingMethod,
                itemsPrice: itemPrice,
                shippingPrice: shippingPrice,
                totalPrice: totalPrice,
            });
            setInterval(() => {
                setLoading(false);
            }, 2500);

            dispatch({ type: 'CLEAR_CART_ITEMS'});
            Cookies.set(
                'cart',
                JSON.stringify({
                    ...cart,
                    cartItems: [],
                })
            );

            router.push(`/order/${data._id}`)

        } catch (error) {
            setLoading(false);
            message.error({
                content: error,
                className: 'customize__antd--message-error'
            })
        }
    };

    return (
        <div className='mt-6 mb-16'>
            <CheckoutWizard activeStepOrder={2}/>
            <h2 className='!py-3 text-[20px]'>Đơn hàng của bạn</h2>
            {
                cartItems.length === 0 ? (
                    <div className='flex flex-col items-center justify-center'>
                        <Image
                            src="/images/cart-empty.png"
                            alt="cart-empty"
                            width={220}
                            height={180}
                        />

                        <h3 className='text-xl font-semibold text-gray-600 italic !my-5'>Giỏ hàng của bạn đang rỗng. Vui lòng thêm sản phẩm vào giỏ hàng</h3> 
                        <Link href='/'>
                            <a className='btn btn--primary font-semibold flex items-center gap-x-2 py-3'>
                                <ArrowLeftOutlined />
                                Quay lại mua hàng
                            </a>
                        </Link>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-12 md:gap-8'>
                        <div className='col-span-8 space-y-9'>
                            <div className='px-6 pt-4 pb-6 rounded-lg shadow-md border text-slate-700'>
                                <h4 className='font-semibold !mb-2.5 text-[17px]'>Thông tin giao hàng</h4>
                                <p className='text-[15px] font-semibold !mb-2.5'>
                                    Họ và tên:
                                    <span className='italic inline-block pl-2.5'>{infoOrder.shippingAddress.username}.</span>
                                </p>
                                <p className='text-[15px] font-semibold !mb-2.5'>
                                    Số điện thoại:
                                    <span className='italic inline-block pl-2.5'>{infoOrder.shippingAddress.numberPhone}.</span>
                                </p>
                                <p className='text-[15px] font-semibold !mb-2.5'>
                                    Địa chỉ giao hàng:
                                    <span className='italic inline-block pl-2.5'>{infoOrder.shippingAddress.addressShip}.</span>
                                </p>
                                <div className='pt-1'>
                                    <Link href={'/order'}>
                                        <a className='btn bg-blue-200 inline-flex items-center gap-x-2 font-semibold'>
                                            Chỉnh sữa
                                            <EditOutlined />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className='px-6 pt-4 pb-6 rounded-lg shadow-md border text-slate-700'>
                                <h4 className='font-semibold !mb-2.5 text-[17px]'>Thông tin thanh toán và vận chuyễn</h4>
                                <p className='text-[15px] font-semibold !mb-2.5'>
                                    Phương thức thanh toán:
                                    <span className='italic inline-block pl-2.5'>{infoOrder.paymentMethod}.</span>
                                </p>
                                <p className='text-[15px] font-semibold !mb-2.5'>
                                    Phương thức vận chuyễn:
                                    <span className='italic inline-block pl-2.5'>{infoOrder.shippingMethod}.</span>
                                </p>
                                <div className='pt-1'>
                                    <Link href={'/order'}>
                                        <a className='btn bg-blue-200 inline-flex items-center gap-x-2 font-semibold'>
                                            Chỉnh sữa
                                            <EditOutlined />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className='px-6 pt-4 pb-6 rounded-lg shadow-md border text-slate-700'>
                                <h4 className='font-semibold !mb-2.5 text-[17px]'>Giỏ hàng của bạn</h4>
                                <table className='min-w-full'>
                                    <thead className='border-b border-gray-200'>
                                        <tr>
                                            <th className='px-5 text-left'>Sản phẩm</th>
                                            <th className='p-5 text-right'>Số lượng</th>
                                            <th className='p-5 text-right'>Giá tiền</th>
                                            <th className='p-5 text-right'>Tổng tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200'>
                                        {
                                            cartItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td className='!py-5'>
                                                        <Link href={`/product/${item.slug}`}>
                                                            <a className='flex items-center gap-x-4 my-4'>
                                                                <Image
                                                                    src={item.imagesProduct[0].url}
                                                                    alt={item.name}
                                                                    width={65}
                                                                    height={65}
                                                                    className='bg-slate-100 rounded-md'
                                                                />
                                                                <div className='flex flex-col'>
                                                                    <p className='text-[16px] font-semibold line-clamp-1 hover:underline hover:underline-offset-4 transition ease-linear duration-300'>{item.name}</p>
                                                                    <p className='text-[11px]'>Color: <span className='font-semibold italic'>{item.selectedColor}</span></p>
                                                                    <p className='text-[11px]'>Size: <span className='font-semibold italic'>{item.selectedSize}</span></p>
                                                                </div>
                                                            </a>
                                                        </Link>
                                                    </td>
                                                    <td className='p-5 text-right font-bold'>
                                                        x{item.quantityItem}
                                                    </td>
                                                    <td className='p-5 text-right text-base font-normal'>
                                                        {new Intl.NumberFormat().format(item.price)}
                                                        <sup className='underline ml-1 mt-1.5'>đ</sup>
                                                    </td>
                                                    <td className='p-5 text-base font-semibold'>
                                                        <p className='flex items-center justify-end'>
                                                            {new Intl.NumberFormat().format(item.price * item.quantityItem)}
                                                            <sup className='underline ml-1 mt-1.5'>đ</sup>
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <div className='pt-1'>
                                    <Link href={'/cart'}>
                                        <a className='btn bg-blue-200 inline-flex items-center gap-x-2 font-semibold'>
                                            Chỉnh sữa
                                            <EditOutlined />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-4'>
                            <div className='px-6 pt-5 pb-6 border rounded-md shadow-md min-h-fit'>
                                <h4 className='font-semibold !mb-2.5 text-[18px]'>Chi tiết hoá đơn</h4>
                                <ul className='space-y-5 text-base font-semibold mt-3'>
                                    <li className='flex items-center justify-between text-slate-700'>
                                        <p>Tạm tính:</p>
                                        <div className='flex items-center italic line-through text-slate-500'>
                                            <p>{new Intl.NumberFormat().format(itemPrice)}</p>
                                            <sup className='underline ml-1 mt-1.5'>đ</sup>
                                        </div>
                                    </li>
                                    <li className='flex items-center justify-between text-slate-700'>
                                        <p>Phí giao hàng:</p>
                                        <div className='flex items-center text-green-500'>
                                            <p>{new Intl.NumberFormat().format(shippingPrice)}</p>
                                            <sup className='underline ml-1 mt-1.5'>đ</sup>
                                        </div>
                                    </li>
                                    <li className='flex items-center justify-between'>
                                        <p className='font-bold text-[17px]'>Tổng tiền:</p>
                                        <div className='flex items-center text-lg font-bold'>
                                            <p>{new Intl.NumberFormat().format(totalPrice)}</p>
                                            <sup className='underline ml-1 mt-1.5'>đ</sup>
                                        </div>
                                    </li>
                                    <li className='!mt-9'>
                                        <button
                                            disabled={loading}
                                            onClick={handlerPlaceOrder}
                                            className='btn w-full bg-green-500 text-white text-lg py-2.5'>
                                            { loading ? (
                                                <SpinLoading/>
                                            ): (
                                                <p>Hoàn tất đơn hàng</p>
                                            )}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            } 
        </div>
    )
}

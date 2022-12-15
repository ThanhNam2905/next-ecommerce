import { DollarCircleFilled, ShoppingOutlined } from '@ant-design/icons';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react'
import { getError } from '../../utils/getError';
import SpinLoading from '../shared/spin-loading';
import { message, notification } from 'antd';

export default function OrderDetailPage() {

    const [{ isPending }, paypalDispatch ] = usePayPalScriptReducer();
    const { query } = useRouter();
    const orderId = query.id;

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_REQUEST': {
                return { ...state, loading: true, error: ''};
            }
            case 'FETCH_SUCCESS': {
                return { ...state, loading: false, order: action.payload, error: ''};
            }
            case 'FETCH_FAIL': {
                return { ...state, loading: false, error: action.payload };
            }
            case 'PAY_REQUEST': {
                return { ...state, loadingPay: true };
            }
            case 'PAY_SUCCESS': {
                return { ...state, loadingPay: false, successPay: true };
            }
            case 'PAY_FAIL': {
                return { ...state, loadingPay: false, errorPay: action.payload };
            }
            case 'PAY_RESET': {
                return { ...state, loadingPay: false, successPay: false, errorPay: '' };
            }
            default:
                return state;
        }
    };

    const [{ loading, error, order, successPay, loadingPay }, dispatch,] = useReducer(reducer, {
        loading: true,
        order: {},
        error: ''
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error)})
            }
        }
        if(!order._id || successPay || (order._id && order._id !== orderId)) {
            fetchOrder();
            if(successPay) {
                dispatch({ type: 'PAY_RESET'})
            }
        }
        else {
            const loadPaypalScript = async () => {
                const { data: clientID } = await axios.get('/api/keys/paypal');
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': clientID,
                        currency: 'USD'
                    }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            };

            loadPaypalScript();
        }
    }, [order, orderId, paypalDispatch, successPay]);

    const {
        shippingAddress, paymentMethod, orderItems, shippingMethod,
        itemsPrice, shippingPrice, totalPrice,
        isPaid, isDelivered, paid_At, delivered_At
    } = order;

    // Feature Payment Paypal
    const createOrderPaypal = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: { value: totalPrice },
                }
            ]
        }).then((orderId) => {
            return orderId;
        })
    };
    const onApprovePaypal = (data, actions) => {
        return actions.order.capture().then(async function (details) {
            try {
                dispatch({ type: 'PAY_REQUEST'});
                const { data } = await axios.put(`/api/orders/${order._id}/pay`, details);
                dispatch({ type: 'PAY_SUCCESS', payload: data });
                notification.success({
                    message: 'Thông báo',
                    description: 'Đơn hàng của bạn đã được thanh toán thành công.'
                });
            } catch (error) {
                dispatch({ type: 'PAY_FAIL', payload: getError(error)});
                message.error({
                    content: getError(error),
                    className: 'customize__antd--message-error'
                });
            }
        })
    }
    
    const onErrorPaypal = (error) => {
        notification.error({
            message: 'Thông báo',
            description: getError(error)
        });
    }

    return (
        <div className='mt-6 mb-16'>
            <h2 className='text-[19px] font-semibold !mb-6'>
                Chi tiết đơn hàng của bạn:
                <span className='!ml-2 text-orange-600 inline-block italic'>DH{orderId.substring(16,24)}</span>
            </h2>

            {
                loading ? (
                    <SpinLoading/>
                ) : error ? (
                    <div className='alert--error'>{error}</div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-12 md:gap-8'>
                        <div className='col-span-8 space-y-9'>
                            <div className='px-6 pt-4 pb-6 rounded-lg shadow-md border text-slate-700'>
                                <h4 className='font-semibold !mb-2.5 text-[17px]'>Thông tin giao hàng</h4>
                                <p className='text-[15px] font-semibold !mb-2.5'>
                                    Họ và tên:
                                    <span className='italic inline-block pl-2.5'>{shippingAddress.username}.</span>
                                </p>
                                <p className='text-[15px] font-semibold !mb-2.5'>
                                    Số điện thoại:
                                    <span className='italic inline-block pl-2.5'>{shippingAddress.numberPhone}.</span>
                                </p>
                                <p className='text-[15px] font-semibold !mb-2.5'>
                                    Địa chỉ giao hàng:
                                    <span className='italic inline-block pl-2.5'>{shippingAddress.addressShip}.</span>
                                </p>
                                {   isDelivered ? (
                                        <div className='alert--success'>
                                            Đã giao hàng 
                                            <span>{delivered_At}</span>
                                        </div>
                                    ) : (
                                        <div className='alert--error'>Chưa giao hàng</div>
                                    )
                                }
                            </div>
                            <div className='px-6 pt-4 pb-6 rounded-lg shadow-md border text-slate-700'>
                                <h4 className='font-semibold !mb-2.5 text-[17px]'>Thông tin thanh toán và vận chuyễn</h4>
                                <p className='text-[15px] font-semibold !mb-2.5'>
                                    Phương thức thanh toán:
                                    <span className='italic inline-block pl-2.5'>{paymentMethod}.</span>
                                </p>
                                <p className='text-[15px] font-semibold !mb-2.5'>
                                    Phương thức vận chuyễn:
                                    <span className='italic inline-block pl-2.5'>{shippingMethod}.</span>
                                </p>
                                {
                                    isPaid ? (
                                        <div className='alert--success'>
                                            Đã thanh toán, ngày
                                            <span className='!ml-2'>{paid_At}</span>
                                        </div>
                                    ) : (
                                        <div className='alert--error'>Chưa thanh toán</div>
                                    )
                                }
                            </div>
                            <div className='px-6 pt-4 pb-6 rounded-lg shadow-md border text-slate-700'>
                                <h4 className='flex items-center gap-x-2 font-semibold !mb-2.5 text-[17px]'>
                                    Giỏ hàng của bạn
                                    <ShoppingOutlined className='!mt-0.5'/>    
                                </h4>
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
                                            orderItems.map(item => (
                                                <tr key={item._id}>
                                                    <td className='!py-5'>
                                                        <Link href={`/product/${item.slug}`}>
                                                            <a className='flex items-center gap-x-4 my-4'>
                                                                <Image
                                                                    src={item.imagesProduct[0].url}
                                                                    alt={item.name}
                                                                    width={60}
                                                                    height={60}
                                                                    className='bg-blue-100'
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
                                                    <td className='p-5 text-right text-base font-semibold'>
                                                        {new Intl.NumberFormat().format(item.price)}
                                                        <sup className='underline ml-1 mt-1.5'>đ</sup>
                                                    </td>
                                                    <td className='p-5 text-base font-bold'>
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
                            </div>
                        </div>
                        <div className='col-span-4'>
                            <div className='px-6 pt-5 pb-6 border rounded-md shadow-md min-h-fit'>
                                <h4 className='font-semibold !mb-2.5 text-[18px] flex items-center gap-x-3'>
                                    Chi tiết hoá đơn
                                    <DollarCircleFilled />
                                </h4>
                                <ul className='space-y-5 text-base font-semibold mt-3'>
                                    <li className='flex items-center justify-between text-slate-700'>
                                        <p>Tạm tính:</p>
                                        <div className='flex items-center italic line-through text-slate-500'>
                                            <p>{new Intl.NumberFormat().format(itemsPrice)}</p>
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
                                    {   !isPaid && (
                                            <li>
                                                {   isPending ? (
                                                        <SpinLoading/>
                                                    ) : (
                                                        <div className='w-full'>
                                                            <PayPalButtons
                                                                createOrder={createOrderPaypal}
                                                                onApprove={onApprovePaypal}
                                                                onError={onErrorPaypal}>

                                                            </PayPalButtons>
                                                        </div>
                                                    )
                                                }
                                                { loadingPay && (<SpinLoading/>) }
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

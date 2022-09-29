import { CheckCircleOutlined, ClockCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Tooltip } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react'
import { getError } from '../../utils/getError';
import SpinLoading from '../shared/spin-loading';


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST': {
            return { ...state, loading: true, error: '' };
        }
        case 'FETCH_SUCCESS': {
            return { ...state, loading: false, orders: action.payload, error: '' };
        }
        case 'FETCH_FAIL': {
            return { ...state, loading: false, error: action.payload };
        }
        default:
            return state;
    }
}

export default function OrderHistoryPage() {

    const [{ loading, orders, error }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: ''
    })

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get('/api/orders/history');
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className='mt-6 mb-16'>
            <h2 className='!py-3 text-[20px] !mb-2'>Lịch sử đơn hàng của bạn</h2>
            {
                loading ? (
                    <SpinLoading />
                ) : error ? (
                    <div className='alert--error'>{error}</div>
                ) : (
                    <div className='overflow-x-auto'>
                        <table className='min-w-full text-[16px]'>
                            <thead className='border-b border-gray-300 h-14 bg-gray-100 divide-x'>
                                <th className='px-5 text-left font-semibold'>STT</th>
                                <th className='px-5 text-left font-semibold'>Mã ĐH</th>
                                <th className='px-5 text-left font-semibold'>Ngày đặt hàng</th>
                                <th className='px-5 text-left font-semibold'>Tổng tiền</th>
                                <th className='px-5 text-left font-semibold'>Trạng thái Thanh toán</th>
                                <th className='px-5 text-left font-semibold'>Trạng thái Giao hàng</th>
                                <th className='px-5 text-right font-semibold'>Hành động</th>
                            </thead>
                            <tbody className=''>
                                {
                                    orders.map((order, index) => (
                                        <tr key={order._id} className='border-b h-20 border-gray-300 text-gray-700 last:border-b-0'>
                                            <td className='px-5'>{index + 1}</td>
                                            <td className='px-5 font-semibold'>{order._id.substring(18, 24)}</td>
                                            <td className='px-5 font-semibold'>{order.createdAt.substring(0, 10)}</td>
                                            <td className='px-5 text-red-600'>
                                                <div className='flex items-center font-semibold'>
                                                    <p>{new Intl.NumberFormat().format(order.totalPrice)}</p>
                                                    <sup className='underline ml-1 mt-1.5'>đ</sup>
                                                </div>

                                            </td>

                                            <td className='px-5'>
                                                {order.isPaid ? (
                                                    <div>
                                                        <Tag color="green"
                                                            icon={<CheckCircleOutlined />}
                                                            className='!inline-flex !items-center !py-1.5 !px-2 !text-[14px] !gap-x-1.5'>
                                                            Đã thanh toán
                                                        </Tag>
                                                        <span className='px-2'>,</span>
                                                        <Tag icon={<ClockCircleOutlined />} color="default"
                                                            className='!inline-flex !items-center  !gap-x-1.5'>
                                                            {order.paid_At.substring(0, 10)}
                                                        </Tag>

                                                    </div>
                                                ) : (
                                                    <Tag color="error" className='!py-1.5 !px-2.5 !text-[14px]'>Chưa thanh toán</Tag>
                                                )
                                                }
                                            </td>
                                            <td className='px-5'>
                                                {order.isDelivered ? (
                                                    <div>
                                                        <Tag color="green" icon={<CheckCircleOutlined />} className='!inline-flex !items-center !py-1.5 !px-2 !text-[14px] !gap-x-1.5'>Đã giao hàng</Tag>
                                                        <span className='pl-3 italic text-sm'>, {order.delivered_At.substring(0, 10)}</span>
                                                    </div>
                                                ) : (
                                                    <Tag color="warning" className='!py-1.5 !px-2.5 !text-[14px]'>Đang giao hàng</Tag>
                                                )
                                                }
                                            </td>
                                            <td className='px-5 text-right'>
                                                <Link href={`/order/${order._id}`} passHref>
                                                    <a className='flex items-center justify-center'>
                                                        <Tooltip title="Xem Chi Tiết" color='geekblue'>
                                                            <Button>
                                                                <EllipsisOutlined />
                                                            </Button>
                                                        </Tooltip>
                                                        
                                                    </a>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )

            }
        </div>
    )
}

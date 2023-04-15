import { CheckCircleOutlined, ClockCircleOutlined, DollarCircleFilled, EditOutlined, ExclamationCircleOutlined, Loading3QuartersOutlined, LoadingOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Button, Drawer, message, notification, Table, Tag } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useReducer, useState } from 'react'
import { getError } from '../../../utils/getError';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'DELIVER_REQUEST': 
            return { ...state, loadingDeliver: true };
        case 'DELIVER_SUCCESS':
            return { ...state, loadingDeliver: false, successDeliver: true };
        case 'DELIVER_FAIL':
            return { ...state, loadingDeliver: false };
        case 'DELIVER_RESET':
            return {
                ...state, 
                loadingDeliver: false,
                successDeliver: false,
                errorDeliver: ''
            };
        default:
            return state;
    }
}

export default function AdminOrdersPage() {

    const [{ loading, error, orders, loadingDeliver, successDeliver }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/admin/orders`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
            }
        };
        if(successDeliver) {
            fetchData();
            dispatch({ type: 'DELIVER_RESET' });
        }
        fetchData();
    }, [successDeliver]);

    // const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [indexOrder, setIndexOrder] = useState(null);
    const showDrawer = (key) => {
        setVisible(true);
        setIndexOrder(key);
    };

    const onClose = () => {
        setVisible(false);
        setIndexOrder(null);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: "stt",
            key: 'stt',
            align: 'center',
            width: 35,
            render: (text) => <p className="text-center">{text + 1}</p>
        },
        {
            title: 'ID ĐH',
            dataIndex: 'idOrder',
            key: 'idOrder',
            align: 'center',
            render: (text) => <p className="text-center font-semibold">DH{text.substring(16, 24)}</p>
        },
        {
            title: 'Tên Tài Khoản',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            render: (text) => <p className="text-center text-red-500">{text}</p>
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (text) => <Tag
                className='!inline-flex !items-center gap-x-1.5'
                icon={<ClockCircleOutlined />}
                color="blue">{text.substring(0, 10)}
            </Tag>
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center',
            render: (text) => <p className="text-center text-red-600 font-semibold whitespace-nowrap">
                {new Intl.NumberFormat().format(text)}
                <sup className='ml-0.5 !mt-1 inline-block'>đ</sup>
            </p>
        },
        {
            title: 'Trạng thái Thanh toán',
            dataIndex: 'isPaid',
            key: 'isPaid',
            align: 'center',
            render: (text) => <Tag
                className='!inline-flex !items-center gap-x-1.5'
                icon={text ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
                color={text ? 'success' : 'warning'}>{text ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </Tag>
        },
        {
            title: 'Trạng thái Giao hàng',
            dataIndex: 'isDelivered',
            key: 'isDelivered',
            align: 'center',
            render: (text) => <Tag
                className='!inline-flex !items-center gap-x-1.5'
                icon={text ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
                color={text ? 'success' : 'warning'}>{text ? 'Đã giao hàng' : 'Đang giao hàng'}
            </Tag>
        },
        {
            title: 'Hành động',
            dataIndex: 'detailOrder',
            key: 'detailOrder',
            render: (itemOrder) => (
                <>
                    <Button type="primary" onClick={() => showDrawer(itemOrder._id)}>Details</Button>
                    <Drawer
                        title={(<p className='pt-0.5 text-lg'>Chi tiết đơn hàng</p>)}
                        placement="right"
                        className='antd__drawer-custom'
                        zIndex={10}
                        onClose={onClose}
                        open={itemOrder._id === indexOrder ? visible : null}>
                        <div className='w-full !my-4'>
                            <div className='grid grid-cols-1 md:grid-cols-12 md:gap-8'>
                                <div className='col-span-8 space-y-7'>
                                    <div className='px-5 pt-4 pb-4 rounded-lg shadow-md border text-slate-700'>
                                        <h4 className='font-semibold !mb-2 text-[17px]'>Thông tin giao hàng</h4>
                                        <p className='text-[14px] !mb-2'>
                                            Email tài khoản:
                                            <span className='italic inline-block pl-2.5 font-semibold'>{itemOrder.user.email}.</span>
                                        </p>
                                        <p className='text-[14px] !mb-2'>
                                            Họ và tên:
                                            <span className='italic inline-block pl-2.5 font-semibold'>{itemOrder.shippingAddress.username}.</span>
                                        </p>
                                        <p className='text-[14px] !mb-2'>
                                            Số điện thoại:
                                            <span className='italic inline-block pl-2.5 font-semibold'>{itemOrder.shippingAddress.numberPhone}.</span>
                                        </p>
                                        <p className='text-[14px] !mb-2'>
                                            Địa chỉ giao hàng:
                                            <span className='italic inline-block pl-2.5 font-semibold'>{itemOrder.shippingAddress.addressShip}.</span>
                                        </p>
                                        {itemOrder.isDelivered ? (
                                            <div className='alert--success text-[14px] my-1.5 py-2'>
                                                Đã giao hàng
                                                <span>, ngày {itemOrder.delivered_At}</span>
                                            </div>
                                        ) : (
                                            <div className='alert--error text-[14px] my-1.5 py-2'>Đang giao hàng</div>
                                        )
                                        }
                                    </div>
                                    <div className='px-5 pt-4 pb-4 rounded-lg shadow-md border text-slate-700'>
                                        <h4 className='font-semibold !mb-2 text-[17px]'>Thông tin thanh toán và vận chuyễn</h4>
                                        <p className='text-[14px] !mb-2'>
                                            Phương thức thanh toán:
                                            <span className='italic inline-block pl-2.5 font-semibold'>{itemOrder.paymentMethod}.</span>
                                        </p>
                                        <p className='text-[14px] !mb-2'>
                                            Phương thức vận chuyễn:
                                            <span className='italic inline-block pl-2.5 font-semibold'>{itemOrder.shippingMethod}.</span>
                                        </p>
                                        {
                                            itemOrder.isPaid ? (
                                                <div className='alert--success text-[14px] my-1.5 py-2'>
                                                    Đã thanh toán, ngày
                                                    <span className='!ml-2'>{itemOrder.paid_At}</span>
                                                </div>
                                            ) : (
                                                <div className='alert--error text-[14px] my-1.5 py-2'>Chưa thanh toán</div>
                                            )
                                        }
                                    </div>
                                    <div className='px-5 pt-4 pb-4 rounded-lg shadow-md border text-slate-700'>
                                        <h4 className='font-semibold !mb-2 text-[17px]'>Giỏ hàng của bạn</h4>
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
                                                    itemOrder.orderItems.map(item => (
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
                                    <div className='px-6 py-5 border rounded-md shadow-md min-h-fit'>
                                        <h4 className='font-semibold !mb-2 text-[17px] flex items-center gap-x-3'>
                                            Chi tiết hoá đơn
                                            <DollarCircleFilled />
                                        </h4>
                                        <ul className='space-y-5 text-base font-semibold mt-3'>
                                            <li className='flex items-center justify-between text-slate-700'>
                                                <p>Tạm tính:</p>
                                                <div className='flex items-center italic line-through text-slate-500'>
                                                    <p>{new Intl.NumberFormat().format(itemOrder.itemsPrice)}</p>
                                                    <sup className='underline ml-1 mt-1.5'>đ</sup>
                                                </div>
                                            </li>
                                            <li className='flex items-center justify-between text-slate-700'>
                                                <p>Phí giao hàng:</p>
                                                <div className='flex items-center text-green-500'>
                                                    <p>{new Intl.NumberFormat().format(itemOrder.shippingPrice)}</p>
                                                    <sup className='underline ml-1 mt-1.5'>đ</sup>
                                                </div>
                                            </li>
                                            <li className='flex items-center justify-between'>
                                                <p className='font-bold text-[17px]'>Tổng tiền:</p>
                                                <div className='flex items-center text-lg font-bold'>
                                                    <p>{new Intl.NumberFormat().format(itemOrder.totalPrice)}</p>
                                                    <sup className='underline ml-1 mt-1.5'>đ</sup>
                                                </div>
                                            </li>
                                            {
                                                itemOrder.isPaid && !itemOrder.isDelivered && (
                                                    <li className='!mt-10'>
                                                        
                                                        <button
                                                            className='btn btn__primary--index w-full flex items-center justify-center gap-x-1.5'
                                                            onClick={() => deliverOrderHandler(itemOrder._id)}>
                                                                {   loadingDeliver ? (
                                                                        <>
                                                                            Loading...
                                                                            <LoadingOutlined/>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <EditOutlined />
                                                                            Giao hàng
                                                                        </>
                                                                    )
                                                                }    
                                                        </button>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Drawer>
                </>
            ),
        },
    ];

    const dataList = [];
    for (let item = 0; item < orders.length; item++) {
        dataList.push({
            stt: item,
            idOrder: orders[item]._id,
            username: orders[item].user.name,
            emailUser: orders[item].user.email,
            orderItems: orders[item].orderItems,
            createdAt: orders[item].createdAt,
            totalPrice: orders[item].totalPrice,
            isPaid: orders[item].isPaid,
            isDelivered: orders[item].isDelivered,
            detailOrder: orders[item],
        })
    }
    // console.log(orders);

    const deliverOrderHandler = async(idOrder) => {
        try {
            dispatch({ type: 'DELIVER_REQUEST' });
            const { data } = await axios.put(`/api/admin/orders/${idOrder}/deliver`, {});
            dispatch({ type: 'DELIVER_SUCCESS', payload: data });
            notification.success({
                message: 'Thông báo',
                description: "Trạng thái giao hàng của đơn hàng được cập nhật thành công"
            });
        } catch (error) {
            dispatch({ type: 'DELIVER_FAIL', payload: getError(error) });
            message.error({
                content: getError(error),
                className: 'customize__antd--message-error'
            })
        }
    }

    return (
        <>
            <h2 className='text-[19px] flex items-center justify-center gap-x-2 !mt-2 !mb-4'>
                <ShoppingOutlined />
                Danh sách Đơn Hàng
            </h2>
            {
                loading ? (
                    <div className='w-full h-screen flex items-center justify-center bg-gray-50'>
                        <h3 className='text-3xl text-gray-600 font-semibold shadow-lg inline-flex items-center gap-x-2.5'>
                            <Loading3QuartersOutlined className='text-[38px] animate-spin' /> Đang tải...
                        </h3>
                    </div>
                ) : error ? (
                    <div className='alert--error'>{error}</div>
                ) : (
                    <Table 
                        columns={columns} 
                        dataSource={dataList} 
                        bordered />
                )
            }
        </>
    )
}

import { AreaChartOutlined, LoadingOutlined } from '@ant-design/icons'
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useReducer } from 'react'
import { getError } from '../../utils/getError';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Setting Chartjs
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',

        }
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, summary: action.payload, error: '' };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}


export default function AdminDashboardPage() {

    const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
        loading: true,
        summary: { salesData: [] },
        error: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });

                const { data } = await axios.get('/api/admin/summary');
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
            }
        }
        fetchData();
    }, []);

    const data = {
        labels: summary.salesData.map((x) => x._id), // 2022/09 2022/10
        datasets: [
            {
                label: 'Sales',
                backgroundColor: 'rgba(162, 222, 208, 1)',
                data: summary.salesData.map((x) => x.totalSales),
            }
        ]
    }

    return (
        <div>
            {
                loading ? (
                    <div className='w-full h-screen flex items-center justify-center bg-gray-50'>
                        <h3 className='text-3xl text-gray-600 font-semibold shadow-lg inline-flex items-center gap-x-2.5'>
                            <LoadingOutlined /> Loading...
                        </h3>
                    </div>
                ) : error ? (
                    <div className='alert--error'>{error}</div>
                ) : (
                    <div className='mt-10'>
                        <div className='grid grid-cols-1 md:grid-cols-4 md:gap-6'>
                            <div className='p-6 border-2 border-blue-300 bg-blue-100 rounded-md'>
                                <p className='text-2xl'>
                                    {new Intl.NumberFormat().format(summary.ordersPriceTotal)}
                                    <span className='text-lg text-gray-600 italic inline-block !ml-3'>VNĐ</span>
                                </p>
                                <p className='font-semibold !my-1'>Tổng thu nhập</p>
                                <Link href='/admin/orders'>
                                    <a className='font-semibold !underline underline-offset-4 !decoration-2 !text-blue-600'>View Sales</a>
                                </Link>
                            </div>
                            <div className='p-6 border-2 border-red-300 bg-red-100 rounded-md'>
                                <p className='text-2xl'>
                                    {summary.ordersCount}
                                    <span className='text-lg text-gray-600 italic inline-block !ml-3'>đơn hàng</span>
                                </p>
                                <p className='font-semibold !my-1'>Tổng đơn hàng</p>
                                <Link href='/admin/orders'>
                                    <a className='font-semibold !underline underline-offset-4 !decoration-2 !text-blue-600'>View Orders</a>
                                </Link>
                            </div>
                            <div className='p-6 border-2 border-green-300 bg-green-100 rounded-md'>
                                <p className='text-2xl'>
                                    {summary.productsCount}
                                    <span className='text-lg text-gray-600 italic inline-block !ml-3'>sản phẩm</span>
                                </p>
                                <p className='font-semibold !my-1'>Số lượng sản phẩm</p>
                                <Link href='/admin/products'>
                                    <a className='font-semibold !underline underline-offset-4 !decoration-2 !text-blue-600'>View Products</a>
                                </Link>
                            </div>
                            <div className='p-6 border-2 border-orange-300 bg-orange-100 rounded-md'>
                                <p className='text-2xl'>{summary.usersCount} thành viên</p>
                                <p className='font-semibold !my-1'>Số lượng thành viên</p>
                                <Link href='/admin/users'>
                                    <a className='font-semibold !underline underline-offset-4 !decoration-2 !text-blue-600'>View Users</a>
                                </Link>
                            </div>
                        </div>
                        <div className='mt-14 mb-6'>
                            <h2 className='capitalize text-xl font-semibold !mb-3 inline-flex items-center gap-x-3'>
                                <AreaChartOutlined className='text-2xl'/>
                                Biểu đồ báo cáo doanh số bán hàng
                            </h2>
                            <Bar
                                options={{
                                    legend: {
                                        display: true, position: 'right',
                                    }
                                }}
                                data={data}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

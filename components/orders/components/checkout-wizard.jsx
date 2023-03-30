import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router';

export default function CheckoutWizard({ activeStepOrder = 0 }) {

    const stepOrders = [
        { name: 'Đăng nhập' },
        { name: 'Địa chỉ giao hàng' },
        { name: 'Thanh toán đơn hàng' },
    ];

    const router = useRouter();

    return (
        <div className='w-full relative'>
            <div className='group absolute left-0 top-[20px] flex items-center gap-x-3 text-[15px] font-bold'>
                <ArrowLeftOutlined className='text-xl group-hover:cursor-pointer'/>
                <p 
                    className='group-hover:underline group-hover:cursor-pointer group-hover:underline-offset-4 group-hover:decoration-2'
                    onClick={() => router.push('/cart')}>Quay lại giỏ hàng</p>
            </div>
            <div className='flex relative w-full  max-w-2xl mb-9 mt-2 mx-auto items-center justify-center'>
                <div className={`absolute left-1/2 top-1/4 transform -translate-x-1/2 w-[63%] h-[4px] bg-[#b7b7b7]`}></div>
                {
                    stepOrders.map((item, index) => (
                        <div
                            key={index}
                            className='relative flex-col flex-1 text-center text-lg flex items-center justify-center'>
                            <p className={`text-[15px] font-semibold w-9 h-9 flex items-center justify-center text-white rounded-full ${index <= activeStepOrder ? 'bg-green-500' : 'bg-[#b7b7b7]'}`}>{index + 1}</p>
                            <p className={`!pt-2 text-[14px] font-bold ${index <= activeStepOrder ? 'text-gray-900' : 'text-[#b7b7b7]'}`}>{item.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

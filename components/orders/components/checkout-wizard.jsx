import React from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'

export default function CheckoutWizard({ activeStepOrder = 0 }) {

    const stepOrders = [
        { name: 'Đăng nhập tài khoản' },
        { name: 'Địa chỉ giao hàng và Phương thức thanh toán' },
        { name: 'Hoàn tất đơn hàng' },
    ];

    return (
        <div className='flex flex-wrap mb-5'>
            {
                stepOrders.map((item, index) => (
                    <div
                        key={index}
                        className={`flex-1 border-b-[5px] text-center pb-1.5 text-lg flex items-center justify-center gap-x-1.5
                            ${index <= activeStepOrder
                                ? ' border-green-500 text-green-500'
                                : ' border-gray-300 text-gray-700'
                            } 
                        `}>
                        {index <= activeStepOrder ? <CheckCircleOutlined className='text-green-500' /> : ''}
                        {item.name}
                    </div>
                ))
            }
        </div>  
    )
}

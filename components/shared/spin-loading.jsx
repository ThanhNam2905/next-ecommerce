import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd'
import React from 'react'

export default function SpinLoading() {

    const antIcon = (
        <LoadingOutlined
          className='text-lg text-blue-600'
          spin
        />
    );

    return (
        <div className='text-lg flex items-center justify-center gap-x-2.5'>
            <p className='text-lg font-semibold text-blue-500'>Loading...</p>
            <Spin indicator={antIcon} />
        </div>
    )
}

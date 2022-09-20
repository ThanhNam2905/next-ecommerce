import { useRouter } from 'next/router';
import React from 'react'
import DefaultLayout from '../components/layouts/index/Default-layout';
import { ExclamationCircleOutlined } from '@ant-design/icons'

export default function Unauthorized() {

    const router = useRouter();
    const { message } = router.query;

    return (
        <DefaultLayout title='Unthorized Page'>
            <div className='my-8 text-center'>
                <h1 className='text-2xl font-nunito flex items-center justify-center gap-x-4'>
                    Quyền truy cập của bạn bị từ chối
                    <ExclamationCircleOutlined />   
                </h1>
                {
                    message && (
                        <div className='mt-4 text-red-500'>
                            {message}
                        </div>
                    )
                }
            </div>
        </DefaultLayout>
    )
}

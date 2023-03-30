import React from 'react'
import { CaretRightOutlined } from '@ant-design/icons';
import Image from 'next/image';

function Footer() {
    return (
        <footer className='container mx-auto mt-6'>
            <div className='bg-gray-200 flex justify-center items-center py-7 gap-x-8'>
                <h4 className='uppercase text-[17px]'>Đăng ký nhận tin</h4>
                <form action="">
                    <input
                        type="email" name="" id="" placeholder='Email của bạn'
                        className='py-2.5 px-5 w-96 placeholder:text-gray-500 focus:outline-none rounded-tl-full rounded-bl-full' />
                    <input type="submit" value="Đăng ký" className='cursor-pointer uppercase font-semibold rounded-tr-full rounded-br-full btn btn--primary transition ease-in-out duration-300' />
                </form>
            </div>
            <div className='px-20 grid grid-cols-4 py-8'>
                <div className='grid-cols-1'>
                    <h3 className='text-xl font-semibold capitalize'>Giới thiệu</h3>
                    <ul className='text-[14px] capitalize mt-4 space-y-4'>
                        <li>
                            <a href="#" className='flex items-center gap-x-1.5'>
                                <CaretRightOutlined />
                                Về Amazona
                            </a>
                        </li>
                        <li>
                            <a href="#" className='flex items-center gap-x-1.5'>
                                <CaretRightOutlined />
                                Danh sách cửa hàng
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='grid-cols-1'>
                    <h3 className='text-xl font-semibold capitalize'>Thông tin</h3>
                    <ul className='text-[14px] capitalize mt-4 space-y-4'>
                        <li>
                            <a href="#" className='flex items-center gap-x-1.5'>
                                <CaretRightOutlined />
                                Chính sách và qui định 
                            </a>
                        </li>
                        <li>
                            <a href="#" className='flex items-center gap-x-1.5'>
                                <CaretRightOutlined />
                                Hình thức thanh toán
                            </a>
                        </li>
                        <li>
                            <a href="#" className='flex items-center gap-x-1.5'>
                                <CaretRightOutlined />
                                Chính sách giao hàng, vận chuyễn
                            </a>
                        </li>
                        <li>
                            <a href="#" className='flex items-center gap-x-1.5'>
                                <CaretRightOutlined />
                                Chính sách bảo hàng, đổi trả
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='grid-cols-1'>
                    <h3 className='text-xl font-semibold capitalize'>Tài khoản</h3>
                    <ul className='text-[14px] capitalize mt-4 space-y-4'>
                        <li>
                            <a href="#" className='flex items-center gap-x-1.5'>
                                <CaretRightOutlined />
                                Hồ sơ tài khoản
                            </a>
                        </li>
                        <li>
                            <a href="#" className='flex items-center gap-x-1.5'>
                                <CaretRightOutlined />
                                Lịch sử mua hàng
                            </a>
                        </li>
                        <li>
                            <a href="#" className='flex items-center gap-x-1.5'>
                                <CaretRightOutlined />
                                Phương thức thanh toán
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='grid-cols-1'>
                    <h3 className='text-xl font-semibold capitalize'>Hổ trợ thanh toán</h3>
                    <div className='my-4 flex items-center gap-x-4'>
                        <Image src={'https://res.cloudinary.com/nam290596/image/upload/v1664464658/next-store-fashion/paypal-logo-C83095A82C-seeklogo.com_fsf6ae_yxfqyx.png'}
                            alt='Paypal logo payment'
                            width={40}
                            height={40}/>
                        <Image src={'https://res.cloudinary.com/nam290596/image/upload/v1664465232/next-store-fashion/shipcode_kmlng6_iuiq3h.jpg'}
                            alt='Shipcode logo payment'
                            width={110}
                            height={40}/>
                    </div>
                    <h3 className='text-xl font-semibold capitalize'>Theo dõi chúng tôi</h3>
                    <ul className='mt-4 flex items-center gap-x-4'>
                        <li>
                            <a href="#" title='Facebook'>
                                <Image src={'https://res.cloudinary.com/nam290596/image/upload/v1664465254/next-store-fashion/768px-Facebook_Logo__282019_29_vaw53q_ot2uvg.png'}
                                    alt='Facebook Logo'
                                    width={45}
                                    height={45}/>
                            </a>
                        </li>
                        <li>
                            <a href="#" title='Instagram'>
                                <Image src={'https://res.cloudinary.com/nam290596/image/upload/v1664465267/next-store-fashion/174855_t10u7n_ekp5mg.png'}
                                    alt='Instagram Logo'
                                    width={43}
                                    height={43}/>
                            </a>
                        </li>
                        <li>
                            <a href="#" title='Shopee'>
                                <Image src={'https://res.cloudinary.com/nam290596/image/upload/v1664465288/next-store-fashion/shopee-circle-logo-design-shopping-bag-13_unirqr_kgx8f4.png'}
                                    alt='Shopee Logo'
                                    width={45}
                                    height={45}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <p className='text-center py-4 border-t'>Copyright © 2022 Amazona</p>
        </footer>
    )
}

export default Footer
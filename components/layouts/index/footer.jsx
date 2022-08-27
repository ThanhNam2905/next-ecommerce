import React from 'react'
import { CaretRightOutlined } from '@ant-design/icons';

function Footer() {
    return (
        <footer className='container mx-auto mt-6'>
            <div className='bg-gray-200 flex justify-center items-center py-7 gap-x-8'>
                <h4 className='uppercase text-[17px]'>Đăng ký nhận tin</h4>
                <form action="">
                    <input
                        type="email" name="" id="" placeholder='Email của bạn'
                        className='py-2.5 px-5 w-96 placeholder:text-gray-500 focus:outline-none rounded-tl-full rounded-bl-full' />
                    <input type="submit" value="Đăng ký" className='cursor-pointer uppercase font-semibold rounded-tr-full rounded-br-full py-2.5 px-5 bg-yellow-500 hover:bg-yellow-400 text-white transition ease-in-out duration-300' />
                </form>
            </div>
            <div className='px-36 grid grid-cols-4 py-8'>
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
                    <div className='my-2'>
                        <img src="./images/logopayment.jpg" alt="Payment method" />
                    </div>
                    <h3 className='text-xl font-semibold capitalize'>Theo dõi chúng tôi</h3>
                    <ul className='mt-4 flex items-center gap-x-2.5'>
                        <li>
                            <a href="#" title='Facebook'>
                                <img src="./images/icons/icon-facebook.png" alt="facebook Img" />
                            </a>
                        </li>
                        <li>
                            <a href="#" title='Instagram'>
                                <img src="./images/icons/icon-instagram.png" alt="instagram Img" />
                            </a>
                        </li>
                        <li>
                            <a href="#" title='Shopee'>
                                <img src="./images/icons/icon-shopee.png" alt="shopee Img" />
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
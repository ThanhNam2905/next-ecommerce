import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { UserOutlined, ShoppingCartOutlined, DownOutlined, LogoutOutlined, IdcardOutlined, LoadingOutlined, ShoppingOutlined } from '@ant-design/icons';
import { StoreContext } from '../../../store/Store';
import { signOut, useSession } from 'next-auth/react';
import { Dropdown, Menu, message, Space, Spin } from 'antd';
import DropDownItem from '../../shared/dropdown-item';
import Cookies from 'js-cookie'

function Header() {

    const { state, dispatch } = useContext(StoreContext);
    const { cart } = state;
    const [cartItemCount, setCartItemCount] = useState(0);
    const { status, data: session } = useSession();

    useEffect(() => {
        setCartItemCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    // Handler Event when User Logout.
    const handleLogout = () => {
        signOut({ callbackUrl: '/login'});
        Cookies.remove('cart');     // remove cart in Cookies.
        dispatch({ type: 'CLEAR_CART_ITEMS' })     // reset objects in cart(cartItems, shippingAddress, paymentMethod) in Store.js
        message.success({
            content: 'Bạn đã đăng xuất thành công',
            className: 'customize__antd--message-success'
        })
    }

    const menu = (
        <Menu
            className='dropdown-profile-user'
            items={[
                {
                    label: 
                        <DropDownItem href="/profile-user" className='dropdown-link'>
                            <IdcardOutlined />
                            Hồ sơ cá nhân
                        </DropDownItem>,
                    key: '0',
                },
                {
                    label: 
                        <DropDownItem href="/order-history" className='dropdown-link'>
                            <ShoppingOutlined />
                            Đơn hàng của tôi
                        </DropDownItem>,
                    key: '1',
                },
                {
                    type: 'divider',
                },
                {
                    label: 
                        <a 
                            className='dropdown-link'
                            href='#'
                            onClick={handleLogout}>
                            <LogoutOutlined />
                            <span>Đăng xuất</span>
                        </a>,
                    key: '3',
                },
            ]}
        />
    );

    const antIcon = (
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
          spin
        />
    );

    return (
        <header>
            <div className='flex items-center justify-between h-16 px-36 shadow-md'>
                <div className="logo">
                    <Link href="/">
                        <a className="text-lg font-bold">amazona</a>
                    </Link>
                </div>
                <nav className='flex items-center gap-x-7'>
                    <div>

                        {
                            status === 'loading' ? (<Spin indicator={antIcon} />) :
                                session?.user ? (
                                    <Dropdown 
                                        overlay={menu} 
                                        trigger={['click']} 
                                        placement="topLeft">
                                        <a 
                                            className='group flex items-center gap-x-4' 
                                            onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <span className='text-lg group-hover:!text-amber-500 transition ease-linear duration-300 '>{session.user.name}</span>
                                                <DownOutlined className='text-sm group-hover:text-amber-500 transition ease-linear duration-300 inline-block !mb-1.5'/>
                                            </Space>
                                        </a>
                                    </Dropdown>
                                ) : (
                                        <Link href='/login'>
                                            <a className="flex items-center gap-x-1.5 group" title='Đăng nhập'>
                                                <UserOutlined className='text-lg -mt-1 mr-1 group-hover:text-amber-500 transition ease-linear duration-300' />
                                                <span className='text-lg group-hover:text-amber-500 transition ease-linear duration-300'>Đăng nhập</span>
                                            </a>
                                        </Link>
                                    )
                        }

                    </div>
                    <div>
                        <Link href="/cart">
                            <a className="flex items-center group relative" title='Giỏ hàng'>
                                <ShoppingCartOutlined className=" text-2xl -mt-1 mr-1 group-hover:text-amber-500 transition ease-linear duration-300" />
                                {cartItemCount > 0 && (
                                    <span className='absolute -top-3 -right-3 rounded-full bg-red-500 text-white w-[22px] h-[22px] flex items-center justify-center text-sm font-semibold'>
                                        {cartItemCount}
                                    </span>
                                )}
                            </a>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
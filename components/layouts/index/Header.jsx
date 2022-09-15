import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { UserOutlined, ShoppingCartOutlined, DownOutlined, LogoutOutlined, UnorderedListOutlined, IdcardOutlined } from '@ant-design/icons';
import { StoreContext } from '../../../store/Store';
import { signOut, useSession } from 'next-auth/react';
import { Dropdown, Menu, Space } from 'antd';
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
        dispatch({ type: 'RESET_CART' })     // reset objects in cart(cartItems, shippingAddress, paymentMethod) in Store.js
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
                        <DropDownItem href="/profile-user" className='dropdown-link'>
                            <UnorderedListOutlined />
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
                            status === 'loading' ? ('Loading...') :
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
                                            <a className="flex items-center group" title='Đăng nhập'>
                                                <UserOutlined className='text-lg -mt-1 mr-1 group-hover:text-amber-500 transition ease-linear duration-300' />
                                                <span className='text-lg group-hover:text-amber-500 transition ease-linear duration-300'>Login</span>
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
                                    <span className='absolute -top-2 -right-2 rounded-full bg-red-500 text-white px-2 py-0.5 text-sm font-semibold'>
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
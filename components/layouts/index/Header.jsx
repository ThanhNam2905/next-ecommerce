import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { StoreContext } from '../../../store/Store';

function Header() {

    const { state } = useContext(StoreContext);
    const { cart } = state;

    const [cartItemCount, setCartItemCount] = useState(0);
    useEffect(() => {
        setCartItemCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

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
                        <Link href="/login">
                            <a className="flex items-center group" title='Đăng nhập'>
                                <UserOutlined className='text-lg -mt-1 mr-1 group-hover:text-amber-500 transition ease-linear duration-300'/>
                                <span className='text-lg group-hover:text-amber-500 transition ease-linear duration-300'>Login</span>
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/cart">
                            <a className="flex items-center group relative" title='Giỏ hàng'>
                                <ShoppingCartOutlined className=" text-2xl -mt-1 mr-1 group-hover:text-amber-500 transition ease-linear duration-300" />  
                                {  cartItemCount > 0 && (
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
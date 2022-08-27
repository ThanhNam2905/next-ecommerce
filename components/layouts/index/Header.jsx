import React from 'react';
import Link from 'next/link';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

function Header() {
    return (
        <header>
            <div className='flex items-center justify-between h-16 px-36 shadow-md'>
                <div className="logo">
                    <Link href="/">
                        <a className="text-lg font-bold">amazona</a>
                    </Link>
                </div>
                <nav className='flex items-center'>
                    <div>
                        <Link href="/login">
                            <a className="flex items-center">
                                <UserOutlined />
                                Login
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/cart">
                            <a className="flex items-center">
                                <ShoppingCartOutlined className="" />
                                Cart
                            </a>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
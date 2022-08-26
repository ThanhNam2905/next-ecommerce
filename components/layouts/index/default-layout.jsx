import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Footer from './footer';

function DefaultLayout({ title, children }) {
    return (
        <>
            <Head>
                <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col min-h-screen justify-between">
                <header>
                    <div className='flex items-center justify-between h-16 px-16 shadow-md'>
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
                                        <ShoppingCartOutlined className=""/>
                                        Cart
                                    </a>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </header>
                <main className='container m-auto mt-6 px-16'>{children}</main>

                <Footer/>
            </div>
        </>
    );
}

export default DefaultLayout;

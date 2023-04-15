import { Collapse } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';

const HomeSVGIcon = (activeSideBar) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-[20px] h-[20px] ${activeSideBar ? ' !stroke-gray-700': ' !stroke-white'} `}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
    </svg>
);
const ProductSVGIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-[20px] h-[20px] stroke-gray-700 group-hover:stroke-[#6259ca]"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
    </svg>
);
const OrderSVGIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-[21px] h-[21px] text-gray-700 group-hover:stroke-[#6259ca]"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
        />
    </svg>
);
const CategorySVGIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[21px] h-[21px] text-gray-700 group-hover:text-[#6259ca]"
    >
        <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
        />
    </svg>
);
const RightSVGIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-[15px] h-[15px] mt-0.5 stroke-gray-500"
    >
        <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clipRule="evenodd"
        />
    </svg>
);
const UserSVGIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-[21px] h-[21px] text-gray-700 group-hover:text-[#6259ca]"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
    </svg>
);

export default function SidebarAdmin({ activeSideBar }) {
    const { Panel } = Collapse;
    const router = useRouter();

    return (
        <div>
            <div className="h-20 flex items-center justify-center border-r border-b">
                <Link href="/admin/dashboard" passHref legacyBehavior>
                    <a className="flex items-center gap-x-1">
                        <Image
                            src="https://res.cloudinary.com/nam290596/image/upload/v1680242541/next-store-fashion/admin-roles_wm9lh7.png"
                            alt="admin dashboard Image"
                            width={40}
                            height={40}
                            className="cursor-pointer object-contain "
                        />
                        <h1 className="text-black text-xl">{activeSideBar ? '': 'Dashboard'}</h1>
                    </a>
                </Link>
            </div>
            <div className="siderbar-admin__content py-4 border-r pr-5">
                <div>
                    <h3 className="text-[14px] !mb-2 text-gray-500/80 px-6">
                        {activeSideBar ? '': 'Main'}
                    </h3>
                    <Link href="/admin/dashboard">
                        <a
                            className={`header__collapse--customize group ${
                                router.pathname === '/admin/dashboard'
                                    ? ' active'
                                    : ''
                            } ${activeSideBar ? ' !rounded-sm ': ''}`}
                        >
                            <HomeSVGIcon activeSideBar={activeSideBar}/>
                            <span>{activeSideBar ? '': 'Dashboard'}</span>
                        </a>
                    </Link>
                </div>
                <h3 className="text-[14px] !mb-3 text-gray-500 px-6 !my-3 cursor-text">
                    Quản lý Ecommerce
                </h3>
                <Collapse expandIconPosition="end" ghost accordion>
                    <Panel
                        header={
                            <div>
                                <div className="ant-collapse__header--custom">
                                    <ProductSVGIcon />
                                    <p>Sản phẩm</p>
                                </div>
                            </div>
                        }
                        key="2"
                        className={`panel-item__customize group w-full h-full ${
                            router.pathname === '/admin/products' || 
                            router.pathname === '/admin/products/create-product'
                                ? ' active'
                                : ''
                        }`}
                    >
                        <Link href="/admin/products">
                            <a className="gap-x-1.5 py-1 group !mb-2 flex items-center hover: pl-8 pr-3 rounded">
                                <RightSVGIcon />
                                <span
                                    className={`text-[14px] text-[#6259ca]/90 hover:text-[#4134c7] font-medium ${
                                        router.pathname === '/admin/products'
                                            ? ' !font-bold !text-[#4134c7] underline underline-offset-2'
                                            : ''
                                    }`}
                                >
                                    Xem danh sách
                                </span>
                            </a>
                        </Link>
                        <Link href="/admin/products/create-product">
                            <a className="gap-x-1.5 py-1 group !mb-2 flex items-center hover: pl-8 pr-3 rounded">
                                <RightSVGIcon />
                                <span
                                    className={`text-[14px] text-[#6259ca]/90 hover:text-[#4134c7] font-medium ${
                                        router.pathname ===
                                        '/admin/products/create-product'
                                            ? ' !font-bold !text-[#4134c7] underline underline-offset-2'
                                            : ''
                                    }`}
                                >
                                    Thêm sản phẩm
                                </span>
                            </a>
                        </Link>
                    </Panel>
                    <Panel
                        header={
                            <div>
                                <div className="ant-collapse__header--custom">
                                    <OrderSVGIcon />
                                    <p>Đơn hàng</p>
                                </div>
                            </div>
                        }
                        key="3"
                        className={`panel-item__customize group w-full h-full ${
                            router.pathname === '/admin/orders' ? ' active' : ''
                        }`}
                    >
                        <Link href="/admin/orders">
                            <a className="gap-x-1.5 py-1 group !mb-2 flex items-center hover: pl-8 pr-3 rounded">
                                <RightSVGIcon />
                                <span
                                    className={`text-[14px] text-[#6259ca]/90 hover:text-[#4134c7] font-medium ${
                                        router.pathname === '/admin/orders'
                                            ? ' !font-bold !text-[#4134c7] underline underline-offset-2'
                                            : ''
                                    }`}
                                >
                                    Xem danh sách
                                </span>
                            </a>
                        </Link>
                        <Link href="/admin/orders">
                            <a className="gap-x-1.5 py-1 group !mb-2 flex items-center hover: pl-8 pr-3 rounded">
                                <RightSVGIcon />
                                <span
                                    className={`text-[14px] text-[#6259ca]/90 hover:text-[#4134c7] font-medium ${
                                        router.pathname === '/admin/orders'
                                            ? ' !font-bold !text-[#4134c7] underline underline-offset-2'
                                            : ''
                                    }`}
                                >
                                    Thêm đơn hàng
                                </span>
                            </a>
                        </Link>
                    </Panel>
                    <Panel
                        header={
                            <div>
                                <div className="ant-collapse__header--custom">
                                    <CategorySVGIcon />
                                    <p>Danh mục</p>
                                </div>
                            </div>
                        }
                        key="4"
                        className={`panel-item__customize group w-full h-full ${
                            router.pathname === '/admin/categories' ||
                            router.pathname === '/admin/categories/create-category'
                                ? ' active'
                                : ''
                        }`}
                    >
                        <Link href="/admin/categories">
                            <a className="gap-x-1.5 py-1 group !mb-2 flex items-center hover: pl-8 pr-3 rounded">
                                <RightSVGIcon />
                                <span
                                    className={`text-[14px] text-[#6259ca]/90 hover:text-[#4134c7] font-medium ${
                                        router.pathname === '/admin/categories'
                                            ? ' !font-bold !text-[#4134c7] underline underline-offset-2'
                                            : ''
                                    }`}
                                >
                                    Xem danh sách
                                </span>
                            </a>
                        </Link>
                        <Link href="/admin/categories/create-category">
                            <a className="gap-x-1.5 py-1 group !mb-2 flex items-center hover: pl-8 pr-3 rounded">
                                <RightSVGIcon />
                                <span
                                    className={`text-[14px] text-[#6259ca]/90 hover:text-[#4134c7] font-medium ${
                                        router.pathname ===
                                        '/admin/categories/create-category'
                                            ? ' !font-bold !text-[#4134c7] underline underline-offset-2'
                                            : ''
                                    }`}
                                >
                                    Thêm danh mục
                                </span>
                            </a>
                        </Link>
                    </Panel>
                    <Panel
                        header={
                            <div>
                                <div className="ant-collapse__header--custom">
                                    <CategorySVGIcon />
                                    <p>Danh mục sản phẩm</p>
                                </div>
                            </div>
                        }
                        key="5"
                        className={`panel-item__customize group w-full h-full ${
                            router.pathname === '/admin/product-categories' ||
                            router.pathname === '/admin/product-categories/create-category'
                                ? ' active'
                                : ''
                        }`}
                    >
                        <Link href="/admin/product-categories">
                            <a className="gap-x-1.5 py-1 group !mb-2 flex items-center hover: pl-8 pr-3 rounded">
                                <RightSVGIcon />
                                <span
                                    className={`text-[14px] text-[#6259ca]/90 hover:text-[#4134c7] font-medium ${
                                        router.pathname === '/admin/product-categories'
                                            ? ' !font-bold !text-[#4134c7] underline underline-offset-2'
                                            : ''
                                    }`}
                                >
                                    Xem danh sách
                                </span>
                            </a>
                        </Link>
                        <Link href="/admin/product-categories/create-product-category">
                            <a className="gap-x-1.5 py-1 group !mb-2 flex items-center hover: pl-8 pr-3 rounded">
                                <RightSVGIcon />
                                <span
                                    className={`text-[14px] text-[#6259ca]/90 hover:text-[#4134c7] font-medium ${
                                        router.pathname ===
                                        '/admin/product-categories/create-product-category'
                                            ? ' !font-bold !text-[#4134c7] underline underline-offset-2'
                                            : ''
                                    }`}
                                >
                                    Thêm danh mục sản phẩm
                                </span>
                            </a>
                        </Link>
                    </Panel>
                    <Panel
                        header={
                            <div>
                                <div className="ant-collapse__header--custom">
                                    <UserSVGIcon />
                                    <p>Thành viên</p>
                                </div>
                            </div>
                        }
                        key="6"
                        className={`panel-item__customize group w-full h-full ${
                            router.pathname === '/admin/users' ||
                            router.pathname === '/admin/users/create-user'
                                ? ' active'
                                : ''
                        }`}
                    >
                        <Link href="/admin/users">
                            <a className="gap-x-1.5 py-1 group !mb-2 flex items-center hover: pl-8 pr-3 rounded">
                                <RightSVGIcon />
                                <span
                                    className={`text-[14px] text-[#6259ca]/90 hover:text-[#4134c7] font-medium ${
                                        router.pathname === '/admin/users'
                                            ? ' !font-bold !text-[#4134c7] underline underline-offset-2'
                                            : ''
                                    }`}
                                >
                                    Xem danh sách
                                </span>
                            </a>
                        </Link>
                    </Panel>
                </Collapse>
            </div>
        </div>
    );
}

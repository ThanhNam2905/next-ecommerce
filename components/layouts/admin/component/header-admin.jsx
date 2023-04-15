import { ShopOutlined, SettingOutlined, SearchOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const MoonSVGIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
    >
        <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
        />
    </svg>
);

const SunSVGIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
    </svg>
);

const ProfileSVGIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);

const LogoutSVGIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
    </svg>
);

const BarsSVGIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
        />
    </svg>
);

const contentSettingAdmin = (
    <div className="!px-2 py-1">
        <ul className="!space-y-2 !mb-1">
            <li>
                <Link href="/admin/profile">
                    <a className="px-4 py-2 text-gray-600 gap-x-2.5 flex items-center hover:bg-gray-100 rounded">
                        <ProfileSVGIcon />
                        <span className="text-[14px] font-semibold">
                            Hồ sơ Profile
                        </span>
                    </a>
                </Link>
            </li>
            <li>
                <a className="px-4 py-2 text-gray-600 gap-x-2.5 flex items-center cursor-pointer hover:bg-gray-100 rounded">
                    <LogoutSVGIcon />
                    <span className="text-[14px] font-semibold">Đăng xuất</span>
                </a>
            </li>
        </ul>
    </div>
);

export default function HeaderAdmin({activeSideBar, setActiveSideBar}) {
    const [activeDarkMode, setActiveDarkMode] = useState(true);
    const router = useRouter();
    
    return (
        <>
            <div className="w-full bg-stone-50/30 h-20 px-8 flex items-center justify-between border-b">
                <div className="flex items-center gap-x-10">
                    <button 
                        className='w-12 h-12 bg-white shadow shadow-gray-500 flex items-center justify-center rounded-full' 
                        onClick={() => setActiveSideBar(!activeSideBar)}>
                        <BarsSVGIcon />
                    </button>
                    <div className='bg-white border border-gray-300 flex items-center justify-between px-4 rounded-2xl'>
                        <input type="text" name='search-box' placeholder='Search...' className='pl-0 w-80 border-none focus:ring-0'/>
                        <SearchOutlined className='text-lg'/>
                    </div>
                    

                </div>
                <div className="flex items-center gap-x-10">
                    <button
                        onClick={() => setActiveDarkMode(!activeDarkMode)}
                        className="cursor-pointer w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 shadow-inner shadow-gray-400"
                    >
                        {activeDarkMode ? <MoonSVGIcon /> : <SunSVGIcon />}
                    </button>
                    <button
                        className="btn btn__primary--admin text-[14px] px-4 py-1.5"
                        onClick={() =>
                            router.push('/admin/products/create-product')
                        }
                    >
                        Create Product
                    </button>
                    <Link href="/" passHref legacyBehavior>
                        <ShopOutlined
                            className="!text-black text-2xl"
                            title="Trang chủ"
                        />
                    </Link>

                    <div className="h-full flex justify-start">
                        <Popover
                            content={contentSettingAdmin}
                            trigger="click"
                            className="popover__customzise-css"
                            placement="bottomRight"
                        >
                            <SettingOutlined
                                className="!text-balck text-2xl animate-[spin_3.5s_ease-in-out_infinite]"
                                title="Cài đặt"
                            />
                        </Popover>
                    </div>
                </div>
            </div>
        </>
    );
}

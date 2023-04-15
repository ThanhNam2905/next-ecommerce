import Head from 'next/head';
import React, { useState } from 'react';
import HeaderAdmin from './component/header-admin';
import SidebarAdmin from './component/sidebar-admin';

function DashboardLayout({ title, children }) {
    const [activeSideBar, setActiveSideBar] = useState(false);
    console.log('activeSideBar ===> ', activeSideBar);

    return (
        <>
            <Head>
                <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
                <meta name="description" content="Ecommerce Website" />
                <link
                    rel="icon"
                    href="https://icons.veryicon.com/png/o/miscellaneous/admin-dashboard-flat-multicolor/admin-roles.png"
                />
            </Head>

            <main className="flex flex-col min-h-screen justify-between">
                <div className="container">
                    <div className="min-w-full flex">
                        {/* SideBarAdmin Component */}
                        <div
                            className={`shadow-md shadow-gray-300 z-30 transition-all ease-linear duration-300 ${
                                activeSideBar
                                    ? ' md:w-[5%] transition-all ease-linear duration-300'
                                    : ' md:w-[19%]'
                            } `}
                        >
                            <SidebarAdmin
                                activeSideBar={activeSideBar}
                            />
                        </div>

                        <div
                            className={` transition-all ease-linear duration-300 ${
                                activeSideBar ? ' md:w-[95%]' : ' md:w-[81%]'
                            } `}
                        >
                            {/* Header Admin component */}
                            <HeaderAdmin
                                activeSideBar={activeSideBar}
                                setActiveSideBar={setActiveSideBar}
                            />

                            <div className="bg-gray-100 px-9 pt-4 pb-6 min-h-screen">
                                {/* Admin Dashboard Content Component */}
                                {children}
                            </div>
                            {/* Footer Admin component */}
                            <footer className="w-full py-6 border-t border-l bg-white">
                                <p className="text-center font-semibold">
                                    Copyright © 2023{' '}
                                    <span className="text-[#6259ca] italic cursor-pointer">
                                        Dashboard
                                    </span>
                                    . Designed with by{' '}
                                    <span className="text-[#6259ca] italic cursor-pointer">
                                        Nam2905
                                    </span>{' '}
                                    All rights reserved.
                                </p>
                            </footer>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default DashboardLayout;

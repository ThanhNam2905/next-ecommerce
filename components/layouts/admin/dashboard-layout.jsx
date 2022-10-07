import Head from 'next/head'
import React from 'react'
import Footer from '../index/footer'
import Header from '../index/header'
import SidebarAdmin from './sidebar-admin'

function DashboardLayout({ title, children }) {
    return (
        <>
            <Head>
            <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
            <meta name="description" content="Ecommerce Website" />
            <link rel="icon" href="https://icons.veryicon.com/png/o/miscellaneous/admin-dashboard-flat-multicolor/admin-roles.png" />
            </Head>

            <div className="flex flex-col min-h-screen justify-between">
                {/* Header component */}
                <Header/>

                <main className='container m-auto mb-12 mt-12 px-36'>
                    <div className='grid grid-cols-1 md:grid-cols-4 md:gap-10'>
                        {/* SideBarAdmin Component */}
                        <div className='md:col-span-1'>
                            <SidebarAdmin/>
                        </div>
                        {/* Admin Dashboard Content Component */}
                        <div className='md:col-span-3'>
                            {children}
                        </div>
                    </div>
                    
                </main>
                
                {/* Footer component */}
                <Footer/>
            </div>
        </>
    )
}

export default DashboardLayout
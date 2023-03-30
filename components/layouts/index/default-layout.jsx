import React from 'react';
import Head from 'next/head';
import Footer from './footer';
import Header from './header'; // import header.

function DefaultLayout({ title, children }) {
    return (
        <>
            <Head>
                <title>{title ? title + ' - Shop' : 'Amazona'}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col min-h-screen">
                <div className='w-full h-screen bg-blue-400 hidden'>

                </div>
                {/* Header component */}
                <Header/>

                <main className='container m-auto mt-6 px-16'>
                    {children}
                </main>
                
                {/* Footer component */}
                <Footer/>
            </div>
        </>
    );
}

export default DefaultLayout;

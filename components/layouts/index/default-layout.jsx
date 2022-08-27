import React from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

function DefaultLayout({ title, children }) {
    return (
        <>
            <Head>
                <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col min-h-screen justify-between">
                {/* Header component */}
                <Header/>

                <main className='container m-auto mt-6 px-36'>
                    {children}
                </main>
                
                {/* Footer component */}
                <Footer/>
            </div>
        </>
    );
}

export default DefaultLayout;

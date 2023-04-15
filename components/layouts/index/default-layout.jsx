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
                <link rel="icon" href="https://res.cloudinary.com/nam290596/image/upload/v1680160145/next-store-fashion/favicon-logo_cyk14b.jpg" />
            </Head>

            <div className="flex flex-col min-h-screen">
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

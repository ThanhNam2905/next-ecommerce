import { StoreProvider } from '../store/Store';
import '../styles/globals.css';
import "antd/dist/antd.css";
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { LoadingOutlined } from '@ant-design/icons'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                <PayPalScriptProvider deferLoading={true}>
                    {
                        Component.auth ? (
                            <Auth adminOnly={Component.auth.adminOnly}>
                                <Component {...pageProps} />
                            </Auth>
                        ) : (
                            <Component {...pageProps} />
                        )
                    }
                </PayPalScriptProvider>
            </StoreProvider>
        </SessionProvider>
    );
}

function Auth({ children }) {
    const router = useRouter();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/unauthorized?message=login required');
        },
    });
    if (status === 'loading') {
        return (
            <div className='w-full h-screen flex items-center justify-center bg-blue-100'>
                <h3 className='text-3xl text-gray-600 font-semibold shadow-lg inline-flex items-center gap-x-2.5'> 
                    <LoadingOutlined /> Loading...
                </h3>
            </div>
        );
    }
    
    // if(adminOnly) {
    //     router.push('/unauthorized?message=admin login required')
    // }
    return children;
}


export default MyApp;

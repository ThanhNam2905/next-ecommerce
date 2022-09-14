import { StoreProvider } from '../store/Store';
import '../styles/globals.css';
import "antd/dist/antd.css";
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                <Component {...pageProps} />
            </StoreProvider>
        </SessionProvider>
        
    );
}

export default MyApp;

import { StoreProvider } from '../store/Store';
import '../styles/globals.css';
import "antd/dist/antd.css";
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                {
                    Component.auth ? (
                        <Auth>
                            <Component {...pageProps} />
                        </Auth>
                    ) : (
                        <Component {...pageProps} />
                    )
                }
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
      return <div>Loading...</div>;
    }
    return children;
}


export default MyApp;

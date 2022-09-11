import { StoreProvider } from '../store/Store';
import '../styles/globals.css';
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
    return (
        <StoreProvider>
            <Component {...pageProps} />
        </StoreProvider>
    );
}

export default MyApp;

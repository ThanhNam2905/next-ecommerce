import DefaultLayout from "../components/layouts/index/Default-layout";
import ProductPage from "../components/products/product-page";

export default function Home() {
    return (
        <>
            <DefaultLayout title="Home Page">
                {/* List Products components */}
                <ProductPage/>
            </DefaultLayout>
        </>
    );
}

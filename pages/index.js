import DefaultLayout from "../components/layouts/index/Default-layout";
import ProductPage from "../components/products/product-page";

export default function HomePage() {
    return (
        <>
            <DefaultLayout title="Trang Chủ">
                {/* List Products components */}
                <ProductPage/>
            </DefaultLayout>
        </>
    );
}

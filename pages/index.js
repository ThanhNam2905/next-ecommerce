import DefaultLayout from "../components/layouts/index/Default-layout";
import ProductPage from "../components/products/product-page";
import Product from "../models/ProductModel";
import db from "../utils/database";

export default function HomePage({ products }) {
    return (
        <>
            <DefaultLayout title="Trang Chủ">
                {/* List Products components */}
                <ProductPage products={products}/>
            </DefaultLayout>
        </>
    );
}

export async function getServerSideProps() {
    //  connect databse mongodb
    await db.connect();
    const products = await Product.find().lean();
    return {
        props: {
            products: products.map(db.convertDocToObj)
        }
    };
}
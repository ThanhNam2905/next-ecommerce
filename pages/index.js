import DefaultLayout from '../components/layouts/index/default-layout';
import ProductPage from '../components/products/product-page';
import ProductDetail from '../models/ProductDetailModel';
import Product from '../models/ProductModel';
import db from '../utils/database';

export default function HomePage({ products, productsDetail }) {
    return (
        <>
            <DefaultLayout title="Trang Chủ">
                {/* List Products components */}
                <ProductPage
                    products={products}
                    productsDetail={productsDetail}
                />
            </DefaultLayout>
        </>
    );
}

export async function getServerSideProps() {
    //  connect databse mongodb
    await db.connect();
    const products = await Product.find().lean();
    const productsDetail = await ProductDetail.find().lean();
    await db.disconnect();
    return {
        props: {
            products: JSON.parse(
                JSON.stringify(products.map(db.convertDocToObj))
            ),
            productsDetail: JSON.parse(JSON.stringify(productsDetail))
        }
    };
}

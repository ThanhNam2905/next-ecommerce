
// import ProductDetail from '../../models/ProductDetailModel';
import Product from '../../models/ProductModel';
import data from '../../utils/data';
import db from '../../utils/database'

const handler = async(req, res) => {
    await db.connect();
    // await User.deleteMany();
    // await User.insertMany(data.users);

    await Product.deleteMany();
    await Product.insertMany(data.products);

    // await ProductDetail.deleteMany();
    // await ProductDetail.insertMany(data.productsDetail);

    // await Category.deleteMany();
    // await Category.insertMany(data.category);

    // await ProductType.deleteMany();
    // await ProductType.insertMany(data.productType);

    await db.disconnect();
    res.send({ message: 'seeded successfully'});
}

export default handler;
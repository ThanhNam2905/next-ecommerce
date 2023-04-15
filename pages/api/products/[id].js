import Product from '../../../models/ProductModel';
import db from '../../../utils/database';

const handler = async (req, res) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.disconnect();
    res.send(product);
};

export default handler;

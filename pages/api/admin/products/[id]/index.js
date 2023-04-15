import { getSession } from 'next-auth/react';
import Product from '../../../../../models/ProductModel';
import db from '../../../../../utils/database';

const handler = async (req, res) => {
    const session = await getSession({ req });

    if (!session || !session.isAdmin) {
        return res
            .status(401)
            .send('You are not logged into the administator account');
    } else if (req.method === 'PUT') {
        return putDataHandler(req, res);
    } else if (req.method === 'DELETE') {
        return deleteDataHandler(req, res);
    } else {
        return res.status(400).send({ message: 'Method not allowed' });
    }
};

const putDataHandler = async (req, res) => {
    await db.connect();

    const { id } = req.query;
    const product = await Product.findById(id);
    if (product) {
        product.nameProduct = req.body.nameProduct;
        product.slugProduct = req.body.slugProduct;
        product.codeProduct = req.body.codeProduct;
        product.priceProduct = req.body.priceProduct;
        product.brandProduct = req.body.brandProduct;
        product.tagProduct = req.body.tagProduct;
        product.description = req.body.description;
        product.imagesProduct = req.body.arrayListImg;

        await product.save();
        await db.disconnect();
        return res.send({ message: 'Bạn vừa chỉnh sửa sản phẩm thành công' });
    } else {
        await db.disconnect();
        return res
            .status(404)
            .send({ message: 'Không tìm thấy sản phẩm muốn chỉnh sửa' });
    }
};

const deleteDataHandler = async (req, res) => {
    await db.connect();

    const { id } = req.query;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
        await product.remove();
        await db.disconnect();
        return res.send({
            message: `Bạn vừa xoá sản phẩm ${product.name} thành công`
        });
    } else {
        await db.disconnect();
        return res
            .status(404)
            .send({ message: 'Sản phẩm bạn muốn xoá không tồn tại' });
    }
};

export default handler;

import { getSession } from 'next-auth/react';
import db from '../../../../../utils/database';
import ProductCategory from '../../../../../models/ProductCategoryModel';
import toCapitalizeCase from '../../../../../utils/toCapitalizeCase';

const handler = async (req, res) => {
    const session = await getSession({ req });

    if (!session || !session.isAdmin) {
        return res
            .status(401)
            .send({
                message: 'You are not logged into the administator account!'
            });
    } else if (req.method === 'GET') {
        return getItemDataHandler(req, res);
    } else if (req.method === 'PUT') {
        return putItemDataHandler(req, res);
    } else if (req.method === 'DELETE') {
        return deleteItemDataHandler(req, res);
    } else {
        return res.status(400).send({ message: 'Method not allowed' });
    }
};

const getItemDataHandler = async (req, res) => {
    await db.connect();

    const { id } = req.query;
    const productCategory = await ProductCategory.findById(id);
    await db.disconnect();
    return res.send({ productCategory });
};

const putItemDataHandler = async (req, res) => {
    await db.connect();

    const { id } = req.query;
    const productCategory = await ProductCategory.findById(id);
    if (productCategory) {
        productCategory.nameProductCategory = toCapitalizeCase(req.body.nameProductCategory),
        productCategory.categoryId = req.body.categoryId,
        productCategory.slugNameProductCategory = req.body.slugNameProductCategory;

        await productCategory.save();
        await db.disconnect();
        return res.send({message: 'Bạn vừa chỉnh sửa danh mục sản phẩm thành công'});
    }
    else {
        await db.disconnect();
        return res.status(404).send({ message: 'Không tìm thấy danh mục sản phẩm muốn chỉnh sửa' });
    }
};

const deleteItemDataHandler = async (req, res) => {
    await db.connect();

    const { id } = req.query;
    const productCategory = await ProductCategory.findById(id);
    if (productCategory) {
        await productCategory.remove();
        await db.disconnect();
        return res.send({
            message: `Bạn vừa xoá danh mục ${productCategory.name} thành công`
        });
    } else {
        await db.disconnect();
        return res.status(404).send({
            message: 'Danh mục sản phẩm muốn xoá không tồn tại!'
        });
    }
};

export default handler;

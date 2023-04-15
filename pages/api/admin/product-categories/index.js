import { getSession } from 'next-auth/react';
import db from '../../../../utils/database';
import ProductCategory from '../../../../models/ProductCategoryModel';
import toCapitalizeCase from '../../../../utils/toCapitalizeCase';

const handler = async (req, res) => {
    const session = await getSession({ req });

    if (!session || !session.isAdmin) {
        return res.status(401).send('You are not logged into the administator account');
    } 
    else if (req.method === 'GET') {
        return getDataHandler(req, res);
    } 
    else if (req.method === 'POST') {
        return postDataHandler(req, res);
    }
    else {
        return res.status(400).send({message: 'Method not allowed'});
    }
};

const getDataHandler = async (req, res) => {
    await db.connect();

    const productCategory = await ProductCategory.find({}).lean();
    await db.disconnect();
    return res.send(productCategory);
};

const postDataHandler = async (req, res) => {
    await db.connect();

    const {
        nameProductCategory,
        categoryId,
        slugNameProductCategory
    } = req.body;

    const isCheckProductCategory = await ProductCategory.findOne({ nameProductCategory });
    if(isCheckProductCategory) {
        return res.status(400).send({ error: 'Danh mục sản phẩm này đã tồn tại trước đó!'})
    }

    const newProductCategory = await new ProductCategory({
        nameProductCategory: toCapitalizeCase(nameProductCategory),
        categoryId: categoryId,
        slugNameProductCategory: slugNameProductCategory,
    });

    const productCategory = await newProductCategory.save();
    await db.disconnect();
    return res.send({
        message: 'Bạn vừa thêm danh mục sản phẩm thành công',
        productCategory
    });
};

export default handler;

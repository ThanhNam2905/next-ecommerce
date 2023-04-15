import { getSession } from 'next-auth/react';
import Category from '../../../../models/CategoryModel';
import db from '../../../../utils/database';
import toCapitalizeCase from '../../../../utils/toCapitalizeCase';

const handler = async (req, res) => {
    const session = await getSession({ req });

    if (!session || !session.isAdmin) {
        return res.status(401).send('Bắt buộc phải đăng nhập');
    }
    else if (req.method === 'GET') {
        return getDataHandler(req, res);
    } 
    else if (req.method === 'POST') {
        return postDataHandler(req, res);
    } 
    else {
        return res.status(400).send({ message: 'Method not allowed' });
    }
};

const getDataHandler = async (req, res) => {
    await db.connect();
    const categories = await Category.find({}).lean();
    await db.disconnect();
    return res.send(categories);
};

const postDataHandler = async (req, res) => {
    await db.connect();

    const { 
        nameCategory, 
        title, 
        typeCategory, 
        slugNameCategory, 
        slugTitle 
    } = req.body;

    const isCheckCategory = await Category.findOne({ nameCategory });
    if(isCheckCategory) {
        return res.status(400).json({ error: 'Danh mục này đã tồn tại trước đó!' });
    }

    const newCategory = await new Category({
        nameCategory: toCapitalizeCase(nameCategory),
        title: toCapitalizeCase(title),
        typeCategory: typeCategory,
        slugNameCategory: slugNameCategory,
        slugTitle: slugTitle,
    });

    const category = await newCategory.save();
    await db.disconnect();
    return res.send({
        message: 'Bạn vừa thêm danh mục thành công',
        category
    });
};

export default handler;

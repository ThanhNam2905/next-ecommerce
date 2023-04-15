import { getSession } from 'next-auth/react';
import db from '../../../../../utils/database';
import Category from '../../../../../models/CategoryModel';

const handler = async (req, res) => {
    const session = await getSession({ req });

    if (!session || !session.isAdmin) {
        return res
            .status(401)
            .send('You are not logged into the administator account');
    } else if (req.method === 'GET') {
        return getDataItemHandler(req, res);
    } else if (req.method === 'PUT') {
        return putDataItemHandler(req, res);
    } else if (req.method === 'DELETE') {
        return deleteDataItemHandler(req, res);
    } else {
        return res.status(400).send({ message: 'Method not allowed' });
    }
};

const getDataItemHandler = async (req, res) => {
    await db.connect();

    const { id } = req.query;
    const category = await Category.findById(id);
    await db.disconnect();
    return res.send({ category });
};

const putDataItemHandler = async (req, res) => {
    await db.connect();

    const { id } = req.query;
    const category = await Category.findById(id);
    if (category) {
        category.nameCategory = req.body.nameCategory;
        category.title = req.body.title;
        category.typeCategory = req.body.typeCategory;
        category.slugNameCategory = req.body.slugNameCategory;
        category.slugTitle = req.body.slugTitle;

        await category.save();
        await db.disconnect();
        return res.send({
            message: 'Bạn vừa chỉnh sửa danh mục thành công'
        });
    } else {
        await db.disconnect();
        return res.send({ message: 'Không tìm thấy danh mục muốn chỉnh sửa' });
    }
};

const deleteDataItemHandler = async (req, res) => {
    await db.connect();

    const { id } = req.query;
    const category = await Category.findByIdAndDelete(id);
    if (category) {
        await category.remove();
        await db.disconnect();
        return res.send({
            message: `Bạn vừa xoá danh mục ${category.name} thành công`
        });
    } else {
        await db.disconnect();
        return res.status(404).send({
            message: 'Danh mục bạn muốn xoá không tồn tại'
        });
    }
};

export default handler;

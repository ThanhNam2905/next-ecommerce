import { getSession } from 'next-auth/react';
import Order from '../../../models/OrderModel';
import db from '../../../utils/database';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('Bắt buộc phải đăng nhập');
    }

    const { _id } = session;
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user: _id
    });

    const order = await newOrder.save();
    res.status(200).send(order);
};

export default handler;

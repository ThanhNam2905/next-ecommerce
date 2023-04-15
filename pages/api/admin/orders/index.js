import { getSession } from 'next-auth/react';
import Order from '../../../../models/OrderModel';
import db from '../../../../utils/database';

const handler = async (req, res) => {
    const session = await getSession({ req });

    if (!session || !session.isAdmin) {
        return res.status(401).send('Bắt buộc phải đăng nhập');
    }
    if (req.method === 'GET') {
        await db.connect();
        const orders = await Order.find({}).populate('user');
        await db.disconnect();
        res.send(orders);
    } else {
        return res.status(400).send({ message: 'Method not allowed' });
    }
};

export default handler;

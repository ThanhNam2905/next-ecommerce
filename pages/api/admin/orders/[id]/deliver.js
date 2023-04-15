import Order from '../../../../../models/OrderModel';
import db from '../../../../../utils/database';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session || (session && !session.isAdmin)) {
        return res.status(401).send('Bắt buộc phải đăng nhập');
    }
    await db.connect();
    const order = await Order.findById(req.query.id);
    if (order) {
        order.isDelivered = true;
        order.delivered_At = Date.now();
        const deliveredOrder = await order.save();
        await db.disconnect();
        res.send({
            message: 'Order Delivered Successfully',
            order: deliveredOrder
        });
    } else {
        await db.disconnect();
        return res.status(404).send({ message: 'Error: Order not found' });
    }
};

export default handler;

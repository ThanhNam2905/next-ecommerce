import { getSession } from 'next-auth/react';
import Order from '../../../../models/OrderModel';
import db from '../../../../utils/database';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('Error: Bắt buộc phải đăng nhập');
    }

    await db.connect();
    const order = await Order.findById(req.query.id);
    if (order) {
        if (order.isPaid) {
            return res.status(400).send({
                message: 'Error: Đơn hàng của bạn đã được thanh toán trước đó!'
            });
        }
        order.isPaid = true;
        order.paid_At = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email_address: req.body.email_address
        };
        const paidOrder = await order.save();
        await db.disconnect();
        res.send({
            message: 'Đơn hàng đã được thanh toán thành công.',
            order: paidOrder
        });
    } else {
        await db.disconnect();
        return res
            .status(404)
            .send({ message: 'Error: Đơn hàng của bạn không tìm thấy!' });
    }
};

export default handler;

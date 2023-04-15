import { getSession } from 'next-auth/react';
import Order from '../../../models/OrderModel';
import Product from '../../../models/ProductModel';
import User from '../../../models/UserModel';
import db from '../../../utils/database';

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('Bắt buộc phải đăng nhập');
    }
    // if(!session || (session && !session.user.isAdmin)) {
    //     return res.status(401).send('Bắt buộc phải đăng nhập');
    // }

    await db.connect();

    const ordersCount = await Order.countDocuments();
    const productsCount = await Product.countDocuments();
    const usersCount = await User.countDocuments();
    const ordersPriceGroup = await Order.aggregate([
        {
            $group: {
                _id: null,
                sales: { $sum: '$totalPrice' }
            }
        }
    ]);
    const ordersPriceTotal =
        ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
    const salesData = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                totalSales: { $sum: '$totalPrice' }
            }
        }
    ]);

    await db.disconnect();
    res.send({
        ordersCount,
        productsCount,
        usersCount,
        ordersPriceTotal,
        salesData
    });
};

export default handler;

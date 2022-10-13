import { getSession } from "next-auth/react";
import Order from "../../../../models/OrderModel";
import db from "../../../../utils/database";


const handler = async (req, res) => {
    const session = await getSession({ req });
    if(!session) {
        return res.status(401).send({ message: 'Bắt buộc phải đăng nhập'});
    }

    const { _id } = session;
    await db.connect();
    const orders = await Order.find({ user: _id });
    await db.disconnect();
    return res.send(orders);

}

export default handler;
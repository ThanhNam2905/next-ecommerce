import { getSession } from 'next-auth/react';
import User from '../../../../models/UserModel';
import db from '../../../../utils/database';

const handler = async (req, res) => {
    const session = await getSession({ req });

    if (!session && !session.isAdmin) {
        return res.status(401).send('Bắt buộc phải đăng nhập');
    }
    if (req.method === 'GET') {
        await db.connect();
        const users = await User.find({}).lean();
        await db.disconnect();
        return res.send(users);
    } else {
        return res.status(400).send({ message: 'Method not allowed' });
    }
};

export default handler;

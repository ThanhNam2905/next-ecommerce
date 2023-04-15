import { getSession } from 'next-auth/react';
import User from '../../../models/UserModel';
import db from '../../../utils/database';
import bcryptjs from 'bcryptjs';

async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(400).send({
            message: `${req.method} not supported`
        });
    }

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({
            message: 'Bắt buộc phải đăng nhập'
        });
    }

    console.log(session);
    const { name, email, password, numberPhone } = req.body;

    // if(
    //     !name ||
    //     (password && password.trim().length < 5) ||
    //     (numberPhone && numberPhone.trim().length < 9)
    // ) {
    //     res.status(422).json({ message: 'Validation Error'});
    //     return;
    // }

    await db.connect();
    const updateUserProfile = await User.findById(session._id);
    console.log(updateUserProfile);
    updateUserProfile.name = name;
    updateUserProfile.email = email;
    updateUserProfile.numberPhone = numberPhone;
    if (password) {
        updateUserProfile.password = bcryptjs.hashSync(password);
    }

    await updateUserProfile.save();
    await db.disconnect();
    res.send({ message: 'Cập nhật thành công' });
}

export default handler;

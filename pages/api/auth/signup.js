import bcrypt from 'bcryptjs';
import User from '../../../models/UserModel';
import db from '../../../utils/database';

async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const { name, numberPhone, email, password } = req.body;

    await db.connect();

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        res.status(422).json({
            message: 'Tài khoản email này đã tồn tại'
        });
        await db.disconnect();
        return;
    }

    const newUser = new User({
        name,
        numberPhone,
        email,
        password: bcrypt.hashSync(password),
        isAdmin: false
    });

    const user = await newUser.save();
    await db.disconnect();
    res.status(201).send({
        message: 'Bạn đã tạo tài khoản thành công',
        _id: user._id,
        name: user.name,
        numberPhone: user.numberPhone,
        email: user.email,
        isAdmin: user.isAdmin
    });
}

export default handler;

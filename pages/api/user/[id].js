import User from '../../../models/UserModel';
import db from '../../../utils/database';

const handler = async (req, res) => {
    await db.connect();
    const user = await User.findById(req.query.id);
    await db.disconnect();
    res.send(user);
};

export default handler;

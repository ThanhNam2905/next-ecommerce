import User from '../../models/UserModel';
import data from '../../utils/data';
import db from '../../utils/database'

const handler = async(req, res) => {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await db.disconnect();
    res.send({ message: 'seeded successfully'});
}

export default handler;
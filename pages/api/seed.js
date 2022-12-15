
import User from '../../models/UserModel';
import Product from '../../models/ProductModel';
import data from '../../utils/data';
import db from '../../utils/database'

const handler = async(req, res) => {
    await db.connect();

    await Product.deleteMany();
    await Product.insertMany(data.products);

    await User.deleteMany();
    await User.insertMany(data.users);

    await db.disconnect();
    res.send({ message: 'seeded successfully'});
}

export default handler;
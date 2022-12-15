import db from '../../utils/database';
import Product from '../models/ProductModel';

const handler = async() => {
    await db.connect();

    await db.createCollection('Product', Product);

    await db.disconnect();
    
}

export default handler;
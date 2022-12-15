import { getSession } from "next-auth/react";
import Product from "../../../../models/ProductModel";
import db from "../../../../utils/database";

const handler = async (req, res) => {
    const session = await getSession({ req });

    if(!session || !session.isAdmin) {
        return res.status(401).send('You are not logged into the administator account');
    }
    if(req.method === 'GET') {
       return getDataHandler(req, res)
    }
    else if(req.method === 'POST') {
        return postDataHandler(req, res);
    }
    else {
        return res.status(400).send({message:  'Method not allowed'});
    }
};

const getDataHandler = async (req, res) => {
    await db.connect();
    const products = await Product.find({}).lean();
    await db.disconnect();
    return res.send(products);
}

const postDataHandler = async (req, res) => {
    await db.connect();

    const newProduct = await new Product({
        nameProduct: req.body.nameProduct,
        slugProduct: req.body.slugProduct,
        codeProduct: req.body.codeProduct,
        brandProduct: req.body.brandProduct,
        description: req.body.description,
        priceProduct: req.body.priceProduct,
        tagProduct: req.body.tagProduct,
        soldOut: 0,
        imagesProduct: req.body.arrayListImg
    });
    
    const product = await newProduct.save();
    await db.disconnect();
    res.send({ message: 'Bạn vừa thêm sản phẩm thành công', product });
};

export default handler;
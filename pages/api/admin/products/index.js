import { getSession } from "next-auth/react";
import Product from "../../../../models/ProductModel";
import db from "../../../../utils/database";
import toCapitalizeCase from "../../../../utils/toCapitalizeCase";

const handler = async (req, res) => {
    const session = await getSession({ req });

    if(!session || !session.isAdmin) {
        return res.status(401).send('You are not logged into the administator account');
    }
    else if(req.method === 'GET') {
       return getDataHandler(req, res)
    }
    else if(req.method === 'POST') {
        return postDataHandler(req, res);
    }
    else {
        return res.status(400).send({message: 'Method not allowed'});
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

    const {
        nameProduct,
        slugProduct,
        brandProduct,
        priceProduct,
        tagProduct,
        imageProduct,
        descriptionProduct
    } = req.body;

    const isCheckProduct = await Product.findOne({ nameProduct });
    if(isCheckProduct) {
        return res.status(400).send({
            error: 'Sản phẩm này đã tồn tại trước đó!'
        })
    }

    const newProduct = await new Product({
        nameProduct: toCapitalizeCase(nameProduct),
        slugProduct: slugProduct,
        brandProduct: brandProduct,
        priceProduct: priceProduct,
        tagProduct: tagProduct,
        imageProduct: imageProduct,
        descriptionProduct: descriptionProduct
    });
    
    const product = await newProduct.save();
    await db.disconnect();
    res.send({ message: 'Bạn vừa thêm sản phẩm thành công', product });
};

export default handler;
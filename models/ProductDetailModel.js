import mongoose from 'mongoose';

const productDetailSchema = new mongoose.Schema(
    {
        codeProduct: { type: String, require: true },
        size: { type: String, require: true },
        color: { type: String, require: true },
        subColor: { type: String, require: true },
        countOfStock: { type: Number, require: true },
        discountPrice: { type: Number, require: true, default: 0 },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            require: true
        },
        soldOut: { type: Number, require: true, default: 0 }
    },
    {
        timestamps: true
    }
);

const ProductDetail =
    mongoose.models.ProductDetail ||
    mongoose.model('ProductDetail', productDetailSchema);
export default ProductDetail;

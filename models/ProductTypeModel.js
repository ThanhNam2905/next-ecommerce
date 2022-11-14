import mongoose from 'mongoose'

const productTypeSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        slug: { type: String, require: true },
    }, {
        timestamps: true
    }
);

const ProductType = mongoose.models.ProductType || mongoose.model('ProductType', productTypeSchema);
export default ProductType;
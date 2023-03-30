import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        nameProduct: { type: String, require: true, unique: true },
        slugProduct: { type: String, require: true },
        // categoryId: { 
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Category', 
        //     require: true 
        // },
        // productTypeId: { 
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'ProductType', 
        //     require: true 
        // },
        imagesProduct: [
            {
                public_id: { type: String, require: true },
                url: { type: String, require: true }
            }
        ],
        tagProduct: { type: Array ,require: true, default: [] },
        priceProduct: { type: Number, require: true, default: 0 },
        brandProduct: { type: String, require: true, default: '' },
        description: { type: String, require: true, default: '' },
    }, {
        timestamps: true
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
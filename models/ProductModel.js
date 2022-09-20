import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        codeProduct: { type: String, require: true },
        slug: { type: String, require: true, unique: true },
        category: { type: String, require: true },
        images: { type: String, require: true },
        tagProduct: { type: Array ,require: true, default: []},
        discount: { type: Number,require: true, default: 0},
        price: { type: Number, require: true, default: 0},
        brand: { type: String, require: true },
        rating: { type: Number, require: true, default: 0 },
        numberReview: { type: Number, require: true, default: 0},
        countInStock: { type: Number, require: true, default: 0},
        material: { type: String, require: true, default: ''},
        sold: { type: Number, require: true, default: 0},
        description: { type: String, require: true, default: ''},
    }, {
        timestamps: true
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
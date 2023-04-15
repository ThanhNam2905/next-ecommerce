import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        nameProduct: {
            type: String,
            require: true,
            unique: true
        },
        slugProduct: {
            type: String,
            require: true
        },
        imageProduct: {
            public_id: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            }
        },
        tagProduct: {
            type: Array,
            require: true,
            default: []
        },
        priceProduct: {
            type: Number,
            require: true,
            default: 0
        },
        brandProduct: {
            type: String,
            require: true,
            default: ''
        },
        descriptionProduct: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
);

const Product =
    mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;

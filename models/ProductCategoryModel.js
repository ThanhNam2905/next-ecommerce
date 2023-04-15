import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema(
    {
        nameProductCategory: {
            type: String,
            require: true
        },
        slugNameProductCategory: {
            type: String,
            require: true
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            require: true
        }
    },
    {
        timestamps: true
    }
);

const ProductCategory =
    mongoose.models.ProductCategory ||
    mongoose.model('ProductCategory', productCategorySchema);
export default ProductCategory;

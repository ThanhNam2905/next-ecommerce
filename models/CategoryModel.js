import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        slug: { type: String, require: true },
    }, {
        timestamps: true
    }
);

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;
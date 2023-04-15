import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        nameCategory: { 
            type: String, 
            require: true 
        },
        title: { 
            type: String, 
            require: true 
        },
        slugNameCategory: { 
            type: String, 
            require: true 
        },
        slugTitle: { 
            type: String, 
            require: true 
        },
        typeCategory: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
);

const Category =
    mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;

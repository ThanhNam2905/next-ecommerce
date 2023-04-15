import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        orderItems: [
            {
                name: { type: String, require: true },
                quantityItem: { type: Number, require: true },
                selectedColor: { type: String, require: true },
                selectedSize: { type: String, require: true },
                imagesProduct: [
                    {
                        public_id: { type: String, require: true },
                        url: { type: String, require: true }
                    }
                ],
                price: { type: Number, require: true }
            }
        ],
        shippingAddress: {
            username: { type: String, require: true },
            numberPhone: { type: String, require: true },
            addressShip: { type: String, require: true }
        },
        paymentMethod: { type: String, require: true },
        paymentResult: { id: String, status: String, email_address: String },
        shippingMethod: { type: String, require: true },
        itemsPrice: { type: Number, require: true },
        shippingPrice: { type: Number, require: true },
        totalPrice: { type: Number, require: true },
        isPaid: { type: Boolean, require: true, default: false },
        isDelivered: { type: Boolean, require: true, default: false },
        paid_At: { type: Date },
        delivered_At: { type: Date }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;

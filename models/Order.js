// // models/Order.js
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   phone: { type: String, required: true },
//   comments: { type: String },
//   items: [
//     {
//       food_id: { type: String, required: true },
//       item_name: { type: String, required: true },
//       item_price: { type: Number, required: true },
//       quantity: { type: Number, required: true },
//     },
//   ],
//   total: { type: Number, required: true },
// });

// const Order = mongoose.model("Order", orderSchema);

// export default Order;
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    comments: { type: String, default: "" },
    items: [
      {
        food_id: { type: String, required: true },
        item_name: { type: String, required: true },
        item_price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

// models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    item_name: { type: String, required: true },
    item_price: { type: Number, required: true },
    image: { type: String, required: true }, // Add if you're handling images
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;

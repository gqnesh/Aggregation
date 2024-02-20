const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0,
    required: [true, "Number must be provided"]
  },
  featured: {
    type: Boolean,
    default: false,
    required: true
  },
  company: {
    type: String,
    enum: {
      
      values: ["Apple", "Samsung", "Realme", "MI", "Honor", "Oppo", "POCO"],
      message: `{VALUE} is not supported !`
    },
    required: true
  }
}, { timestamps: true });

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
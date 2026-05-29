import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0,
  },
  originalPrice: Number,
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Beauty'],
  },
  image: {
    type: String,
    required: true,
  },
  images: [String],
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: [{
    user: mongoose.Schema.Types.ObjectId,
    name: String,
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', productSchema);

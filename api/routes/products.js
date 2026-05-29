import express from 'express';
import Product from '../models/Product.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Get all products with filters
router.get('/', asyncHandler(async (req, res) => {
  const { category, search, sort, page = 1, limit = 12 } = req.query;

  let query = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  let sortOptions = {};
  if (sort === 'price-asc') {
    sortOptions = { price: 1 };
  } else if (sort === 'price-desc') {
    sortOptions = { price: -1 };
  } else if (sort === 'newest') {
    sortOptions = { createdAt: -1 };
  } else if (sort === 'rating') {
    sortOptions = { rating: -1 };
  }

  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Product.countDocuments(query);

  res.json({
    products,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      limit: parseInt(limit),
    },
  });
}));

// Get single product
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews.user', 'name avatar');

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
}));

// Get featured products
router.get('/featured', asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(8);

  res.json(products);
}));

// Get categories
router.get('/categories', asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');

  res.json(categories);
}));

export default router;

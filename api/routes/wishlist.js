import express from 'express';
import Wishlist from '../models/Wishlist.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get wishlist
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.userId }).populate('products.product');

  if (!wishlist) {
    wishlist = new Wishlist({ user: req.userId, products: [] });
    await wishlist.save();
  }

  res.json(wishlist);
}));

// Add to wishlist
router.post('/add', authMiddleware, asyncHandler(async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID required' });
  }

  let wishlist = await Wishlist.findOne({ user: req.userId });

  if (!wishlist) {
    wishlist = new Wishlist({ user: req.userId, products: [] });
  }

  const exists = wishlist.products.find(p => p.product.toString() === productId);

  if (exists) {
    return res.status(400).json({ message: 'Product already in wishlist' });
  }

  wishlist.products.push({ product: productId });
  wishlist.updatedAt = new Date();
  await wishlist.save();

  res.json({ message: 'Added to wishlist', wishlist });
}));

// Remove from wishlist
router.delete('/remove/:productId', authMiddleware, asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.userId });

  if (!wishlist) {
    return res.status(404).json({ message: 'Wishlist not found' });
  }

  wishlist.products = wishlist.products.filter(p => p.product.toString() !== req.params.productId);
  wishlist.updatedAt = new Date();
  await wishlist.save();

  res.json({ message: 'Removed from wishlist', wishlist });
}));

// Check if product in wishlist
router.get('/check/:productId', authMiddleware, asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.userId });

  if (!wishlist) {
    return res.json({ inWishlist: false });
  }

  const exists = wishlist.products.some(p => p.product.toString() === req.params.productId);

  res.json({ inWishlist: exists });
}));

export default router;

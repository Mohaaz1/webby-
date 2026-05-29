import express from 'express';
import Cart from '../models/Cart.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get cart
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.userId }).populate('items.product');

  if (!cart) {
    cart = new Cart({ user: req.userId, items: [] });
    await cart.save();
  }

  res.json(cart);
}));

// Add to cart
router.post('/add', authMiddleware, asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity < 1) {
    return res.status(400).json({ message: 'Invalid product or quantity' });
  }

  let cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    cart = new Cart({ user: req.userId, items: [] });
  }

  const existingItem = cart.items.find(item => item.product.toString() === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  cart.updatedAt = new Date();
  await cart.save();

  res.json({ message: 'Item added to cart', cart });
}));

// Update cart item
router.put('/update/:productId', authMiddleware, asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  if (quantity < 0) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  const cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const item = cart.items.find(item => item.product.toString() === req.params.productId);

  if (!item) {
    return res.status(404).json({ message: 'Item not in cart' });
  }

  if (quantity === 0) {
    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
  } else {
    item.quantity = quantity;
  }

  cart.updatedAt = new Date();
  await cart.save();

  res.json({ message: 'Cart updated', cart });
}));

// Remove from cart
router.delete('/remove/:productId', authMiddleware, asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
  cart.updatedAt = new Date();
  await cart.save();

  res.json({ message: 'Item removed from cart', cart });
}));

// Clear cart
router.delete('/clear', authMiddleware, asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = [];
  cart.updatedAt = new Date();
  await cart.save();

  res.json({ message: 'Cart cleared', cart });
}));

export default router;

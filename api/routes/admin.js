import express from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Admin middleware chain
const adminAuth = [authMiddleware, adminMiddleware];

// Get dashboard stats
router.get('/stats', adminAuth, asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();

  const completedOrders = await Order.countDocuments({ paymentStatus: 'completed' });
  const totalRevenue = await Order.aggregate([
    { $match: { paymentStatus: 'completed' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);

  res.json({
    stats: {
      totalUsers,
      totalProducts,
      totalOrders,
      completedOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
    },
  });
}));

// Get all orders
router.get('/orders', adminAuth, asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;

  let query = {};
  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const orders = await Order.find(query)
    .populate('user', 'name email phone')
    .populate('items.product', 'name image price')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Order.countDocuments(query);

  res.json({
    orders,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    },
  });
}));

// Update order status
router.put('/orders/:id', adminAuth, asyncHandler(async (req, res) => {
  const { status, trackingNumber, notes } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status,
      trackingNumber: trackingNumber || undefined,
      notes: notes || undefined,
      updatedAt: new Date(),
    },
    { new: true }
  ).populate('user', 'name email phone address');

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json({ message: 'Order updated', order });
}));

// Add product (admin)
router.post('/products', adminAuth, asyncHandler(async (req, res) => {
  const { name, description, price, category, image, stock, originalPrice } = req.body;

  if (!name || !description || !price || !category || !image || stock === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const product = new Product({
    name,
    description,
    price,
    category,
    image,
    stock,
    originalPrice: originalPrice || price,
  });

  await product.save();

  res.status(201).json({
    message: 'Product created',
    product,
  });
}));

// Update product (admin)
router.put('/products/:id', adminAuth, asyncHandler(async (req, res) => {
  const { name, description, price, category, image, stock, isFeatured, originalPrice } = req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: name || undefined,
      description: description || undefined,
      price: price || undefined,
      category: category || undefined,
      image: image || undefined,
      stock: stock !== undefined ? stock : undefined,
      isFeatured: isFeatured !== undefined ? isFeatured : undefined,
      originalPrice: originalPrice || undefined,
    },
    { new: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ message: 'Product updated', product });
}));

// Delete product (admin)
router.delete('/products/:id', adminAuth, asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ message: 'Product deleted' });
}));

// Get all users
router.get('/users', adminAuth, asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const skip = (page - 1) * limit;

  const users = await User.find()
    .skip(skip)
    .limit(parseInt(limit))
    .select('-password');

  const total = await User.countDocuments();

  res.json({
    users,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    },
  });
}));

// Update user role (admin)
router.put('/users/:id/role', adminAuth, asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!['customer', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select('-password');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ message: 'User role updated', user });
}));

// Get sales analytics
router.get('/analytics/sales', adminAuth, asyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $match: { paymentStatus: 'completed' },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        sales: { $sum: '$totalAmount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: -1 } },
    { $limit: 30 },
  ]);

  res.json(orders);
}));

export default router;

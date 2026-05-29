import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authMiddleware } from '../middleware/auth.js';
import Stripe from 'stripe';
import { sendOrderConfirmation, sendPaymentReceipt } from '../utils/email.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create order
router.post('/create', authMiddleware, asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod, currency = 'KES' } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No items in order' });
  }

  let totalAmount = 0;

  const orderItems = await Promise.all(items.map(async (item) => {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new Error(`Product ${item.product} not found`);
    }

    if (product.stock < item.quantity) {
      throw new Error(`${product.name} out of stock`);
    }

    totalAmount += product.price * item.quantity;

    return {
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      image: product.image,
    };
  }));

  const order = new Order({
    user: req.userId,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    totalAmount,
    currency,
    status: 'pending',
    paymentStatus: 'pending',
  });

  await order.save();

  res.status(201).json({
    message: 'Order created successfully',
    order,
  });
}));

// Get user orders
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.userId })
    .populate('items.product')
    .sort({ createdAt: -1 });

  res.json(orders);
}));

// Get single order
router.get('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('items.product')
    .populate('user', 'name email phone address');

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  if (order.user._id.toString() !== req.userId && req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  res.json(order);
}));

// Stripe Payment Intent
router.post('/payment-intent', authMiddleware, asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  if (order.user.toString() !== req.userId) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  // Convert to cents for Stripe
  const amount = Math.round(order.totalAmount * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: order.currency.toLowerCase(),
    metadata: { orderId: order._id.toString() },
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
}));

// Confirm payment
router.post('/confirm-payment', authMiddleware, asyncHandler(async (req, res) => {
  const { orderId, transactionId, paymentMethod } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.paymentStatus = 'completed';
  order.status = 'processing';
  order.transactionId = transactionId;
  order.updatedAt = new Date();

  // Reduce stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(
      item.product,
      { $inc: { stock: -item.quantity } }
    );
  }

  await order.save();

  // Clear cart
  await Cart.findOneAndUpdate({ user: req.userId }, { items: [] });

  // Send emails
  const user = await order.populate('user');
  await sendOrderConfirmation(user.user.email, order);
  await sendPaymentReceipt(user.user.email, order);

  res.json({
    message: 'Payment confirmed successfully',
    order,
  });
}));

export default router;

# SmartShop MEVN Ecommerce Platform

A full-stack ecommerce platform built with MongoDB, Express, Vue 3, and Node.js, featuring multi-payment integration and admin dashboard.

## Features

### Customer Features
- **User Authentication**: Secure registration and login with JWT
- **Product Browsing**: Search, filter by category, sort by price/rating
- **Shopping Cart**: Add/remove items, update quantities with real-time sync
- **Wishlist**: Save favorite products for later
- **Checkout**: Multi-step checkout with address validation
- **Multiple Payment Methods**:
  - Stripe (Credit/Debit Cards)
  - M-Pesa (Mobile Money)
  - PayPal
  - Bitcoin
- **Order Tracking**: View order history and status updates
- **User Profile**: Manage personal information and shipping addresses
- **Dark Mode**: Toggle between light and dark themes

### Admin Features
- **Dashboard**: Key metrics (users, products, orders, revenue)
- **Order Management**: View, update status, track shipments
- **Product Management**: Add, edit, delete products (coming soon)
- **User Management**: View users, manage roles
- **Sales Analytics**: Daily sales reports and trends

## Project Structure

```
smartshop-ecommerce/
├── api/
│   ├── models/               # MongoDB Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Cart.js
│   │   └── Wishlist.js
│   ├── routes/               # API endpoints
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── cart.js
│   │   ├── wishlist.js
│   │   └── admin.js
│   ├── middleware/           # Express middleware
│   │   ├── auth.js           # JWT authentication
│   │   └── errorHandler.js   # Error handling
│   ├── utils/
│   │   └── email.js          # Email notifications
│   ├── index.js              # Express server
│   └── [...other files]
├── frontend/
│   ├── src/
│   │   ├── pages/            # Vue page components
│   │   │   ├── Home.vue
│   │   │   ├── Products.vue
│   │   │   ├── ProductDetail.vue
│   │   │   ├── Cart.vue
│   │   │   ├── Checkout.vue
│   │   │   ├── Payment.vue
│   │   │   ├── Orders.vue
│   │   │   ├── Wishlist.vue
│   │   │   ├── Profile.vue
│   │   │   ├── Auth/
│   │   │   │   ├── Login.vue
│   │   │   │   └── Register.vue
│   │   │   └── admin/
│   │   │       ├── Dashboard.vue
│   │   │       ├── Orders.vue
│   │   │       ├── Products.vue
│   │   │       └── Users.vue
│   │   ├── stores/           # Pinia state management
│   │   │   ├── auth.js
│   │   │   ├── product.js
│   │   │   ├── cart.js
│   │   │   └── wishlist.js
│   │   ├── router/
│   │   │   └── index.js      # Vue Router config
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── index.css         # Tailwind styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── scripts/
│   └── seed.js               # Database seeding (20 products)
├── package.json
├── .env.example
└── README.md
```

## Installation

### Prerequisites
- Node.js 16+
- MongoDB (Atlas or local)
- npm or yarn

### Backend Setup
1. Navigate to project root
2. Install dependencies: `npm install`
3. Create `.env` file:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/smartshop
JWT_SECRET=your-secret-key-here
PORT=5000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
MPESA_CONSUMER_KEY=...
MPESA_CONSUMER_SECRET=...
MPESA_PASSKEY=...
MPESA_BUSINESS_SHORT_CODE=...
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
EMAIL_USER=your@gmail.com
EMAIL_PASSWORD=your-app-password
```

4. Seed database: `npm run seed`
5. Start backend: `npm run dev:backend`

### Frontend Setup
1. Navigate to `frontend/` directory
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:5173

## Running the Application

### Development Mode (Both Frontend & Backend)
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

#### Products
- `GET /api/products` - Get all products (with filters, pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get all categories

#### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:productId` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

#### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/payment-intent` - Create Stripe payment intent
- `POST /api/orders/confirm-payment` - Confirm payment

#### Admin (requires admin role)
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `GET /api/admin/analytics/sales` - Get sales analytics

## Database Schema

### User
- `name`, `email`, `password`, `phone`
- `address` (street, city, state, zip, country)
- `role` (customer/admin)
- `avatar`, `createdAt`

### Product
- `name`, `description`, `price`, `originalPrice`
- `category` (Electronics, Fashion, Home, Sports, Books, Beauty)
- `image`, `images`, `stock`, `rating`
- `reviews` (user, name, rating, comment, createdAt)
- `isFeatured`, `createdAt`

### Order
- `user`, `items` (product, name, price, quantity, image)
- `shippingAddress`, `paymentMethod` (stripe/mpesa/paypal/bitcoin)
- `paymentStatus` (pending/completed/failed)
- `status` (pending/processing/shipped/delivered/cancelled)
- `totalAmount`, `currency`, `transactionId`, `trackingNumber`

### Cart & Wishlist
- `user`, `items/products` (product ID, quantity/addedAt)
- `updatedAt`

## Tech Stack

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT with bcryptjs
- **Payments**: Stripe, PayPal SDK, M-Pesa API, Bitcoin QR
- **Email**: Nodemailer (Gmail)

### Frontend
- **Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS
- **HTTP**: Axios
- **Build**: Vite

## Features Implemented

✅ User authentication and authorization  
✅ Product catalog with search/filter  
✅ Shopping cart and wishlist  
✅ Checkout process  
✅ Multi-payment integration (Stripe, M-Pesa, PayPal, Bitcoin)  
✅ Order management  
✅ User profiles  
✅ Admin dashboard  
✅ Product seeding (20 products across 6 categories)  
✅ Email notifications  
✅ Dark/Light theme  
✅ Responsive design

## Demo Credentials

After seeding, you can log in with any registered account. The first admin account should be created manually or via backend script.

## Future Enhancements

- Real Stripe integration with SCA/3D Secure
- Complete M-Pesa STK integration
- PayPal Express Checkout
- Bitcoin payment confirmation
- Product reviews and ratings
- Email notifications for order updates
- Inventory management
- Coupon/discount system
- Multi-currency support
- Advanced analytics
- API rate limiting

## License

MIT

## Support

For issues and feature requests, please open an issue on the repository.

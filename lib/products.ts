import { Product } from "@/lib/store-context"

export const products: Product[] = [
  // Electronics
  {
    id: "elec-1",
    name: "Samsung Galaxy S24 Ultra 256GB",
    category: "Electronics",
    price: 189999,
    originalPrice: 210000,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80",
    rating: 4.9,
    reviews: 342,
    badge: "hot",
    inStock: true,
    gender: "unisex"
  },
  {
    id: "elec-2",
    name: "Apple MacBook Air M3 13-inch",
    category: "Electronics",
    price: 175000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    rating: 4.8,
    reviews: 156,
    badge: "new",
    inStock: true,
    gender: "unisex"
  },
  {
    id: "elec-3",
    name: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    price: 45999,
    originalPrice: 52000,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80",
    rating: 4.7,
    reviews: 289,
    badge: "sale",
    inStock: true,
    gender: "unisex"
  },
  {
    id: "elec-4",
    name: "iPad Pro 12.9-inch 256GB",
    category: "Electronics",
    price: 165000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
    rating: 4.9,
    reviews: 201,
    inStock: true,
    gender: "unisex"
  },
  // Clothes - Men
  {
    id: "cloth-1",
    name: "Premium Cotton Slim Fit Shirt",
    category: "Clothes",
    price: 4500,
    originalPrice: 5500,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
    rating: 4.5,
    reviews: 89,
    badge: "sale",
    inStock: true,
    gender: "men"
  },
  {
    id: "cloth-2",
    name: "Classic Denim Jacket",
    category: "Clothes",
    price: 7999,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80",
    rating: 4.6,
    reviews: 156,
    badge: "new",
    inStock: true,
    gender: "men"
  },
  // Clothes - Women
  {
    id: "cloth-3",
    name: "Elegant Floral Maxi Dress",
    category: "Clothes",
    price: 6500,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
    rating: 4.8,
    reviews: 234,
    badge: "hot",
    inStock: true,
    gender: "women"
  },
  {
    id: "cloth-4",
    name: "Casual Summer Blouse",
    category: "Clothes",
    price: 3200,
    originalPrice: 4000,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80",
    rating: 4.4,
    reviews: 98,
    badge: "sale",
    inStock: true,
    gender: "women"
  },
  // Clothes - Kids
  {
    id: "cloth-5",
    name: "Kids Cartoon T-Shirt Set",
    category: "Clothes",
    price: 2500,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80",
    rating: 4.7,
    reviews: 145,
    badge: "new",
    inStock: true,
    gender: "kids"
  },
  // Shoes
  {
    id: "shoe-1",
    name: "Nike Air Max 270 Running Shoes",
    category: "Shoes",
    price: 18500,
    originalPrice: 22000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    rating: 4.8,
    reviews: 567,
    badge: "hot",
    inStock: true,
    gender: "unisex"
  },
  {
    id: "shoe-2",
    name: "Classic Leather Oxford Shoes",
    category: "Shoes",
    price: 12999,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&q=80",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    gender: "men"
  },
  {
    id: "shoe-3",
    name: "Women Stiletto Heels Gold",
    category: "Shoes",
    price: 8999,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80",
    rating: 4.5,
    reviews: 234,
    badge: "new",
    inStock: true,
    gender: "women"
  },
  {
    id: "shoe-4",
    name: "Kids Light-Up Sneakers",
    category: "Shoes",
    price: 4500,
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&q=80",
    rating: 4.9,
    reviews: 312,
    badge: "hot",
    inStock: true,
    gender: "kids"
  },
  // Jewellery
  {
    id: "jewel-1",
    name: "18K Gold Pendant Necklace",
    category: "Jewellery",
    price: 45000,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
    rating: 4.9,
    reviews: 123,
    badge: "new",
    inStock: true,
    gender: "women"
  },
  {
    id: "jewel-2",
    name: "Diamond Stud Earrings",
    category: "Jewellery",
    price: 35000,
    originalPrice: 42000,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    rating: 4.8,
    reviews: 89,
    badge: "sale",
    inStock: true,
    gender: "women"
  },
  {
    id: "jewel-3",
    name: "Men Silver Chain Bracelet",
    category: "Jewellery",
    price: 8500,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
    rating: 4.6,
    reviews: 156,
    inStock: true,
    gender: "men"
  },
  {
    id: "jewel-4",
    name: "Pearl Wedding Ring Set",
    category: "Jewellery",
    price: 28000,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
    rating: 4.9,
    reviews: 67,
    badge: "hot",
    inStock: true,
    gender: "women"
  },
  // Kitchen Equipment
  {
    id: "kitchen-1",
    name: "Samsung Smart French Door Fridge",
    category: "Kitchen",
    price: 185000,
    originalPrice: 210000,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80",
    rating: 4.8,
    reviews: 98,
    badge: "sale",
    inStock: true,
    gender: "unisex"
  },
  {
    id: "kitchen-2",
    name: "Instant Pot Duo 7-in-1 Pressure Cooker",
    category: "Kitchen",
    price: 15999,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80",
    rating: 4.7,
    reviews: 456,
    badge: "hot",
    inStock: true,
    gender: "unisex"
  },
  {
    id: "kitchen-3",
    name: "KitchenAid Stand Mixer",
    category: "Kitchen",
    price: 65000,
    image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=400&q=80",
    rating: 4.9,
    reviews: 234,
    badge: "new",
    inStock: true,
    gender: "unisex"
  },
  {
    id: "kitchen-4",
    name: "Nespresso Coffee Machine",
    category: "Kitchen",
    price: 32000,
    originalPrice: 38000,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80",
    rating: 4.6,
    reviews: 312,
    badge: "sale",
    inStock: true,
    gender: "unisex"
  },
  {
    id: "kitchen-5",
    name: "Philips Air Fryer XXL",
    category: "Kitchen",
    price: 28500,
    image: "https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=400&q=80",
    rating: 4.8,
    reviews: 567,
    badge: "hot",
    inStock: true,
    gender: "unisex"
  },
  {
    id: "kitchen-6",
    name: "Microwave Oven 25L",
    category: "Kitchen",
    price: 18500,
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&q=80",
    rating: 4.5,
    reviews: 189,
    inStock: true,
    gender: "unisex"
  }
]

export const categories = [
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&q=80",
    count: products.filter(p => p.category === "Electronics").length
  },
  {
    name: "Clothes",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
    count: products.filter(p => p.category === "Clothes").length
  },
  {
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80",
    count: products.filter(p => p.category === "Shoes").length
  },
  {
    name: "Jewellery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    count: products.filter(p => p.category === "Jewellery").length
  },
  {
    name: "Kitchen",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    count: products.filter(p => p.category === "Kitchen").length
  }
]

"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type Product = {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badge?: "new" | "hot" | "sale"
  inStock: boolean
  gender?: "men" | "women" | "kids" | "unisex"
}

export type CartItem = {
  product: Product
  quantity: number
}

type Currency = "KES" | "USD"

type StoreContextType = {
  cart: CartItem[]
  wishlist: string[]
  currency: Currency
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  toggleWishlist: (productId: string) => void
  setCurrency: (currency: Currency) => void
  getPrice: (priceKES: number) => string
  cartTotal: number
  cartCount: number
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

const USD_RATE = 0.0077 // 1 KES = 0.0077 USD approximately

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [currency, setCurrency] = useState<Currency>("KES")

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const getPrice = (priceKES: number) => {
    if (currency === "USD") {
      const priceUSD = priceKES * USD_RATE
      return `$${priceUSD.toFixed(2)}`
    }
    return `KES ${priceKES.toLocaleString()}`
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <StoreContext.Provider value={{
      cart,
      wishlist,
      currency,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      setCurrency,
      getPrice,
      cartTotal,
      cartCount
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

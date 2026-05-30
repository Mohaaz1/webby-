"use client"

import { Heart, ShoppingBag } from "lucide-react"
import { ProductCard } from "./product-card"
import { Product, useStore } from "@/lib/store-context"

type WishlistScreenProps = {
  products: Product[]
  onContinueShopping: () => void
}

export function WishlistScreen({ products, onContinueShopping }: WishlistScreenProps) {
  const { wishlist } = useStore()

  const wishlistProducts = products.filter(p => wishlist.includes(p.id))

  if (wishlistProducts.length === 0) {
    return (
      <div className="animate-fadeIn flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-serif text-xl font-bold text-white mb-2">Your wishlist is empty</h3>
        <p className="text-muted-foreground text-sm text-center mb-6">
          Save items you like to your wishlist
        </p>
        <button
          onClick={onContinueShopping}
          className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn p-3">
      <h2 className="font-serif text-xl font-bold text-white mb-4 px-1">
        Wishlist ({wishlistProducts.length})
      </h2>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

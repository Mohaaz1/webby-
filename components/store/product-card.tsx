"use client"

import Image from "next/image"
import { Heart, Star, Plus } from "lucide-react"
import { Product, useStore } from "@/lib/store-context"

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist, getPrice } = useStore()
  const isWishlisted = wishlist.includes(product.id)

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 hover:border-muted-foreground/50 group">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider z-10 ${
            product.badge === "new" ? "bg-primary text-white" :
            product.badge === "hot" ? "bg-gold text-white" :
            "bg-destructive text-white"
          }`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center z-10 transition-all shadow-md ${
            isWishlisted 
              ? "bg-destructive text-white" 
              : "bg-white/90 text-muted-foreground hover:bg-white hover:scale-110"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="text-xs font-semibold text-white leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span className="text-sm font-bold text-primary">{getPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[10px] text-muted-foreground line-through">
              {getPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-2.5 h-2.5 ${
                  i < Math.floor(product.rating)
                    ? "text-gold fill-gold"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="w-full py-2 border border-primary text-primary rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}

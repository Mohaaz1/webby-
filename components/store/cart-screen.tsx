"use client"

import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useStore } from "@/lib/store-context"

type CartScreenProps = {
  onCheckout: () => void
  onContinueShopping: () => void
}

export function CartScreen({ onCheckout, onContinueShopping }: CartScreenProps) {
  const { cart, updateQuantity, removeFromCart, getPrice, cartTotal } = useStore()

  const shipping = cartTotal >= 2000 ? 0 : 250
  const total = cartTotal + shipping

  if (cart.length === 0) {
    return (
      <div className="animate-fadeIn flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-serif text-xl font-bold text-white mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground text-sm text-center mb-6">
          Browse our products and add items to your cart
        </p>
        <button
          onClick={onContinueShopping}
          className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn p-3">
      <h2 className="font-serif text-xl font-bold text-white mb-4 px-1">
        Shopping Cart ({cart.length})
      </h2>

      {/* Cart Items */}
      <div className="space-y-3 mb-4">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="bg-card border border-border rounded-xl p-3 flex gap-3 shadow"
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0 relative">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white line-clamp-1 mb-1">
                {item.product.name}
              </h4>
              <p className="text-sm font-bold text-primary mb-1">
                {getPrice(item.product.price)}
              </p>
              <p className="text-[10px] text-muted-foreground">
                Subtotal: {getPrice(item.product.price * item.quantity)}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="w-6 h-6 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-bold text-white min-w-[20px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="w-6 h-6 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="text-muted-foreground hover:text-destructive transition-colors self-start p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-card border border-border rounded-xl p-4 shadow">
        {/* Promo Code */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Promo code"
            className="flex-1 px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <button className="px-4 py-2.5 bg-secondary border border-border rounded-lg text-sm font-semibold text-white hover:border-primary transition-colors">
            Apply
          </button>
        </div>

        {/* Totals */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-white font-semibold">{getPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-white font-semibold">
              {shipping === 0 ? "FREE" : getPrice(shipping)}
            </span>
          </div>
          {cartTotal < 2000 && (
            <p className="text-[10px] text-primary">
              Add {getPrice(2000 - cartTotal)} more for free delivery!
            </p>
          )}
          <div className="flex justify-between pt-3 border-t border-border">
            <span className="font-serif text-base font-bold text-white">Total</span>
            <span className="text-lg font-extrabold text-primary">{getPrice(total)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          className="w-full py-3.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

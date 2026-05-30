"use client"

import { Home, Grid3X3, ShoppingCart, Heart, User } from "lucide-react"

type Screen = "home" | "categories" | "cart" | "wishlist" | "account"

type BottomNavProps = {
  activeScreen: Screen
  setActiveScreen: (screen: Screen) => void
  cartCount: number
}

export function BottomNav({ activeScreen, setActiveScreen, cartCount }: BottomNavProps) {
  const navItems: { id: Screen; icon: typeof Home; label: string }[] = [
    { id: "home", icon: Home, label: "Home" },
    { id: "categories", icon: Grid3X3, label: "Categories" },
    { id: "cart", icon: ShoppingCart, label: "Cart" },
    { id: "wishlist", icon: Heart, label: "Wishlist" },
    { id: "account", icon: User, label: "Account" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[60px] z-50 bg-card border-t border-border flex shadow-lg">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveScreen(item.id)}
          className="flex-1 flex flex-col items-center justify-center gap-1 relative"
        >
          <div className="relative">
            <item.icon
              className={`w-5 h-5 transition-colors ${
                activeScreen === item.id ? "text-primary" : "text-muted-foreground"
              }`}
            />
            {item.id === "cart" && cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[14px] h-[14px] bg-destructive text-white text-[8px] font-bold rounded-full flex items-center justify-center px-0.5">
                {cartCount}
              </span>
            )}
          </div>
          <span
            className={`text-[9px] font-semibold uppercase tracking-wider transition-colors ${
              activeScreen === item.id ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  )
}

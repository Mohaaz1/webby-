"use client"

import Link from "next/link"
import { Search, ShoppingCart, User } from "lucide-react"
import { useStore } from "@/lib/store-context"

type HeaderProps = {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const { currency, setCurrency, cartCount } = useStore()

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-50 bg-card border-b border-border flex items-center gap-3 px-4 shadow-lg">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        <h1 className="font-serif text-lg font-extrabold text-white tracking-tight whitespace-nowrap">
          Smart<span className="text-primary">Shop</span>
        </h1>
      </Link>

      {/* Search */}
      <div className="flex-1 relative min-w-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-9 pr-4 py-2 bg-secondary border border-border rounded-full text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Currency Toggle */}
      <div className="flex bg-secondary border border-border rounded-full p-0.5 flex-shrink-0">
        <button
          onClick={() => setCurrency("KES")}
          className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
            currency === "KES" ? "bg-primary text-white" : "text-muted-foreground"
          }`}
        >
          KES
        </button>
        <button
          onClick={() => setCurrency("USD")}
          className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
            currency === "USD" ? "bg-primary text-white" : "text-muted-foreground"
          }`}
        >
          USD
        </button>
      </div>

      {/* Cart Icon */}
      <div className="relative flex-shrink-0">
        <button className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary transition-colors">
          <ShoppingCart className="w-[18px] h-[18px] text-muted-foreground" />
        </button>
        {cartCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-card px-1">
            {cartCount}
          </span>
        )}
      </div>

      {/* User Icon - Links to Login */}
      <Link 
        href="/login"
        className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary transition-colors flex-shrink-0"
      >
        <User className="w-[18px] h-[18px] text-muted-foreground" />
      </Link>
    </header>
  )
}

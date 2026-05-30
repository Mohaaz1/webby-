"use client"

import Link from "next/link"
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Settings
} from "lucide-react"

export function AccountScreen() {
  const menuItems = [
    { icon: Package, label: "My Orders", desc: "Track your orders" },
    { icon: Heart, label: "Wishlist", desc: "Items you saved" },
    { icon: MapPin, label: "Addresses", desc: "Delivery locations" },
    { icon: CreditCard, label: "Payment Methods", desc: "Cards & M-Pesa" },
    { icon: Settings, label: "Settings", desc: "Preferences" },
    { icon: HelpCircle, label: "Help & Support", desc: "FAQs and contact" },
  ]

  return (
    <div className="animate-fadeIn p-3">
      {/* Profile Header */}
      <div className="bg-card border border-border rounded-xl p-5 text-center mb-4 shadow">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-3 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="font-serif text-lg font-bold text-white mb-0.5">Guest User</h2>
        <p className="text-xs text-muted-foreground mb-4">Sign in to access your account</p>
        <Link
          href="/login"
          className="inline-block px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          Sign In / Register
        </Link>
      </div>

      {/* Menu Items */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow">
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            className={`w-full p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors text-left ${
              i < menuItems.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full mt-4 p-4 bg-card border border-border rounded-xl flex items-center gap-4 hover:bg-secondary/50 transition-colors shadow">
        <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
          <LogOut className="w-5 h-5 text-destructive" />
        </div>
        <span className="text-sm font-semibold text-destructive">Sign Out</span>
      </button>

      {/* App Info */}
      <div className="text-center mt-6 pb-4">
        <h3 className="font-serif text-lg font-bold text-white">
          Smart<span className="text-primary">Shop</span> KE
        </h3>
        <p className="text-[10px] text-muted-foreground mt-1">Version 1.0.0</p>
        <p className="text-[10px] text-muted-foreground">{"Kenya's"} Premium Online Store</p>
      </div>
    </div>
  )
}

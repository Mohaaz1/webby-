"use client"

import Image from "next/image"
import { Truck, Shield, RotateCcw, BadgeCheck, ChevronRight, Clock, Percent, Gift, Zap } from "lucide-react"
import { ProductCard } from "./product-card"
import { Product } from "@/lib/store-context"
import { categories } from "@/lib/products"

type HomeScreenProps = {
  products: Product[]
  onCategoryClick: (category: string) => void
}

// Offers data
const offers = [
  {
    id: 1,
    title: "Flash Sale",
    subtitle: "Up to 70% OFF",
    description: "Electronics & Gadgets",
    bgGradient: "from-rose-600 to-orange-500",
    icon: Zap,
    endsIn: "2h 45m",
    code: "FLASH70"
  },
  {
    id: 2,
    title: "New User",
    subtitle: "KES 500 OFF",
    description: "First order discount",
    bgGradient: "from-emerald-600 to-teal-500",
    icon: Gift,
    code: "NEWUSER500"
  },
  {
    id: 3,
    title: "Weekend Deal",
    subtitle: "Buy 2 Get 1 Free",
    description: "On all clothes",
    bgGradient: "from-blue-600 to-indigo-500",
    icon: Percent,
    endsIn: "1d 8h",
    code: "B2G1FREE"
  },
  {
    id: 4,
    title: "Free Delivery",
    subtitle: "No minimum order",
    description: "This weekend only",
    bgGradient: "from-amber-500 to-yellow-400",
    icon: Truck,
    endsIn: "2d",
    code: "FREEDEL"
  }
]

export function HomeScreen({ products, onCategoryClick }: HomeScreenProps) {
  const hotProducts = products.filter(p => p.badge === "hot").slice(0, 4)
  const newProducts = products.filter(p => p.badge === "new").slice(0, 4)
  const saleProducts = products.filter(p => p.badge === "sale").slice(0, 4)

  const trustItems = [
    { icon: Truck, title: "Free Delivery", desc: "Over KES 2K" },
    { icon: Shield, title: "Secure Pay", desc: "M-Pesa & Cards" },
    { icon: RotateCcw, title: "Easy Returns", desc: "30 Days" },
    { icon: BadgeCheck, title: "Authentic", desc: "100% Original" },
  ]

  return (
    <div className="animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative h-[200px] mx-3 mt-3 rounded-2xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
          alt="Shop Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center p-5">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[3px] mb-1">
            New Collection
          </span>
          <h2 className="font-serif text-2xl font-extrabold text-white leading-tight mb-3">
            Shop Fashion,<br />Tech & More
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => onCategoryClick("all")}
              className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Shop Now
            </button>
            <button className="px-4 py-2 bg-white/15 text-white rounded-lg text-xs font-bold border border-white/50 hover:bg-white/25 transition-colors backdrop-blur-sm">
              View Deals
            </button>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="flex mx-3 mt-3 bg-card border border-border rounded-xl overflow-hidden">
        {trustItems.map((item, i) => (
          <div 
            key={i} 
            className={`flex-1 py-2.5 px-2 text-center ${i < trustItems.length - 1 ? "border-r border-border" : ""}`}
          >
            <item.icon className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-[10px] font-bold text-white">{item.title}</p>
            <p className="text-[8px] text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Special Offers Section */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <h3 className="font-serif text-lg font-bold text-white">Special Offers</h3>
        <span className="text-xs font-semibold text-gold flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> Limited Time
        </span>
      </div>
      <div className="flex gap-3 px-3 overflow-x-auto scrollbar-hide pb-1">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`flex-shrink-0 w-[160px] p-3 rounded-xl bg-gradient-to-br ${offer.bgGradient} relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/30" />
              <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-white/20" />
            </div>
            
            <div className="relative z-10">
              <offer.icon className="w-6 h-6 text-white mb-2" />
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{offer.title}</p>
              <p className="text-lg font-extrabold text-white leading-tight">{offer.subtitle}</p>
              <p className="text-[10px] text-white/80 mt-0.5">{offer.description}</p>
              
              {offer.endsIn && (
                <div className="mt-2 flex items-center gap-1 text-[10px] text-white/90">
                  <Clock className="w-3 h-3" />
                  Ends in {offer.endsIn}
                </div>
              )}
              
              <div className="mt-2 px-2 py-1 bg-white/20 rounded text-[10px] font-bold text-white text-center backdrop-blur-sm">
                Code: {offer.code}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <h3 className="font-serif text-lg font-bold text-white">Categories</h3>
        <button 
          onClick={() => onCategoryClick("all")}
          className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-0.5"
        >
          View All <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 px-3">
        {categories.slice(0, 4).map((cat) => (
          <button
            key={cat.name}
            onClick={() => onCategoryClick(cat.name)}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:-translate-y-1 transition-all group"
          >
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-2 text-center">
              <p className="text-[10px] font-bold text-white">{cat.name}</p>
              <p className="text-[8px] text-muted-foreground">{cat.count} items</p>
            </div>
          </button>
        ))}
      </div>

      {/* Promo Banner */}
      <div 
        onClick={() => onCategoryClick("all")}
        className="mx-3 mt-4 p-4 bg-gradient-to-r from-primary to-emerald-700 rounded-xl flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div>
          <h3 className="font-serif text-base font-bold text-white mb-0.5">Weekend Flash Sale</h3>
          <p className="text-[11px] text-white/80">Up to 50% off selected items</p>
        </div>
        <span className="bg-white text-primary font-serif text-xl font-extrabold px-3 py-2 rounded-lg">
          50%
        </span>
      </div>

      {/* Hot Products */}
      {hotProducts.length > 0 && (
        <>
          <div className="flex items-center justify-between px-4 pt-5 pb-3">
            <h3 className="font-serif text-lg font-bold text-white">Hot Right Now</h3>
            <button className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-0.5">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2.5 px-3 sm:grid-cols-3 md:grid-cols-4">
            {hotProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <>
          <div className="flex items-center justify-between px-4 pt-5 pb-3">
            <h3 className="font-serif text-lg font-bold text-white">New Arrivals</h3>
            <button className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-0.5">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2.5 px-3 sm:grid-cols-3 md:grid-cols-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      {/* On Sale */}
      {saleProducts.length > 0 && (
        <>
          <div className="flex items-center justify-between px-4 pt-5 pb-3">
            <h3 className="font-serif text-lg font-bold text-white">On Sale</h3>
            <button className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-0.5">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2.5 px-3 pb-6 sm:grid-cols-3 md:grid-cols-4">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

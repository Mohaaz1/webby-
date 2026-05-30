"use client"

import Image from "next/image"
import { ProductCard } from "./product-card"
import { Product } from "@/lib/store-context"
import { categories } from "@/lib/products"

type CategoriesScreenProps = {
  products: Product[]
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  selectedGender: string | null
  setSelectedGender: (gender: string | null) => void
}

export function CategoriesScreen({ 
  products, 
  selectedCategory, 
  setSelectedCategory,
  selectedGender,
  setSelectedGender
}: CategoriesScreenProps) {
  const genders = ["all", "men", "women", "kids"]
  
  const filteredProducts = products.filter(p => {
    const categoryMatch = !selectedCategory || selectedCategory === "all" || p.category === selectedCategory
    const genderMatch = !selectedGender || selectedGender === "all" || p.gender === selectedGender || p.gender === "unisex"
    return categoryMatch && genderMatch
  })

  return (
    <div className="animate-fadeIn">
      {/* Category Grid */}
      {!selectedCategory && (
        <>
          <div className="px-4 pt-4 pb-3">
            <h2 className="font-serif text-xl font-bold text-white">Shop by Category</h2>
            <p className="text-xs text-muted-foreground mt-1">Browse our wide selection of products</p>
          </div>
          <div className="grid grid-cols-2 gap-3 px-3 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:-translate-y-1 transition-all group text-left"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-sm font-bold text-white">{cat.name}</p>
                    <p className="text-[10px] text-white/80">{cat.count} products</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Products View */}
      {selectedCategory && (
        <>
          {/* Breadcrumb */}
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center gap-2 text-xs">
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-muted-foreground hover:text-white"
              >
                Categories
              </button>
              <span className="text-muted-foreground">/</span>
              <span className="text-white font-semibold">
                {selectedCategory === "all" ? "All Products" : selectedCategory}
              </span>
            </div>
          </div>

          {/* Gender Filter */}
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {genders.map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender === "all" ? null : gender)}
                className={`px-4 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all ${
                  (selectedGender === gender) || (!selectedGender && gender === "all")
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {gender === "all" ? "All" : gender.charAt(0).toUpperCase() + gender.slice(1)}
              </button>
            ))}
          </div>

          {/* Category Filter Chips */}
          <div className="flex gap-2 px-4 pb-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-muted-foreground"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="px-4 pb-3">
            <p className="text-xs text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-2.5 px-3 pb-6 sm:grid-cols-3 md:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

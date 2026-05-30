"use client"

import { useState, useMemo } from "react"
import { StoreProvider, useStore } from "@/lib/store-context"
import { products } from "@/lib/products"
import { Header } from "@/components/store/header"
import { BottomNav } from "@/components/store/bottom-nav"
import { HomeScreen } from "@/components/store/home-screen"
import { CategoriesScreen } from "@/components/store/categories-screen"
import { CartScreen } from "@/components/store/cart-screen"
import { CheckoutScreen } from "@/components/store/checkout-screen"
import { WishlistScreen } from "@/components/store/wishlist-screen"
import { AccountScreen } from "@/components/store/account-screen"

type Screen = "home" | "categories" | "cart" | "wishlist" | "account"

function StoreContent() {
  const { cartCount } = useStore()
  const [activeScreen, setActiveScreen] = useState<Screen>("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products
    const query = searchQuery.toLowerCase()
    return products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setActiveScreen("categories")
  }

  const handleCheckout = () => {
    setShowCheckout(true)
  }

  const handleBackFromCheckout = () => {
    setShowCheckout(false)
    setActiveScreen("home")
  }

  const handleContinueShopping = () => {
    setActiveScreen("home")
  }

  return (
    <div className="min-h-screen bg-background pb-[68px] pt-14">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main>
        {showCheckout ? (
          <CheckoutScreen onBack={handleBackFromCheckout} />
        ) : (
          <>
            {activeScreen === "home" && (
              <HomeScreen 
                products={filteredProducts} 
                onCategoryClick={handleCategoryClick}
              />
            )}
            {activeScreen === "categories" && (
              <CategoriesScreen 
                products={filteredProducts}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
              />
            )}
            {activeScreen === "cart" && (
              <CartScreen 
                onCheckout={handleCheckout}
                onContinueShopping={handleContinueShopping}
              />
            )}
            {activeScreen === "wishlist" && (
              <WishlistScreen 
                products={products}
                onContinueShopping={handleContinueShopping}
              />
            )}
            {activeScreen === "account" && <AccountScreen />}
          </>
        )}
      </main>

      {!showCheckout && (
        <BottomNav 
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
          cartCount={cartCount}
        />
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Check } from "lucide-react"
import { useStore } from "@/lib/store-context"

type CheckoutScreenProps = {
  onBack: () => void
}

type PaymentMethod = "mpesa" | "paypal" | "card" | "bitcoin" | "cash"

export function CheckoutScreen({ onBack }: CheckoutScreenProps) {
  const { cart, getPrice, cartTotal } = useStore()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  // Form state
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [bitcoinAddress, setBitcoinAddress] = useState("")

  const shipping = cartTotal >= 2000 ? 0 : 250
  const total = cartTotal + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
    }, 2000)
  }

  if (orderComplete) {
    return (
      <div className="animate-fadeIn flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-white mb-2">Order Confirmed!</h2>
        <p className="text-muted-foreground text-sm text-center mb-2">
          Thank you for your order. {"We'll"} send you a confirmation shortly.
        </p>
        <p className="text-white text-sm font-semibold mb-6">
          Order Total: {getPrice(total)}
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn p-3">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="font-serif text-xl font-bold text-white">Checkout</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Delivery Information */}
        <div className="bg-card border border-border rounded-xl p-4 shadow">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="font-serif text-base font-bold text-white">Delivery Information</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Kamau"
                required
                className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <div className="flex gap-2">
                <span className="px-3 py-2.5 bg-muted border border-border rounded-lg text-sm text-white font-semibold">
                  +254
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="7XX XXX XXX"
                  required
                  className="flex-1 px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Delivery Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, building, apartment"
                required
                className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                City / Town
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select city</option>
                <option value="nairobi">Nairobi</option>
                <option value="mombasa">Mombasa</option>
                <option value="kisumu">Kisumu</option>
                <option value="nakuru">Nakuru</option>
                <option value="eldoret">Eldoret</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card border border-border rounded-xl p-4 shadow">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="font-serif text-base font-bold text-white">Payment Method</h3>
          </div>

          <div className="space-y-2">
            {/* M-Pesa */}
            <button
              type="button"
              onClick={() => setPaymentMethod("mpesa")}
              className={`w-full p-3 border rounded-lg flex items-center gap-3 transition-colors ${
                paymentMethod === "mpesa" 
                  ? "border-primary bg-primary/10" 
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                paymentMethod === "mpesa" ? "border-primary bg-primary" : "border-muted-foreground"
              }`}>
                {paymentMethod === "mpesa" && (
                  <div className="w-full h-full rounded-full bg-white scale-[0.4]" />
                )}
              </div>
              <span className="px-2 py-1 bg-[#00c853] text-white text-[10px] font-bold rounded">
                M-PESA
              </span>
              <div className="text-left flex-1">
                <p className="text-sm font-bold text-white">M-Pesa</p>
                <p className="text-[10px] text-muted-foreground">Pay via Lipa na M-Pesa</p>
              </div>
            </button>

            {/* PayPal */}
            <button
              type="button"
              onClick={() => setPaymentMethod("paypal")}
              className={`w-full p-3 border rounded-lg flex items-center gap-3 transition-colors ${
                paymentMethod === "paypal" 
                  ? "border-primary bg-primary/10" 
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                paymentMethod === "paypal" ? "border-primary bg-primary" : "border-muted-foreground"
              }`}>
                {paymentMethod === "paypal" && (
                  <div className="w-full h-full rounded-full bg-white scale-[0.4]" />
                )}
              </div>
              <span className="px-2 py-1 bg-[#003087] text-white text-[10px] font-bold rounded">
                PayPal
              </span>
              <div className="text-left flex-1">
                <p className="text-sm font-bold text-white">PayPal</p>
                <p className="text-[10px] text-muted-foreground">Secure international payment</p>
              </div>
            </button>

            {/* Card */}
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`w-full p-3 border rounded-lg flex items-center gap-3 transition-colors ${
                paymentMethod === "card" 
                  ? "border-primary bg-primary/10" 
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                paymentMethod === "card" ? "border-primary bg-primary" : "border-muted-foreground"
              }`}>
                {paymentMethod === "card" && (
                  <div className="w-full h-full rounded-full bg-white scale-[0.4]" />
                )}
              </div>
              <span className="px-2 py-1 bg-gradient-to-r from-blue-900 to-blue-600 text-white text-[10px] font-bold rounded">
                CARD
              </span>
              <div className="text-left flex-1">
                <p className="text-sm font-bold text-white">Credit/Debit Card</p>
                <p className="text-[10px] text-muted-foreground">Visa, Mastercard, Verve</p>
              </div>
            </button>

            {/* Cash on Delivery */}
            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`w-full p-3 border rounded-lg flex items-center gap-3 transition-colors ${
                paymentMethod === "cash" 
                  ? "border-primary bg-primary/10" 
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                paymentMethod === "cash" ? "border-primary bg-primary" : "border-muted-foreground"
              }`}>
                {paymentMethod === "cash" && (
                  <div className="w-full h-full rounded-full bg-white scale-[0.4]" />
                )}
              </div>
              <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded border border-amber-300">
                CASH
              </span>
              <div className="text-left flex-1">
                <p className="text-sm font-bold text-white">Cash on Delivery</p>
                <p className="text-[10px] text-muted-foreground">Pay when you receive</p>
              </div>
            </button>

            {/* Bitcoin */}
            <button
              type="button"
              onClick={() => setPaymentMethod("bitcoin")}
              className={`w-full p-3 border rounded-lg flex items-center gap-3 transition-colors ${
                paymentMethod === "bitcoin" 
                  ? "border-primary bg-primary/10" 
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                paymentMethod === "bitcoin" ? "border-primary bg-primary" : "border-muted-foreground"
              }`}>
                {paymentMethod === "bitcoin" && (
                  <div className="w-full h-full rounded-full bg-white scale-[0.4]" />
                )}
              </div>
              <span className="px-2 py-1 bg-orange-600 text-white text-[10px] font-bold rounded">
                ₿ BITCOIN
              </span>
              <div className="text-left flex-1">
                <p className="text-sm font-bold text-white">Bitcoin</p>
                <p className="text-[10px] text-muted-foreground">Pay with cryptocurrency</p>
              </div>
            </button>
          </div>

          {/* M-Pesa Panel */}
          {paymentMethod === "mpesa" && (
            <div className="mt-3 p-3 bg-emerald-950/50 border border-emerald-800 rounded-lg animate-fadeIn">
              <p className="text-xs font-bold text-emerald-400 mb-1">M-Pesa Payment</p>
              <p className="text-[10px] text-muted-foreground mb-3">
                Enter your M-Pesa registered phone number. {"You'll"} receive a payment prompt.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-2 bg-muted border border-border rounded-lg text-xs text-white font-semibold">
                  +254
                </span>
                <input
                  type="tel"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  placeholder="7XX XXX XXX"
                  className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          )}

          {/* PayPal Panel */}
          {paymentMethod === "paypal" && (
            <div className="mt-3 p-3 bg-blue-950/50 border border-blue-800 rounded-lg animate-fadeIn">
              <p className="text-xs font-bold text-blue-400 mb-1">PayPal Payment</p>
              <p className="text-[10px] text-muted-foreground">
                {"You'll"} be redirected to PayPal to complete your payment securely.
              </p>
            </div>
          )}

          {/* Card Panel */}
          {paymentMethod === "card" && (
            <div className="mt-3 space-y-3 animate-fadeIn">
              <div className="flex gap-1.5">
                {["Visa", "Mastercard", "Verve"].map((type) => (
                  <span key={type} className="px-2 py-1 bg-secondary border border-border rounded text-[10px] text-muted-foreground">
                    {type}
                  </span>
                ))}
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    Expiry
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="123"
                    className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bitcoin Panel */}
          {paymentMethod === "bitcoin" && (
            <div className="mt-3 p-3 bg-orange-950/50 border border-orange-800 rounded-lg animate-fadeIn space-y-3">
              <p className="text-xs font-bold text-orange-400 mb-2">Bitcoin Payment</p>
              <div className="bg-secondary/50 border border-orange-800/50 rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground mb-2">Send payment to:</p>
                <div className="flex gap-2 items-center">
                  <code className="flex-1 text-[11px] font-mono text-orange-300 bg-secondary px-2 py-1.5 rounded overflow-auto">
                    3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy
                  </code>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText("3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy")}
                    className="px-2 py-1.5 bg-orange-600 text-white text-[10px] font-bold rounded hover:bg-orange-700 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                  Your Bitcoin Address (for refunds)
                </label>
                <input
                  type="text"
                  value={bitcoinAddress}
                  onChange={(e) => setBitcoinAddress(e.target.value)}
                  placeholder="1A1z7agoat..."
                  className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <p className="text-[10px] text-orange-300/80">
                Pay the exact amount shown. Transaction will confirm within 10-30 minutes.
              </p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-border rounded-xl p-4 shadow">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h3 className="font-serif text-base font-bold text-white">Order Summary</h3>
          </div>

          {/* Items Preview */}
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
            {cart.map((item) => (
              <div key={item.product.id} className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-white">{getPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-white">
                {shipping === 0 ? "FREE" : getPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-border">
              <span className="font-serif text-base font-bold text-white">Total</span>
              <span className="text-xl font-extrabold text-primary">{getPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full py-4 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : `Pay ${getPrice(total)}`}
        </button>
      </form>
    </div>
  )
}

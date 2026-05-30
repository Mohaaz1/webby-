"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Check } from "lucide-react"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Sign in form state
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")

  // Register form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!signInEmail || !signInPassword) {
      setError("Please fill in all fields")
      return
    }
    if (!signInEmail.includes("@")) {
      setError("Enter a valid email address")
      return
    }
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      window.location.href = "/"
    }, 1500)
  }

  // Password validation helpers
  const hasMinLength = (password: string) => password.length >= 8
  const hasNumber = (password: string) => /\d/.test(password)
  const isPasswordValid = (password: string) => hasMinLength(password) && hasNumber(password)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!firstName || !lastName || !registerEmail || !phone || !registerPassword || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }
    if (!registerEmail.includes("@")) {
      setError("Enter a valid email address")
      return
    }
    if (!hasMinLength(registerPassword)) {
      setError("Password must be at least 8 characters")
      return
    }
    if (!hasNumber(registerPassword)) {
      setError("Password must include at least one number")
      return
    }
    if (registerPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setIsLoading(true)
    // Simulate registration
    setTimeout(() => {
      window.location.href = "/"
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)
    setTimeout(() => {
      window.location.href = "/"
    }, 1000)
  }

  const trustItems = [
    "Free delivery on orders over KES 2,000",
    "Secure M-Pesa, PayPal & Card checkout",
    "30-day hassle-free returns",
    "100% authentic products"
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[900px] min-h-[600px] bg-card rounded-2xl overflow-hidden shadow-2xl flex">
        {/* Left Visual Panel */}
        <div className="hidden md:flex flex-1 relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80"
              alt="Shopping"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d2e1a] via-[#064e3b] to-[#0d2e1a]" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-10 flex flex-col justify-between h-full text-white">
            <div>
              {/* Brand */}
              <div className="mb-8">
                <h1 className="font-serif text-3xl font-extrabold tracking-tight">
                  Smart<span className="text-emerald-400">Shop</span> KE
                </h1>
                <p className="text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase mt-1">
                  {"Kenya's"} Premium Store
                </p>
              </div>

              {/* Headline */}
              <h2 className="font-serif text-4xl font-bold leading-tight mb-4">
                Shop Fashion,<br />Tech & More.
              </h2>
              <p className="text-emerald-200 text-sm leading-relaxed max-w-xs">
                Discover thousands of products — clothes, electronics, jewellery, and shoes — delivered right to your door across Kenya.
              </p>

              {/* Trust Items */}
              <div className="mt-8 space-y-3">
                {trustItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-emerald-100 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <p className="text-emerald-400 text-xs tracking-wider">
              Trusted by 50,000+ Kenyans
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 md:flex-none md:w-[400px] p-8 md:p-10 flex flex-col justify-center overflow-y-auto bg-[#111113]">
          {/* Mobile Brand */}
          <div className="md:hidden mb-6 text-center">
            <h1 className="font-serif text-2xl font-extrabold text-white">
              Smart<span className="text-emerald-500">Shop</span> KE
            </h1>
          </div>

          <h2 className="font-serif text-2xl font-bold text-white mb-1">
            {activeTab === "signin" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            {activeTab === "signin" 
              ? "Sign in to your SmartShop account" 
              : "Join thousands of Kenyan shoppers"}
          </p>

          {/* Tabs */}
          <div className="flex bg-secondary rounded-xl p-1 mb-6">
            <button
              onClick={() => { setActiveTab("signin"); setError(""); }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "signin" 
                  ? "bg-card text-white shadow" 
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab("register"); setError(""); }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "register" 
                  ? "bg-card text-white shadow" 
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-3 mb-5">
            <button
              onClick={() => handleSocialLogin("Google")}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-secondary border border-border rounded-lg text-white text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocialLogin("Facebook")}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-secondary border border-border rounded-lg text-white text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
              </svg>
              Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-xs">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-4 text-destructive text-sm">
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              {error}
            </div>
          )}

          {/* Sign In Form */}
          {activeTab === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2.5 pr-10 bg-secondary border border-border rounded-lg text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link href="#" className="text-sm font-semibold text-primary hover:text-primary/80">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                By signing in you agree to our{" "}
                <Link href="#" className="text-primary font-semibold">Terms of Service</Link>
                {" "}and{" "}
                <Link href="#" className="text-primary font-semibold">Privacy Policy</Link>
              </p>
            </form>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Kamau"
                    className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Phone (M-Pesa)
                </label>
                <div className="flex gap-2">
                  <div className="px-3 py-2.5 bg-muted border border-border rounded-lg text-white text-sm font-semibold">
                    +254
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="7XX XXX XXX"
                    className="flex-1 px-3 py-2.5 bg-secondary border border-border rounded-lg text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Minimum 8 characters with a number"
                    className="w-full px-3 py-2.5 pr-10 bg-secondary border border-border rounded-lg text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Password Requirements Indicator */}
                {registerPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${hasMinLength(registerPassword) ? 'bg-primary' : 'bg-muted'}`}>
                        {hasMinLength(registerPassword) && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className={`text-xs ${hasMinLength(registerPassword) ? 'text-primary' : 'text-muted-foreground'}`}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${hasNumber(registerPassword) ? 'bg-primary' : 'bg-muted'}`}>
                        {hasNumber(registerPassword) && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className={`text-xs ${hasNumber(registerPassword) ? 'text-primary' : 'text-muted-foreground'}`}>
                        Contains a number
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className="w-full px-3 py-2.5 pr-10 bg-secondary border border-border rounded-lg text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                By registering you agree to our{" "}
                <Link href="#" className="text-primary font-semibold">Terms</Link>
                {" "}and{" "}
                <Link href="#" className="text-primary font-semibold">Privacy Policy</Link>
              </p>

              {/* New Member Offer */}
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 mt-4">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-primary font-bold text-sm">New member offer</p>
                    <p className="text-muted-foreground text-xs">
                      Get KES 500 off your first order and free delivery on all orders over KES 2,000.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

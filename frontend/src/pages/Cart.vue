<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div v-if="cartStore.items.length === 0" class="text-center py-16">
        <p class="text-gray-600 text-lg mb-4">Your cart is empty</p>
        <router-link to="/products" class="btn-primary">Continue Shopping</router-link>
      </div>

      <div v-else class="flex gap-8">
        <!-- Cart Items -->
        <div class="flex-1">
          <div class="space-y-4">
            <div
              v-for="item in cartStore.items"
              :key="item.product._id"
              class="card p-4 flex gap-4"
            >
              <img :src="item.product.image" :alt="item.product.name" class="w-24 h-24 object-cover rounded-lg" />
              
              <div class="flex-1">
                <router-link :to="`/product/${item.product._id}`" class="font-bold hover:text-primary">
                  {{ item.product.name }}
                </router-link>
                <p class="text-gray-600 text-sm mb-2">{{ item.product.description.substring(0, 100) }}...</p>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <button
                      @click="updateQuantity(item.product._id, item.quantity - 1)"
                      :disabled="item.quantity <= 1"
                      class="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span>{{ item.quantity }}</span>
                    <button
                      @click="updateQuantity(item.product._id, item.quantity + 1)"
                      class="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span class="font-bold">KES {{ item.product.price * item.quantity }}</span>
                  <button
                    @click="removeFromCart(item.product._id)"
                    class="text-red-600 hover:text-red-800 ml-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <aside class="w-80">
          <div class="card p-6 sticky top-24">
            <h2 class="text-xl font-bold mb-6">Order Summary</h2>
            
            <div class="space-y-4 mb-6 pb-6 border-b border-gray-300">
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span>KES {{ cartStore.cartTotal }}</span>
              </div>
              <div class="flex justify-between text-green-600">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div class="flex justify-between">
                <span>Tax:</span>
                <span>KES {{ Math.round(cartStore.cartTotal * 0.16) }}</span>
              </div>
            </div>

            <div class="flex justify-between text-xl font-bold mb-6">
              <span>Total:</span>
              <span>KES {{ Math.round(cartStore.cartTotal * 1.16) }}</span>
            </div>

            <router-link to="/checkout" class="btn-primary w-full text-center block mb-2">
              Proceed to Checkout
            </router-link>
            
            <button @click="clearCartConfirm" class="btn-secondary w-full">
              Clear Cart
            </button>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();

const updateQuantity = async (productId, quantity) => {
  try {
    await cartStore.updateCart(productId, quantity);
  } catch (error) {
    alert(error);
  }
};

const removeFromCart = async (productId) => {
  try {
    await cartStore.removeFromCart(productId);
  } catch (error) {
    alert(error);
  }
};

const clearCartConfirm = async () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    try {
      await cartStore.clearCart();
    } catch (error) {
      alert(error);
    }
  }
};

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  if (cartStore.items.length === 0) {
    await cartStore.fetchCart();
  }
});
</script>

<template>
  <div class="min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Product Details</h1>

      <div v-if="isLoading" class="text-center py-12">
        <p>Loading...</p>
      </div>

      <div v-else-if="product" class="grid md:grid-cols-2 gap-8">
        <!-- Product Image -->
        <div>
          <img :src="product.image" :alt="product.name" class="w-full rounded-lg mb-4" />
          <div class="flex gap-2 overflow-x-auto">
            <img
              v-for="(img, idx) in (product.images || [product.image])"
              :key="idx"
              :src="img"
              :alt="`Product ${idx}`"
              class="w-20 h-20 object-cover rounded cursor-pointer hover:ring-2 ring-primary"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <h2 class="text-3xl font-bold mb-2">{{ product.name }}</h2>
          
          <div class="flex items-center gap-2 mb-4">
            <div class="flex">
              <span v-for="i in 5" :key="i" class="text-yellow-500">★</span>
            </div>
            <span class="text-gray-600">({{ product.rating }} - 20 reviews)</span>
          </div>

          <div class="mb-4 pb-4 border-b border-gray-300">
            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-4xl font-bold text-primary">KES {{ product.price }}</span>
              <span v-if="product.originalPrice" class="text-xl line-through text-gray-400">KES {{ product.originalPrice }}</span>
            </div>
            <div class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {{ Math.round(((product.originalPrice - product.price) / product.originalPrice * 100) || 0) }}% OFF
            </div>
          </div>

          <p class="text-gray-700 mb-6">{{ product.description }}</p>

          <div class="mb-6">
            <h3 class="font-bold mb-2">Available Stock: <span class="text-primary">{{ product.stock }}</span></h3>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center gap-2">
                <button
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span class="w-8 text-center">{{ quantity }}</span>
                <button
                  @click="quantity = Math.min(product.stock, quantity + 1)"
                  class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <button
              @click="addToCart"
              class="btn-primary w-full py-3 text-lg"
            >
              Add to Cart
            </button>
            <button
              @click="toggleWishlist"
              :class="isInWishlist ? 'bg-red-600 text-white' : 'btn-secondary'"
              class="w-full py-3"
            >
              {{ isInWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist' }}
            </button>
          </div>

          <div class="mt-8 space-y-3 text-sm text-gray-600">
            <div class="flex gap-2">
              <span>📦</span>
              <div>
                <strong>Free Shipping</strong>
                <p>On orders over KES 5000</p>
              </div>
            </div>
            <div class="flex gap-2">
              <span>🔄</span>
              <div>
                <strong>Easy Returns</strong>
                <p>30-day return policy</p>
              </div>
            </div>
            <div class="flex gap-2">
              <span>🛡️</span>
              <div>
                <strong>Secure Payment</strong>
                <p>Multiple payment options available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';
import { useWishlistStore } from '../stores/wishlist';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();

const product = ref(null);
const isLoading = ref(true);
const quantity = ref(1);

const isInWishlist = computed(() => {
  return wishlistStore.isInWishlist(product.value?._id);
});

const addToCart = async () => {
  try {
    if (!authStore.isAuthenticated) {
      router.push('/login');
      return;
    }
    await cartStore.addToCart(product.value._id, quantity.value);
    alert('Product added to cart!');
  } catch (error) {
    alert(error);
  }
};

const toggleWishlist = async () => {
  try {
    if (!authStore.isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isInWishlist.value) {
      await wishlistStore.removeFromWishlist(product.value._id);
    } else {
      await wishlistStore.addToWishlist(product.value._id);
    }
  } catch (error) {
    alert(error);
  }
};

onMounted(async () => {
  try {
    product.value = await productStore.fetchProductById(route.params.id);

    if (authStore.isAuthenticated) {
      await wishlistStore.fetchWishlist();
    }
  } catch (error) {
    console.error('[v0] Error:', error);
    router.push('/products');
  } finally {
    isLoading.value = false;
  }
});
</script>

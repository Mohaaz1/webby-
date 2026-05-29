<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-5xl font-bold mb-6">Welcome to SmartShop</h1>
        <p class="text-xl mb-8">Discover amazing products at unbeatable prices</p>
        <router-link to="/products" class="btn-primary inline-block text-lg">Shop Now</router-link>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold mb-8">Featured Products</h2>

      <div v-if="productStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="skeleton h-64"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="product in productStore.featuredProducts"
          :key="product._id"
          class="card p-4 hover:shadow-lg transition-shadow"
        >
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-lg mb-4" />
          <h3 class="font-bold text-lg mb-2">{{ product.name }}</h3>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-yellow-500">★</span>
            <span class="text-sm text-gray-600">{{ product.rating }} (20 reviews)</span>
          </div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <span class="text-2xl font-bold text-primary">KES {{ product.price }}</span>
              <span v-if="product.originalPrice" class="ml-2 line-through text-gray-400">KES {{ product.originalPrice }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <button
              @click="addToCart(product._id, product.name)"
              class="flex-1 btn-primary text-sm"
            >
              Add to Cart
            </button>
            <button
              @click="toggleWishlist(product._id)"
              class="btn-secondary text-sm px-2"
            >
              ❤️
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8">Shop by Category</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <router-link
            v-for="category in categories"
            :key="category"
            :to="{ name: 'Products', query: { category } }"
            class="text-center p-6 bg-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <div class="text-4xl mb-2">
              {{ getCategoryEmoji(category) }}
            </div>
            <div class="font-bold">{{ category }}</div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary text-white py-16">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Join Our Community</h2>
        <p class="text-lg mb-6">Subscribe to get special offers and updates</p>
        <div class="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none"
          />
          <button class="btn-secondary">Subscribe</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';
import { useWishlistStore } from '../stores/wishlist';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();
const categories = ref([]);

const getCategoryEmoji = (category) => {
  const emojis = {
    'Electronics': '📱',
    'Fashion': '👕',
    'Home': '🏠',
    'Sports': '⚽',
    'Books': '📚',
    'Beauty': '💄',
  };
  return emojis[category] || '📦';
};

const addToCart = async (productId, productName) => {
  try {
    if (!authStore.isAuthenticated) {
      router.push('/login');
      return;
    }
    await cartStore.addToCart(productId, 1);
    alert(`${productName} added to cart!`);
  } catch (error) {
    alert(error);
  }
};

const toggleWishlist = async (productId) => {
  try {
    if (!authStore.isAuthenticated) {
      router.push('/login');
      return;
    }

    if (wishlistStore.isInWishlist(productId)) {
      await wishlistStore.removeFromWishlist(productId);
    } else {
      await wishlistStore.addToWishlist(productId);
    }
  } catch (error) {
    alert(error);
  }
};

onMounted(async () => {
  await productStore.fetchFeaturedProducts();
  await productStore.fetchCategories();
  categories.value = productStore.categories;

  if (authStore.isAuthenticated) {
    await wishlistStore.fetchWishlist();
  }
});
</script>

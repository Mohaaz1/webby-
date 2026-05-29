<template>
  <div class="min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">My Wishlist</h1>

      <div v-if="wishlistStore.items.length === 0" class="text-center py-16">
        <p class="text-gray-600 text-lg mb-4">Your wishlist is empty</p>
        <router-link to="/products" class="btn-primary">Continue Shopping</router-link>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in wishlistStore.items"
          :key="item.product._id"
          class="card p-4 hover:shadow-lg transition-shadow"
        >
          <img :src="item.product.image" :alt="item.product.name" class="w-full h-48 object-cover rounded-lg mb-4" />
          
          <router-link :to="`/product/${item.product._id}`" class="font-bold text-lg hover:text-primary block mb-2">
            {{ item.product.name }}
          </router-link>

          <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ item.product.description }}</p>

          <div class="flex items-center gap-2 mb-4">
            <span class="text-yellow-500">★</span>
            <span class="text-sm text-gray-600">{{ item.product.rating }}</span>
          </div>

          <div class="flex items-center justify-between mb-4">
            <div>
              <span class="text-2xl font-bold text-primary">KES {{ item.product.price }}</span>
              <span v-if="item.product.originalPrice" class="ml-2 line-through text-gray-400">KES {{ item.product.originalPrice }}</span>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              @click="addToCart(item.product._id, item.product.name)"
              class="flex-1 btn-primary text-sm"
            >
              Add to Cart
            </button>
            <button
              @click="removeFromWishlist(item.product._id)"
              class="btn-secondary text-sm px-2"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useWishlistStore } from '../stores/wishlist';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const authStore = useAuthStore();

const addToCart = async (productId, productName) => {
  try {
    await cartStore.addToCart(productId, 1);
    alert(`${productName} added to cart!`);
  } catch (error) {
    alert(error);
  }
};

const removeFromWishlist = async (productId) => {
  try {
    await wishlistStore.removeFromWishlist(productId);
  } catch (error) {
    alert(error);
  }
};

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  await wishlistStore.fetchWishlist();
});
</script>

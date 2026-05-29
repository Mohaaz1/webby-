<template>
  <div id="app" :class="{ dark: isDarkMode }">
    <header class="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <router-link to="/" class="text-2xl font-bold text-primary">SmartShop</router-link>

        <div class="flex-1 mx-8 hidden md:block">
          <div class="relative">
            <input
              type="text"
              placeholder="Search products..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              @keyup.enter="handleSearch"
              v-model="searchQuery"
            />
          </div>
        </div>

        <div class="flex items-center gap-4">
          <router-link
            to="/cart"
            class="relative p-2 text-gray-600 hover:text-primary"
          >
            <span class="text-xl">🛒</span>
            <span v-if="cartStore.itemCount > 0" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartStore.itemCount }}
            </span>
          </router-link>

          <button @click="isDarkMode = !isDarkMode" class="p-2 text-gray-600 hover:text-primary">
            {{ isDarkMode ? '☀️' : '🌙' }}
          </button>

          <div v-if="authStore.isAuthenticated" class="flex items-center gap-2">
            <router-link to="/profile" class="text-sm text-gray-600 hover:text-primary">
              {{ authStore.user?.name }}
            </router-link>
            <button @click="authStore.logout" class="text-sm text-red-600 hover:text-red-800">Logout</button>
          </div>

          <div v-else class="flex gap-2">
            <router-link to="/login" class="btn-secondary text-sm">Login</router-link>
            <router-link to="/register" class="btn-primary text-sm">Register</router-link>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-1">
      <router-view />
    </main>

    <footer class="bg-gray-900 text-white mt-16">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="font-bold mb-4">About</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white">About Us</a></li>
              <li><a href="#" class="hover:text-white">Blog</a></li>
              <li><a href="#" class="hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold mb-4">Support</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white">Help Center</a></li>
              <li><a href="#" class="hover:text-white">Contact Us</a></li>
              <li><a href="#" class="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold mb-4">Legal</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white">Privacy</a></li>
              <li><a href="#" class="hover:text-white">Terms</a></li>
              <li><a href="#" class="hover:text-white">Cookies</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold mb-4">Follow</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white">Twitter</a></li>
              <li><a href="#" class="hover:text-white">Facebook</a></li>
              <li><a href="#" class="hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 SmartShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { useCartStore } from './stores/cart';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const isDarkMode = ref(false);
const searchQuery = ref('');

onMounted(() => {
  authStore.initializeAuth();
  if (authStore.isAuthenticated) {
    cartStore.fetchCart();
  }

  if (localStorage.getItem('darkMode')) {
    isDarkMode.value = JSON.parse(localStorage.getItem('darkMode'));
  }
});

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'Products',
      query: { search: searchQuery.value },
    });
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app main {
  flex: 1;
}
</style>

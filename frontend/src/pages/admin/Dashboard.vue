<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div v-if="isLoading" class="text-center py-12">
        <p>Loading stats...</p>
      </div>

      <div v-else>
        <!-- Stats Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="card p-6 text-center">
            <div class="text-4xl font-bold text-primary mb-2">{{ stats.totalUsers }}</div>
            <div class="text-gray-600">Total Users</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">{{ stats.totalProducts }}</div>
            <div class="text-gray-600">Products</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl font-bold text-green-600 mb-2">{{ stats.totalOrders }}</div>
            <div class="text-gray-600">Total Orders</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl font-bold text-purple-600 mb-2">KES {{ (stats.totalRevenue / 1000).toFixed(1) }}K</div>
            <div class="text-gray-600">Total Revenue</div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link
            to="/admin/orders"
            class="card p-6 hover:shadow-lg transition-shadow text-center cursor-pointer"
          >
            <div class="text-3xl mb-3">📦</div>
            <h3 class="font-bold">Manage Orders</h3>
            <p class="text-sm text-gray-600">{{ stats.totalOrders }} orders</p>
          </router-link>

          <router-link
            to="/admin/products"
            class="card p-6 hover:shadow-lg transition-shadow text-center cursor-pointer"
          >
            <div class="text-3xl mb-3">🛍️</div>
            <h3 class="font-bold">Manage Products</h3>
            <p class="text-sm text-gray-600">{{ stats.totalProducts }} products</p>
          </router-link>

          <router-link
            to="/admin/users"
            class="card p-6 hover:shadow-lg transition-shadow text-center cursor-pointer"
          >
            <div class="text-3xl mb-3">👥</div>
            <h3 class="font-bold">Manage Users</h3>
            <p class="text-sm text-gray-600">{{ stats.totalUsers }} users</p>
          </router-link>

          <router-link
            to="/"
            class="card p-6 hover:shadow-lg transition-shadow text-center cursor-pointer"
          >
            <div class="text-3xl mb-3">📊</div>
            <h3 class="font-bold">Analytics</h3>
            <p class="text-sm text-gray-600">View reports</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();

const stats = reactive({
  totalUsers: 0,
  totalProducts: 0,
  totalOrders: 0,
  completedOrders: 0,
  totalRevenue: 0,
});

const isLoading = ref(false);

const fetchStats = async () => {
  isLoading.value = true;

  try {
    const response = await axios.get('/api/admin/stats', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    Object.assign(stats, response.data.stats);
  } catch (error) {
    console.error('[v0] Stats error:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (!authStore.isAdmin) {
    router.push('/');
    return;
  }

  fetchStats();
});
</script>

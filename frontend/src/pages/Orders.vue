<template>
  <div class="min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">My Orders</h1>

      <div v-if="isLoading" class="text-center py-12">
        <p>Loading orders...</p>
      </div>

      <div v-else-if="orders.length === 0" class="text-center py-16">
        <p class="text-gray-600 text-lg mb-4">You haven't placed any orders yet</p>
        <router-link to="/products" class="btn-primary">Start Shopping</router-link>
      </div>

      <div v-else class="space-y-6">
        <div
          v-for="order in orders"
          :key="order._id"
          class="card p-6"
        >
          <div class="flex justify-between items-start mb-4 pb-4 border-b border-gray-300">
            <div>
              <h3 class="text-lg font-bold">Order #{{ order._id.substring(0, 8) }}</h3>
              <p class="text-sm text-gray-600">{{ formatDate(order.createdAt) }}</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-primary">KES {{ order.totalAmount }}</div>
              <div :class="getStatusColor(order.status)" class="inline-block mt-2 px-3 py-1 rounded-full text-sm font-bold">
                {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <p class="text-xs text-gray-600 mb-1">Payment Status</p>
              <p :class="order.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'" class="font-bold">
                {{ order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1) }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-600 mb-1">Payment Method</p>
              <p class="font-bold">{{ order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-600 mb-1">Tracking</p>
              <p class="font-bold">{{ order.trackingNumber || 'Not available' }}</p>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <p class="text-sm font-bold mb-3">Items:</p>
            <div class="space-y-2">
              <div v-for="item in order.items" :key="item.product?._id" class="flex justify-between text-sm">
                <span>{{ item.name }} x {{ item.quantity }}</span>
                <span>KES {{ item.price * item.quantity }}</span>
              </div>
            </div>
          </div>

          <router-link
            :to="`/order/${order._id}`"
            class="text-primary hover:underline text-sm font-bold"
          >
            View Details →
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();

const orders = ref([]);
const isLoading = ref(false);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'shipped': 'bg-purple-100 text-purple-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const fetchOrders = async () => {
  isLoading.value = true;

  try {
    const response = await axios.get('/api/orders', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    orders.value = response.data;
  } catch (error) {
    console.error('[v0] Fetch orders error:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  fetchOrders();
});
</script>

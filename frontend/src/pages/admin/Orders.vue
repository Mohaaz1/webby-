<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Manage Orders</h1>
        <router-link to="/admin" class="btn-secondary">← Back to Dashboard</router-link>
      </div>

      <div v-if="isLoading" class="text-center py-12">
        <p>Loading orders...</p>
      </div>

      <div v-else class="card overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-100 border-b">
            <tr>
              <th class="px-6 py-3 text-left">Order ID</th>
              <th class="px-6 py-3 text-left">Customer</th>
              <th class="px-6 py-3 text-left">Amount</th>
              <th class="px-6 py-3 text-left">Status</th>
              <th class="px-6 py-3 text-left">Payment</th>
              <th class="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="order in orders" :key="order._id" class="hover:bg-gray-50">
              <td class="px-6 py-3">{{ order._id.substring(0, 8) }}</td>
              <td class="px-6 py-3">{{ order.user?.name }}</td>
              <td class="px-6 py-3 font-bold">KES {{ order.totalAmount }}</td>
              <td class="px-6 py-3">
                <span :class="getStatusColor(order.status)" class="px-2 py-1 rounded text-xs font-bold">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-3">
                <span :class="order.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'">
                  {{ order.paymentStatus }}
                </span>
              </td>
              <td class="px-6 py-3">
                <button @click="updateStatus(order._id)" class="text-primary hover:underline text-xs">
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();

const orders = ref([]);
const isLoading = ref(false);

const getStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'processing': 'bg-blue-100 text-blue-800',
    'shipped': 'bg-purple-100 text-purple-800',
    'delivered': 'bg-green-100 text-green-800',
  };
  return colors[status] || 'bg-gray-100';
};

const fetchOrders = async () => {
  isLoading.value = true;

  try {
    const response = await axios.get('/api/admin/orders', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    orders.value = response.data.orders;
  } catch (error) {
    console.error('[v0] Orders error:', error);
  } finally {
    isLoading.value = false;
  }
};

const updateStatus = (orderId) => {
  alert('Order status update functionality coming soon');
};

onMounted(() => {
  if (!authStore.isAdmin) {
    router.push('/');
    return;
  }

  fetchOrders();
});
</script>

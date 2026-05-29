<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Manage Products</h1>
        <router-link to="/admin" class="btn-secondary">← Back to Dashboard</router-link>
      </div>

      <div class="card overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-100 border-b">
            <tr>
              <th class="px-6 py-3 text-left">Product</th>
              <th class="px-6 py-3 text-left">Category</th>
              <th class="px-6 py-3 text-left">Price</th>
              <th class="px-6 py-3 text-left">Stock</th>
              <th class="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="product in products" :key="product._id" class="hover:bg-gray-50">
              <td class="px-6 py-3 font-bold">{{ product.name.substring(0, 30) }}</td>
              <td class="px-6 py-3">{{ product.category }}</td>
              <td class="px-6 py-3">KES {{ product.price }}</td>
              <td class="px-6 py-3">
                <span :class="product.stock > 10 ? 'text-green-600' : 'text-red-600'" class="font-bold">
                  {{ product.stock }}
                </span>
              </td>
              <td class="px-6 py-3 space-x-2">
                <button @click="editProduct(product)" class="text-primary hover:underline text-xs">Edit</button>
                <button @click="deleteProduct(product._id)" class="text-red-600 hover:underline text-xs">Delete</button>
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
import { useProductStore } from '../../stores/product';

const router = useRouter();
const authStore = useAuthStore();
const productStore = useProductStore();

const products = ref([]);

const editProduct = (product) => {
  alert('Edit product functionality coming soon');
};

const deleteProduct = (productId) => {
  alert('Delete product functionality coming soon');
};

onMounted(() => {
  if (!authStore.isAdmin) {
    router.push('/');
    return;
  }

  productStore.fetchProducts({ limit: 100 }).then(() => {
    products.value = productStore.products;
  });
});
</script>

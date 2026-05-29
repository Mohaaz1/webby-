<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Manage Users</h1>
        <router-link to="/admin" class="btn-secondary">← Back to Dashboard</router-link>
      </div>

      <div class="card overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-100 border-b">
            <tr>
              <th class="px-6 py-3 text-left">Name</th>
              <th class="px-6 py-3 text-left">Email</th>
              <th class="px-6 py-3 text-left">Role</th>
              <th class="px-6 py-3 text-left">Joined</th>
              <th class="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50">
              <td class="px-6 py-3 font-bold">{{ user.name }}</td>
              <td class="px-6 py-3">{{ user.email }}</td>
              <td class="px-6 py-3">
                <span :class="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'" class="px-2 py-1 rounded text-xs font-bold">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-3 text-xs text-gray-600">{{ formatDate(user.createdAt) }}</td>
              <td class="px-6 py-3 space-x-2">
                <button @click="changeRole(user)" class="text-primary hover:underline text-xs">Change Role</button>
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

const users = ref([]);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const changeRole = (user) => {
  alert('Change role functionality coming soon');
};

onMounted(() => {
  if (!authStore.isAdmin) {
    router.push('/');
    return;
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      users.value = response.data.users;
    } catch (error) {
      console.error('[v0] Users error:', error);
    }
  };

  fetchUsers();
});
</script>

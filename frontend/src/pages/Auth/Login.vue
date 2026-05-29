<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="card p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="input-field"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="input-field"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="btn-primary w-full py-2 disabled:opacity-50"
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="text-center mt-6 text-gray-600">
        Don&apos;t have an account?
        <router-link to="/register" class="text-primary hover:underline">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    await authStore.login(email.value, password.value);
    router.push('/');
  } catch (err) {
    error.value = err;
  } finally {
    isLoading.value = false;
  }
};
</script>

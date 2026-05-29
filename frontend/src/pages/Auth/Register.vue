<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="card p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold mb-6 text-center">Create Account</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Full Name</label>
          <input
            v-model="name"
            type="text"
            required
            class="input-field"
            placeholder="John Doe"
          />
        </div>

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
            minlength="6"
            class="input-field"
            placeholder="••••••••"
          />
          <p class="text-xs text-gray-600 mt-1">Must be at least 6 characters</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            minlength="6"
            class="input-field"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="isLoading || password !== confirmPassword"
          class="btn-primary w-full py-2 disabled:opacity-50"
        >
          {{ isLoading ? 'Creating Account...' : 'Register' }}
        </button>
      </form>

      <p class="text-center mt-6 text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-primary hover:underline">Login</router-link>
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

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const isLoading = ref(false);

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }

  error.value = '';
  isLoading.value = true;

  try {
    await authStore.register(name.value, email.value, password.value);
    router.push('/');
  } catch (err) {
    error.value = err;
  } finally {
    isLoading.value = false;
  }
};
</script>

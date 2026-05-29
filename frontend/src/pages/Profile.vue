<template>
  <div class="min-h-screen py-8">
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">My Profile</h1>

      <div v-if="isLoading" class="text-center py-12">
        <p>Loading profile...</p>
      </div>

      <div v-else class="card p-8 space-y-6">
        <form @submit.prevent="handleUpdate" class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              class="input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Email</label>
            <input
              v-model="form.email"
              type="email"
              disabled
              class="input-field bg-gray-100 cursor-not-allowed"
            />
            <p class="text-xs text-gray-600 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Phone</label>
            <input
              v-model="form.phone"
              type="tel"
              class="input-field"
              placeholder="+254..."
            />
          </div>

          <div class="border-t pt-6">
            <h2 class="text-xl font-bold mb-4">Shipping Address</h2>
            <div class="space-y-4">
              <input
                v-model="form.address.street"
                type="text"
                placeholder="Street Address"
                class="input-field"
              />
              <div class="grid md:grid-cols-2 gap-4">
                <input
                  v-model="form.address.city"
                  type="text"
                  placeholder="City"
                  class="input-field"
                />
                <input
                  v-model="form.address.state"
                  type="text"
                  placeholder="State"
                  class="input-field"
                />
              </div>
              <div class="grid md:grid-cols-2 gap-4">
                <input
                  v-model="form.address.zip"
                  type="text"
                  placeholder="ZIP Code"
                  class="input-field"
                />
                <input
                  v-model="form.address.country"
                  type="text"
                  placeholder="Country"
                  class="input-field"
                />
              </div>
            </div>
          </div>

          <div v-if="error" class="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <div v-if="success" class="bg-green-100 text-green-800 p-3 rounded-lg text-sm">
            {{ success }}
          </div>

          <button
            type="submit"
            :disabled="isSaving"
            class="btn-primary w-full py-2 disabled:opacity-50"
          >
            {{ isSaving ? 'Saving...' : 'Save Changes' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
});

const isLoading = ref(true);
const isSaving = ref(false);
const error = ref('');
const success = ref('');

const handleUpdate = async () => {
  isSaving.value = true;
  error.value = '';
  success.value = '';

  try {
    await authStore.updateProfile({
      name: form.name,
      phone: form.phone,
      address: form.address,
    });
    success.value = 'Profile updated successfully!';
    setTimeout(() => { success.value = ''; }, 3000);
  } catch (err) {
    error.value = err;
  } finally {
    isSaving.value = false;
  }
};

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  try {
    await authStore.fetchUser();
    if (authStore.user) {
      form.name = authStore.user.name || '';
      form.email = authStore.user.email || '';
      form.phone = authStore.user.phone || '';
      form.address = authStore.user.address || {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      };
    }
  } catch (err) {
    console.error('[v0] Profile error:', err);
  } finally {
    isLoading.value = false;
  }
});
</script>

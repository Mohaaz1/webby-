<template>
  <div class="min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Checkout</h1>

      <div class="grid md:grid-cols-3 gap-8">
        <!-- Checkout Form -->
        <div class="md:col-span-2">
          <form @submit.prevent="handleCheckout" class="space-y-8">
            <!-- Shipping Address -->
            <div class="card p-6">
              <h2 class="text-xl font-bold mb-4">Shipping Address</h2>
              <div class="space-y-4">
                <div class="grid md:grid-cols-2 gap-4">
                  <input
                    v-model="form.street"
                    type="text"
                    placeholder="Street Address"
                    required
                    class="input-field"
                  />
                  <input
                    v-model="form.city"
                    type="text"
                    placeholder="City"
                    required
                    class="input-field"
                  />
                </div>
                <div class="grid md:grid-cols-3 gap-4">
                  <input
                    v-model="form.state"
                    type="text"
                    placeholder="State"
                    required
                    class="input-field"
                  />
                  <input
                    v-model="form.zip"
                    type="text"
                    placeholder="ZIP Code"
                    required
                    class="input-field"
                  />
                  <input
                    v-model="form.country"
                    type="text"
                    placeholder="Country"
                    required
                    class="input-field"
                  />
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="card p-6">
              <h2 class="text-xl font-bold mb-4">Payment Method</h2>
              <div class="space-y-3">
                <label v-for="method in paymentMethods" :key="method.id" class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    :value="method.id"
                    v-model="form.paymentMethod"
                    class="mr-3"
                  />
                  <div>
                    <div class="font-bold">{{ method.name }}</div>
                    <div class="text-sm text-gray-600">{{ method.description }}</div>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="btn-primary w-full py-3 text-lg disabled:opacity-50"
            >
              {{ isLoading ? 'Processing...' : 'Continue to Payment' }}
            </button>
          </form>
        </div>

        <!-- Order Summary -->
        <aside>
          <div class="card p-6 sticky top-24">
            <h2 class="text-xl font-bold mb-6">Order Summary</h2>
            
            <div class="space-y-3 mb-6 pb-6 border-b border-gray-300">
              <div
                v-for="item in cartStore.items"
                :key="item.product._id"
                class="flex justify-between text-sm"
              >
                <span>{{ item.product.name }} x {{ item.quantity }}</span>
                <span>KES {{ item.product.price * item.quantity }}</span>
              </div>
            </div>

            <div class="space-y-3 mb-6 pb-6 border-b border-gray-300">
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span>KES {{ cartStore.cartTotal }}</span>
              </div>
              <div class="flex justify-between text-green-600">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div class="flex justify-between">
                <span>Tax (16%):</span>
                <span>KES {{ Math.round(cartStore.cartTotal * 0.16) }}</span>
              </div>
            </div>

            <div class="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span class="text-primary">KES {{ Math.round(cartStore.cartTotal * 1.16) }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();

const form = reactive({
  street: '',
  city: '',
  state: '',
  zip: '',
  country: 'Kenya',
  paymentMethod: 'stripe',
});

const isLoading = ref(false);

const paymentMethods = [
  { id: 'stripe', name: 'Credit/Debit Card', description: 'Visa, Mastercard' },
  { id: 'mpesa', name: 'M-Pesa', description: 'Mobile money' },
  { id: 'paypal', name: 'PayPal', description: 'Fast and secure' },
  { id: 'bitcoin', name: 'Bitcoin', description: 'Cryptocurrency' },
];

const handleCheckout = async () => {
  isLoading.value = true;

  try {
    const orderData = {
      items: cartStore.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      shippingAddress: {
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
      },
      paymentMethod: form.paymentMethod,
    };

    const response = await axios.post('/api/orders/create', orderData, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });

    const orderId = response.data.order._id;

    // Redirect to payment based on method
    if (form.paymentMethod === 'stripe') {
      router.push({ name: 'Payment', params: { orderId }, query: { method: 'stripe' } });
    } else if (form.paymentMethod === 'mpesa') {
      router.push({ name: 'Payment', params: { orderId }, query: { method: 'mpesa' } });
    } else {
      alert('Payment method not yet implemented');
    }
  } catch (error) {
    alert(error.response?.data?.message || 'Checkout failed');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
  }

  if (cartStore.items.length === 0) {
    router.push('/cart');
  }
});
</script>

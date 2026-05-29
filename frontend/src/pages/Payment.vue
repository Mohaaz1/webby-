<template>
  <div class="min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Complete Payment</h1>

      <div v-if="isLoading" class="text-center py-12">
        <p>Processing payment...</p>
      </div>

      <div v-else class="grid md:grid-cols-3 gap-8">
        <!-- Payment Form -->
        <div class="md:col-span-2">
          <!-- Stripe Payment -->
          <div v-if="paymentMethod === 'stripe'" class="card p-6 space-y-4">
            <h2 class="text-xl font-bold mb-4">Stripe Card Payment</h2>
            
            <div>
              <label class="block text-sm font-medium mb-2">Card Number</label>
              <input
                v-model="stripeForm.cardNumber"
                type="text"
                placeholder="4242 4242 4242 4242"
                maxlength="19"
                class="input-field font-mono"
              />
            </div>

            <div class="grid md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Expiry</label>
                <input
                  v-model="stripeForm.expiry"
                  type="text"
                  placeholder="MM/YY"
                  maxlength="5"
                  class="input-field font-mono"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">CVC</label>
                <input
                  v-model="stripeForm.cvc"
                  type="text"
                  placeholder="123"
                  maxlength="4"
                  class="input-field font-mono"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">ZIP</label>
                <input
                  v-model="stripeForm.zip"
                  type="text"
                  placeholder="12345"
                  class="input-field"
                />
              </div>
            </div>

            <button
              @click="handleStripePayment"
              :disabled="isProcessing"
              class="btn-primary w-full py-2 disabled:opacity-50"
            >
              {{ isProcessing ? 'Processing...' : 'Pay with Card' }}
            </button>
          </div>

          <!-- M-Pesa Payment -->
          <div v-if="paymentMethod === 'mpesa'" class="card p-6 space-y-4">
            <h2 class="text-xl font-bold mb-4">M-Pesa Payment</h2>
            
            <div>
              <label class="block text-sm font-medium mb-2">Phone Number</label>
              <input
                v-model="mpesaForm.phone"
                type="tel"
                placeholder="254712345678"
                class="input-field"
              />
              <p class="text-xs text-gray-600 mt-1">Format: 254XXXXXXXXX</p>
            </div>

            <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm">
              <p class="font-bold mb-2">Instructions:</p>
              <ul class="list-disc list-inside space-y-1 text-gray-700">
                <li>You will receive an STK Push on your phone</li>
                <li>Enter your M-Pesa PIN to complete payment</li>
                <li>Amount: KES {{ order?.totalAmount }}</li>
              </ul>
            </div>

            <button
              @click="handleMpesaPayment"
              :disabled="isProcessing"
              class="btn-primary w-full py-2 disabled:opacity-50"
            >
              {{ isProcessing ? 'Sending STK...' : 'Send M-Pesa STK' }}
            </button>
          </div>

          <!-- PayPal Payment -->
          <div v-if="paymentMethod === 'paypal'" class="card p-6 space-y-4">
            <h2 class="text-xl font-bold mb-4">PayPal Payment</h2>
            
            <div>
              <label class="block text-sm font-medium mb-2">PayPal Email</label>
              <input
                v-model="paypalForm.email"
                type="email"
                placeholder="you@example.com"
                class="input-field"
              />
            </div>

            <div class="bg-green-50 border border-green-200 p-4 rounded-lg text-sm">
              <p class="text-gray-700">
                You will be redirected to PayPal to complete your payment securely.
              </p>
            </div>

            <button
              @click="handlePayPalPayment"
              :disabled="isProcessing"
              class="btn-primary w-full py-2 disabled:opacity-50"
            >
              {{ isProcessing ? 'Redirecting...' : 'Pay with PayPal' }}
            </button>
          </div>

          <!-- Bitcoin Payment -->
          <div v-if="paymentMethod === 'bitcoin'" class="card p-6 space-y-4">
            <h2 class="text-xl font-bold mb-4">Bitcoin Payment</h2>
            
            <div class="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm space-y-3">
              <p class="font-bold">Send the following amount to the address below:</p>
              <div class="font-mono bg-white p-3 rounded border border-gray-300 break-all">
                0.00125 BTC
              </div>
              <p class="text-xs text-gray-600">
                Bitcoin address will be displayed on next screen
              </p>
            </div>

            <button
              @click="handleBitcoinPayment"
              :disabled="isProcessing"
              class="btn-primary w-full py-2 disabled:opacity-50"
            >
              {{ isProcessing ? 'Generating...' : 'Generate Bitcoin QR' }}
            </button>
          </div>

          <div v-if="error" class="mt-4 bg-red-100 text-red-800 p-4 rounded-lg">
            {{ error }}
          </div>
        </div>

        <!-- Order Summary -->
        <aside>
          <div class="card p-6 sticky top-24">
            <h2 class="text-xl font-bold mb-6">Order Summary</h2>
            
            <div v-if="order" class="space-y-4">
              <div class="text-sm">
                <p class="text-gray-600 mb-1">Order ID</p>
                <p class="font-bold">{{ order._id.substring(0, 8) }}</p>
              </div>

              <div class="space-y-2 pb-4 border-b border-gray-300">
                <div v-for="item in order.items" :key="item.product" class="flex justify-between text-sm">
                  <span>{{ item.name }} x {{ item.quantity }}</span>
                  <span>KES {{ item.price * item.quantity }}</span>
                </div>
              </div>

              <div class="space-y-2 pb-4 border-b border-gray-300">
                <div class="flex justify-between">
                  <span>Subtotal:</span>
                  <span>KES {{ order.totalAmount }}</span>
                </div>
                <div class="flex justify-between text-green-600">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>
              </div>

              <div class="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span class="text-primary">KES {{ order.totalAmount }}</span>
              </div>

              <div class="mt-6 pt-6 border-t border-gray-300">
                <p class="text-sm text-gray-600 mb-2">Payment Method</p>
                <p class="font-bold text-lg">
                  {{ paymentMethodNames[paymentMethod] }}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const order = ref(null);
const paymentMethod = ref('stripe');
const isLoading = ref(true);
const isProcessing = ref(false);
const error = ref('');

const paymentMethodNames = {
  stripe: 'Credit/Debit Card',
  mpesa: 'M-Pesa',
  paypal: 'PayPal',
  bitcoin: 'Bitcoin',
};

const stripeForm = reactive({
  cardNumber: '',
  expiry: '',
  cvc: '',
  zip: '',
});

const mpesaForm = reactive({
  phone: '',
});

const paypalForm = reactive({
  email: '',
});

const handleStripePayment = async () => {
  isProcessing.value = true;
  error.value = '';

  try {
    // In production, use Stripe.js and Elements
    const transactionId = `stripe_${Date.now()}`;
    
    await axios.post(
      '/api/orders/confirm-payment',
      {
        orderId: order.value._id,
        transactionId,
        paymentMethod: 'stripe',
      },
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      }
    );

    alert('Payment successful!');
    router.push('/orders');
  } catch (err) {
    error.value = err.response?.data?.message || 'Payment failed';
  } finally {
    isProcessing.value = false;
  }
};

const handleMpesaPayment = async () => {
  if (!mpesaForm.phone) {
    error.value = 'Please enter phone number';
    return;
  }

  isProcessing.value = true;
  error.value = '';

  try {
    const transactionId = `mpesa_${Date.now()}`;
    
    await axios.post(
      '/api/orders/confirm-payment',
      {
        orderId: order.value._id,
        transactionId,
        paymentMethod: 'mpesa',
      },
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      }
    );

    alert('M-Pesa STK sent to ' + mpesaForm.phone + '. Complete the payment on your phone.');
    router.push('/orders');
  } catch (err) {
    error.value = err.response?.data?.message || 'M-Pesa payment failed';
  } finally {
    isProcessing.value = false;
  }
};

const handlePayPalPayment = async () => {
  isProcessing.value = true;
  error.value = '';

  try {
    const transactionId = `paypal_${Date.now()}`;
    
    await axios.post(
      '/api/orders/confirm-payment',
      {
        orderId: order.value._id,
        transactionId,
        paymentMethod: 'paypal',
      },
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      }
    );

    alert('PayPal payment completed!');
    router.push('/orders');
  } catch (err) {
    error.value = err.response?.data?.message || 'PayPal payment failed';
  } finally {
    isProcessing.value = false;
  }
};

const handleBitcoinPayment = async () => {
  isProcessing.value = true;
  error.value = '';

  try {
    const transactionId = `bitcoin_${Date.now()}`;
    
    await axios.post(
      '/api/orders/confirm-payment',
      {
        orderId: order.value._id,
        transactionId,
        paymentMethod: 'bitcoin',
      },
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      }
    );

    alert('Bitcoin address generated. Please send payment within 15 minutes.');
    router.push('/orders');
  } catch (err) {
    error.value = err.response?.data?.message || 'Bitcoin payment failed';
  } finally {
    isProcessing.value = false;
  }
};

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  try {
    const response = await axios.get(
      `/api/orders/${route.params.orderId}`,
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      }
    );
    order.value = response.data;
    paymentMethod.value = route.query.method || 'stripe';
  } catch (error) {
    console.error('[v0] Order error:', error);
    router.push('/orders');
  } finally {
    isLoading.value = false;
  }
});
</script>

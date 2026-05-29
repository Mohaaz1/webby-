import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

const API_URL = '/api';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const isLoading = ref(false);

  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  });

  const itemCount = computed(() => {
    return items.value.reduce((count, item) => count + item.quantity, 0);
  });

  const fetchCart = async () => {
    isLoading.value = true;

    try {
      const response = await axios.get(`${API_URL}/cart`);
      items.value = response.data.items;
      return response.data;
    } catch (err) {
      console.error('[v0] Fetch cart error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`${API_URL}/cart/add`, {
        productId,
        quantity,
      });
      items.value = response.data.cart.items;
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to add to cart';
    }
  };

  const updateCart = async (productId, quantity) => {
    try {
      const response = await axios.put(`${API_URL}/cart/update/${productId}`, {
        quantity,
      });
      items.value = response.data.cart.items;
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to update cart';
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/remove/${productId}`);
      items.value = response.data.cart.items;
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to remove from cart';
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(`${API_URL}/cart/clear`);
      items.value = [];
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to clear cart';
    }
  };

  return {
    items,
    isLoading,
    cartTotal,
    itemCount,
    fetchCart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
  };
});

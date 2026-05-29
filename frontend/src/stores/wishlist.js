import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const API_URL = '/api';

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([]);
  const isLoading = ref(false);

  const fetchWishlist = async () => {
    isLoading.value = true;

    try {
      const response = await axios.get(`${API_URL}/wishlist`);
      items.value = response.data.products;
      return response.data;
    } catch (err) {
      console.error('[v0] Fetch wishlist error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post(`${API_URL}/wishlist/add`, { productId });
      items.value = response.data.wishlist.products;
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to add to wishlist';
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(`${API_URL}/wishlist/remove/${productId}`);
      items.value = response.data.wishlist.products;
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to remove from wishlist';
    }
  };

  const isInWishlist = (productId) => {
    return items.value.some(item => item.product?._id === productId);
  };

  return {
    items,
    isLoading,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
});

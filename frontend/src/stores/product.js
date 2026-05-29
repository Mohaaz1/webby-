import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

const API_URL = '/api';

export const useProductStore = defineStore('product', () => {
  const products = ref([]);
  const featuredProducts = ref([]);
  const categories = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const pagination = ref({});

  const fetchProducts = async (params = {}) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.get(`${API_URL}/products`, { params });
      products.value = response.data.products;
      pagination.value = response.data.pagination;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch products';
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchProductById = async (id) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch product';
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/featured`);
      featuredProducts.value = response.data;
      return response.data;
    } catch (err) {
      console.error('[v0] Featured products error:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/categories`);
      categories.value = response.data;
      return response.data;
    } catch (err) {
      console.error('[v0] Categories error:', err);
    }
  };

  return {
    products,
    featuredProducts,
    categories,
    isLoading,
    error,
    pagination,
    fetchProducts,
    fetchProductById,
    fetchFeaturedProducts,
    fetchCategories,
  };
});

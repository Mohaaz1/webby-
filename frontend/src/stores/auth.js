import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

const API_URL = '/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token'));
  const isLoading = ref(false);
  const error = ref(null);

  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  const setAuthHeader = () => {
    if (token.value) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const register = async (name, email, password) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      token.value = response.data.token;
      user.value = response.data.user;
      localStorage.setItem('token', token.value);
      setAuthHeader();

      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed';
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  };

  const login = async (email, password) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      token.value = response.data.token;
      user.value = response.data.user;
      localStorage.setItem('token', token.value);
      setAuthHeader();

      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed';
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      user.value = response.data.user;
      return response.data;
    } catch (err) {
      console.error('[v0] Fetch user error:', err);
      logout();
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put(`${API_URL}/auth/profile`, profileData);
      user.value = response.data.user;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Update failed';
      throw error.value;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const initializeAuth = () => {
    if (token.value) {
      setAuthHeader();
      return fetchUser();
    }
  };

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    register,
    login,
    logout,
    fetchUser,
    updateProfile,
    initializeAuth,
  };
});

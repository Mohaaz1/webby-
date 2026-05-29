<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Products</h1>

      <div class="flex gap-8">
        <!-- Filters -->
        <aside class="w-64 hidden lg:block">
          <div class="card p-6 space-y-6 sticky top-24">
            <div>
              <h3 class="font-bold mb-4">Categories</h3>
              <div class="space-y-2">
                <label v-for="cat in categories" :key="cat" class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    :checked="selectedCategory === cat"
                    @change="handleCategoryChange(cat)"
                    class="mr-2"
                  />
                  <span class="text-sm">{{ cat }}</span>
                </label>
              </div>
            </div>

            <div>
              <h3 class="font-bold mb-4">Price Range</h3>
              <div class="space-y-3">
                <label class="flex items-center cursor-pointer">
                  <input type="radio" name="price" value="" v-model="selectedPrice" @change="handleFilter" class="mr-2" />
                  <span class="text-sm">All Prices</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input type="radio" name="price" value="budget" v-model="selectedPrice" @change="handleFilter" class="mr-2" />
                  <span class="text-sm">Under KES 2000</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input type="radio" name="price" value="mid" v-model="selectedPrice" @change="handleFilter" class="mr-2" />
                  <span class="text-sm">KES 2000 - 5000</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input type="radio" name="price" value="premium" v-model="selectedPrice" @change="handleFilter" class="mr-2" />
                  <span class="text-sm">Above KES 5000</span>
                </label>
              </div>
            </div>

            <div>
              <h3 class="font-bold mb-4">Sort</h3>
              <select v-model="selectedSort" @change="handleFilter" class="w-full p-2 border border-gray-300 rounded-lg text-sm">
                <option value="">Latest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </aside>

        <!-- Products Grid -->
        <div class="flex-1">
          <div v-if="productStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="i in 6" :key="i" class="skeleton h-80"></div>
          </div>

          <div v-else-if="productStore.products.length === 0" class="text-center py-12">
            <p class="text-gray-600 text-lg">No products found. Try adjusting your filters.</p>
          </div>

          <div v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div
                v-for="product in productStore.products"
                :key="product._id"
                class="card p-4 hover:shadow-lg transition-shadow"
              >
                <router-link :to="`/product/${product._id}`" class="block">
                  <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 class="font-bold text-lg mb-2 hover:text-primary">{{ product.name }}</h3>
                </router-link>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ product.description }}</p>
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-yellow-500">★</span>
                  <span class="text-sm text-gray-600">{{ product.rating }}</span>
                </div>
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <span class="text-2xl font-bold text-primary">KES {{ product.price }}</span>
                    <span v-if="product.originalPrice" class="ml-2 line-through text-gray-400">KES {{ product.originalPrice }}</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button
                    @click="addToCart(product._id, product.name)"
                    class="flex-1 btn-primary text-sm"
                  >
                    Add Cart
                  </button>
                  <button
                    @click="toggleWishlist(product._id)"
                    class="btn-secondary text-sm px-2"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="flex justify-center gap-2">
              <button
                v-for="page in productStore.pagination.pages"
                :key="page"
                @click="goToPage(page)"
                :class="page === currentPage ? 'btn-primary' : 'btn-secondary'"
                class="px-3 py-1 text-sm"
              >
                {{ page }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';
import { useWishlistStore } from '../stores/wishlist';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();

const selectedCategory = ref('');
const selectedSort = ref('');
const selectedPrice = ref('');
const currentPage = ref(1);
const categories = ref([]);

const addToCart = async (productId, productName) => {
  try {
    if (!authStore.isAuthenticated) {
      router.push('/login');
      return;
    }
    await cartStore.addToCart(productId, 1);
    alert(`${productName} added to cart!`);
  } catch (error) {
    alert(error);
  }
};

const toggleWishlist = async (productId) => {
  try {
    if (!authStore.isAuthenticated) {
      router.push('/login');
      return;
    }

    if (wishlistStore.isInWishlist(productId)) {
      await wishlistStore.removeFromWishlist(productId);
    } else {
      await wishlistStore.addToWishlist(productId);
    }
  } catch (error) {
    alert(error);
  }
};

const handleCategoryChange = (cat) => {
  selectedCategory.value = selectedCategory.value === cat ? '' : cat;
  currentPage.value = 1;
  handleFilter();
};

const handleFilter = async () => {
  currentPage.value = 1;
  await productStore.fetchProducts({
    category: selectedCategory.value,
    sort: selectedSort.value,
    search: route.query.search,
    page: currentPage.value,
  });
};

const goToPage = async (page) => {
  currentPage.value = page;
  await productStore.fetchProducts({
    category: selectedCategory.value,
    sort: selectedSort.value,
    search: route.query.search,
    page,
  });
};

onMounted(async () => {
  await productStore.fetchCategories();
  categories.value = productStore.categories;

  if (route.query.category) {
    selectedCategory.value = route.query.category;
  }

  await handleFilter();

  if (authStore.isAuthenticated) {
    await wishlistStore.fetchWishlist();
  }
});
</script>

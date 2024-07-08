<template>
  <v-app :theme="theme">
    <!-- Header -->
    <v-app-bar app flat class="px-3 header-gradient" elevation="1">
      <v-responsive class="d-flex align-center">
        <v-icon icon="mdi-leaf" class="mr-2" color="light-green-darken-3"></v-icon>
        <v-app-bar-title class="text-h5 font-weight-bold d-none d-sm-flex">
          FreshScent
        </v-app-bar-title>
        <v-app-bar-title class="text-h6 font-weight-bold d-flex d-sm-none">
          FSSS
        </v-app-bar-title>
      </v-responsive>

      <v-spacer></v-spacer>

      <!-- Search bar with category dropdown - visible on larger screens -->
      <div class="d-none d-md-flex align-center mx-4">
        <v-select v-model="selectedCategory" :items="categories" label="Category" density="compact" variant="outlined"
          hide-details class="mr-2" style="max-width: 150px;"></v-select>
        <v-text-field v-model="searchQuery" label="Search products" prepend-inner-icon="mdi-magnify" density="compact"
          variant="outlined" hide-details style="width: 200px;"></v-text-field>
      </div>

      <!-- Menu items - visible on larger screens -->
      <div class="d-none d-md-flex">
        <v-btn v-for="item in menuItems" :key="item" variant="text" class="mx-1"
          :class="{ 'v-btn--active': item === activeItem }" @click="activeItem = item">
          {{ item }}
        </v-btn>
      </div>

      <!-- Icons - always visible -->
      <v-btn icon="mdi-shopping-outline" class="ml-2"></v-btn>
      <v-btn :icon="theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'" @click="toggleTheme"
        class="ml-2"></v-btn>

      <!-- Mobile menu icon -->
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none"></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Navigation drawer for mobile -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item" :title="item"
          @click="activeItem = item; drawer = false"></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <v-select v-model="selectedCategory" :items="categories" label="Category" density="compact" variant="outlined"
            hide-details></v-select>
        </v-list-item>
        <v-list-item>
          <v-text-field v-model="searchQuery" label="Search products" prepend-inner-icon="mdi-magnify" density="compact"
            variant="outlined" hide-details></v-text-field>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-carousel v-model="currentSlide" cycle height="100vh" hide-delimiter-background show-arrows="hover">
        <v-carousel-item v-for="(slide, i) in slides" :key="i" :src="slide.img" cover>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" md="6">
                <h1 class="text-h3 font-weight-bold mb-4 text-white">Transform Your Space with FreshScent</h1>
                <p class="text-body-1 mb-6 text-white">Experience the power of premium fragrances tailored for your
                  environment.
                  Elevate your atmosphere with our professional scenting solutions.</p>
                <v-btn color="secondary" size="large" class="mr-4">Explore Services</v-btn>
                <v-btn color="white" variant="outlined" size="large">Contact Us</v-btn>
              </v-col>
              <v-col cols="12" md="6" class="text-center">
                <v-img src="https://via.placeholder.com/500x300" alt="Scent diffuser" class="rounded-lg"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-carousel-item>

        <template v-slot:append>
          <div class="carousel-indicators">
            <v-btn v-for="(slide, i) in slides" :key="i" icon="mdi-circle" :class="{ 'active': i === currentSlide }"
              @click="currentSlide = i"></v-btn>
          </div>
        </template>
      </v-carousel>

      <v-container class="py-12">
        <v-row justify="center">
          <v-col v-for="(category, index) in displayedCategories" :key="index" cols="6" sm="4" md="3" lg="2">
            <v-card class="text-center pa-4" flat>
              <v-icon :icon="category.icon" size="x-large" color="primary" class="mb-4"></v-icon>
              <h3 class="text-subtitle-1">{{ category.name }}</h3>
            </v-card>
          </v-col>
          <v-col v-if="categoriesList.length > 5" cols="6" sm="4" md="3" lg="2">
            <v-card class="text-center pa-4" flat @click="showAllCategories">
              <v-icon icon="mdi-dots-horizontal" size="x-large" color="grey" class="mb-4"></v-icon>
              <h3 class="text-subtitle-1">More Categories</h3>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- On Sale Section -->
      <v-container fluid class="on-sale-section py-12">
        <v-row justify="center">
          <v-col cols="12" class="text-center mb-8">
            <h2 class="text-h3 font-weight-bold white--text">Hot Deals</h2>
            <p class="text-h6 white--text mt-2">Limited Time Offers on Premium Scents</p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col v-for="(item, index) in saleItems" :key="index" cols="12" sm="6" md="4" lg="3">
            <v-hover v-slot="{ isHovering, props }">
              <v-card class="mx-auto" max-width="374" v-bind="props" :elevation="isHovering ? 12 : 2"
                :class="{ 'on-hover': isHovering }">
                <v-img :src="item.image" height="250" cover class="align-end">
                  <v-card-title class="text-white bg-black bg-opacity-50">
                    {{ item.name }}
                  </v-card-title>
                </v-img>
                <v-card-text>
                  <div class="d-flex justify-space-between align-center mt-2">
                    <div>
                      <span class="text-h5 font-weight-bold primary--text">${{ item.salePrice }}</span>
                      <span class="text-body-2 text-decoration-line-through ml-2">${{ item.originalPrice }}</span>
                    </div>
                    <v-chip color="error" label>{{ item.discount }}% OFF</v-chip>
                  </div>
                  <div class="mt-4">{{ item.description }}</div>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-actions>
                  <v-btn color="primary" variant="tonal" block>
                    Add to Cart
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app class="pa-6">
      <v-row justify="center" no-gutters>
        <v-col cols="12" sm="4" class="mb-4">
          <h3 class="text-h6 mb-3 font-weight-bold">About Us</h3>
          <p class="text-body-2">FreshScent is a leading provider of premium scenting solutions. We transform spaces
            with carefully crafted fragrances, enhancing environments for businesses and homes alike.</p>
        </v-col>
        <v-col cols="12" sm="4" class="mb-4">
          <h3 class="text-h6 mb-3 font-weight-bold">Connect With Us</h3>
          <div class="d-flex mb-3">
            <v-icon v-for="icon in socialIcons" :key="icon" :icon="icon" class="mr-4" size="24"></v-icon>
          </div>
          <p class="text-body-2">Follow us for the latest updates and fresh inspiration!</p>
        </v-col>
        <v-col cols="12" sm="4" class="mb-4">
          <h3 class="text-h6 mb-3 font-weight-bold">Newsletter</h3>
          <v-text-field label="Enter your email" append-inner-icon="mdi-send" variant="outlined" density="comfortable"
            bg-color="primary-lighten-1"></v-text-field>
          <p class="text-caption mt-2">Subscribe to receive exclusive offers and news.</p>
        </v-col>
        <v-col cols="12" class="text-center mt-4">
          <p class="text-caption">&copy; {{ new Date().getFullYear() }} FreshScent. Breathe in the difference.</p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup>
import { computed, ref } from 'vue';

const theme = ref('light')
const drawer = ref(false)
const menuItems = ['Home', 'Services', 'About', 'Contact']
const socialIcons = ['mdi-facebook', 'mdi-twitter', 'mdi-instagram', 'mdi-linkedin']
const activeItem = ref('Home')

const saleItems = ref([
  {
    name: "Lavender Dream",
    image: "https://via.placeholder.com/374x250?text=Lavender+Dream",
    originalPrice: 59.99,
    salePrice: 39.99,
    discount: 33,
    description: "Calming lavender scent for a peaceful home atmosphere."
  },
  {
    name: "Citrus Burst",
    image: "https://via.placeholder.com/374x250?text=Citrus+Burst",
    originalPrice: 49.99,
    salePrice: 34.99,
    discount: 30,
    description: "Energizing blend of citrus fragrances to invigorate your space."
  },
  {
    name: "Ocean Breeze",
    image: "https://via.placeholder.com/374x250?text=Ocean+Breeze",
    originalPrice: 54.99,
    salePrice: 41.99,
    discount: 24,
    description: "Fresh, clean scent reminiscent of a coastal getaway."
  },
  {
    name: "Vanilla Comfort",
    image: "https://via.placeholder.com/374x250?text=Vanilla+Comfort",
    originalPrice: 44.99,
    salePrice: 29.99,
    discount: 33,
    description: "Warm and inviting vanilla fragrance for cozy spaces."
  }
])

const categories = [
  { title: 'All Categories', value: 'all' },
  { title: 'Home Fragrances', value: 'home' },
  { title: 'Personal Care', value: 'personal' },
  { title: 'Aromatherapy', value: 'aromatherapy' },
  { title: 'Seasonal Scents', value: 'seasonal' }
];

const categoriesList = ref([
  { name: 'Home Fragrances', icon: 'mdi-home-variant' },
  { name: 'Office Scents', icon: 'mdi-office-building' },
  { name: 'Retail Aromas', icon: 'mdi-store' },
  { name: 'Hotel Ambiance', icon: 'mdi-bed' },
  { name: 'Restaurant Scents', icon: 'mdi-silverware-fork-knife' },
  { name: 'Spa Fragrances', icon: 'mdi-spa' },
  { name: 'Event Scenting', icon: 'mdi-party-popper' },
  { name: 'Car Fresheners', icon: 'mdi-car' },
  { name: 'Seasonal Scents', icon: 'mdi-leaf' },
  { name: 'Custom Blends', icon: 'mdi-flask-empty-outline' },
])

const displayedCategories = computed(() => categoriesList.value.slice(0, 5))

const showAllCategories = () => {
  // Implement logic to show all categories, e.g., open a dialog or navigate to a new page
  console.log('Show all categories')
}
const selectedCategory = ref('all');
const searchQuery = ref('');

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const currentSlide = ref(0)
const slides = ref([
  { img: 'https://picsum.photos/1920/1080/?blur' },
  { img: 'https://picsum.photos/1920/1080/?blur' },
  { img: 'https://picsum.photos/1920/1080/?blur' },
])
</script>

<style scoped>
.v-select {
  max-width: 150px;
}

.v-application {
  font-family: 'Roboto', sans-serif;
}

.v-btn {
  text-transform: none;
  font-weight: 500;
}

.v-btn--active {
  border-bottom: 2px solid currentColor;
}

.bg-primary {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-indicators .v-btn {
  margin: 0 5px;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.carousel-indicators .v-btn.active {
  opacity: 1;
}

.on-sale-section {
  background: linear-gradient(to right, #be594e, #c2e753);
}

.on-hover {
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
}
</style>

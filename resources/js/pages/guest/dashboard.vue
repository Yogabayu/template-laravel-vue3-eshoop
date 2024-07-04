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
      <v-container class="py-8">
        <v-row align="center" justify="center">
          <v-col cols="12" md="6">
            <h1 class="text-h3 font-weight-bold mb-4">Transform Your Space with FreshScent</h1>
            <p class="text-body-1 mb-6">Experience the power of premium fragrances tailored for your environment.
              Elevate your atmosphere with our professional scenting solutions.</p>
            <v-btn color="secondary" size="large" class="mr-4">Explore Services</v-btn>
            <v-btn color="primary" variant="outlined" size="large">Contact Us</v-btn>
          </v-col>
          <v-col cols="12" md="6" class="text-center">
            <v-img src="https://via.placeholder.com/500x300" alt="Scent diffuser" class="rounded-lg"></v-img>
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
import { ref } from 'vue';

const theme = ref('light')
const drawer = ref(false)
const menuItems = ['Home', 'Services', 'About', 'Contact']
const socialIcons = ['mdi-facebook', 'mdi-twitter', 'mdi-instagram', 'mdi-linkedin']
const activeItem = ref('Home')

const categories = [
  { title: 'All Categories', value: 'all' },
  { title: 'Home Fragrances', value: 'home' },
  { title: 'Personal Care', value: 'personal' },
  { title: 'Aromatherapy', value: 'aromatherapy' },
  { title: 'Seasonal Scents', value: 'seasonal' }
];
const selectedCategory = ref('all');
const searchQuery = ref('');

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

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

/* .header-gradient {
  background: linear-gradient(45deg, #8fdc92, #81C784) !important;
} */
</style>

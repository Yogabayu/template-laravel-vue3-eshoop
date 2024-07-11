<template>
  <v-carousel v-model="currentSlide" cycle height="100vh" hide-delimiter-background show-arrows="hover"
    class="on-sale-section">
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
            <v-img src="https://via.placeholder.com/500x300" alt="Scent diffuser" class="rounded-lg" ></v-img>
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
        <v-card class="text-center pa-4 custom-rounded" flat>
          <v-icon :icon="category.icon" size="x-large" color="primary" class="mb-4"></v-icon>
          <h3 class="text-subtitle-1">{{ category.name }}</h3>
        </v-card>
      </v-col>
      <v-col v-if="categoriesList.length > 5" cols="6" sm="4" md="3" lg="2">
        <v-card class="text-center pa-4 custom-rounded" flat @click="showAllCategories">
          <v-icon icon="mdi-dots-horizontal" size="x-large" color="grey" class="mb-4"></v-icon>
          <h3 class="text-subtitle-1">More Categories</h3>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- On Sale Section -->
  <v-container class="on-sale-section py-12 custom-rounded mb-2">
    <v-row justify="center">
      <v-col cols="12" class="text-center mb-8">
        <div class="d-flex align-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="text-white mr-2">
            <path
              d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z">
            </path>
          </svg>
          <h2 class="text-h3 font-weight-bold text-white">Hot Deals</h2>
        </div>
        <p class="text-h6 text-white mt-2">Limited Time Offers on Premium Scents</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-for="(item, index) in saleItems" :key="index" cols="6" sm="6" md="4" lg="3">
        <v-hover v-slot="{ isHovering, props }">
          <v-card class="mx-auto" max-width="374" v-bind="props" :elevation="isHovering ? 12 : 2"
            :class="{ 'on-hover': isHovering }">
            <v-img :src="item.image" height="200" cover class="align-end" 
            :lazy-src="item.image">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
              <v-card-title class="text-white bg-black bg-opacity-50 text-subtitle-1">
                {{ item.name }}
              </v-card-title>
            </v-img>
            <v-card-text>
              <div class="d-flex justify-space-between align-center mt-2">
                <div>
                  <span class="text-h6 font-weight-bold primary--text">${{ item.salePrice }}</span>
                  <span class="text-caption text-decoration-line-through ml-1">${{ item.originalPrice }}</span>
                </div>
                <v-chip color="error" label size="small">{{ item.discount }}% OFF</v-chip>
              </div>
              <div class="mt-2 text-caption">{{ item.description }}</div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-actions>
              <v-btn color="primary" variant="tonal" block size="small">
                Add to Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>

  <!-- Today for You Section -->
  <v-container fluid class="today-for-you-section py-12">
    <v-row align="center" justify="space-between" class="mb-6">
      <v-col cols="12" sm="4">
        <h2 class="text-h3 font-weight-bold" :class="$vuetify.theme.dark ? 'text-white' : 'text-black'">Today's For You!
        </h2>
      </v-col>
      <v-col cols="12" sm="8">
        <v-chip-group v-model="selectedCategory" class="justify-end"
          :class="$vuetify.theme.dark ? 'text-white' : 'text-black'">
          <v-chip v-for="category in categories" :key="category.value" :value="category.value"
            :color="selectedCategory === category.value ? 'primary' : undefined"
            :variant="selectedCategory === category.value ? 'elevated' : 'outlined'">
            {{ category.title }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item, index) in todayForYouItems" :key="index" cols="12" sm="6" md="3">
        <v-card class="mx-auto" max-width="374">
          <v-img :src="item.image" height="250" cover :lazy-src="item.image">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating :model-value="item.rating" color="amber" dense half-increments readonly size="14"></v-rating>
              <div class="grey--text ms-4">{{ item.soldCount }} Sold</div>
            </v-row>
            <div class="my-4 text-subtitle-1">
              <span class="font-weight-bold">{{ item.price }}</span>
              <span v-if="item.originalPrice" class="text-decoration-line-through ms-2 text-caption grey--text">
                {{ item.originalPrice }}
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
import { computed, ref } from 'vue';

const saleItems = ref([
  {
    name: "Lavender Dream",
    image: "https://picsum.photos/1920/1080/",
    originalPrice: 59.99,
    salePrice: 39.99,
    discount: 33,
    description: "Calming lavender scent for a peaceful home atmosphere."
  },
  {
    name: "Citrus Burst",
    image: "https://picsum.photos/1920/1080/",
    originalPrice: 49.99,
    salePrice: 34.99,
    discount: 30,
    description: "Energizing blend of citrus fragrances to invigorate your space."
  },
  {
    name: "Ocean Breeze",
    image: "https://picsum.photos/1920/1080/",
    originalPrice: 54.99,
    salePrice: 41.99,
    discount: 24,
    description: "Fresh, clean scent reminiscent of a coastal getaway."
  },
  {
    name: "Vanilla Comfort",
    image: "https://picsum.photos/1920/1080/",
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
]);

const todayForYouItems = ref([
  {
    name: "UrbanEdge Men's Jeans Collection",
    image: "https://picsum.photos/1920/1080/",
    rating: 4.9,
    soldCount: "10K+",
    price: "Rp253.000",
    originalPrice: "Rp370.000"
  },
  {
    name: "Essentials Men's Long-Sleeve Oxford Shirt",
    image: "https://picsum.photos/1920/1080/",
    rating: 4.9,
    soldCount: "10K+",
    price: "Rp179.000"
  },
  {
    name: "StyleHaven Men's Fashionable Brogues",
    image: "https://picsum.photos/1920/1080/",
    rating: 4.9,
    soldCount: "8K+",
    price: "Rp199.000",
    originalPrice: "Rp325.000"
  },
  {
    name: "Essential Long-Sleeve Crewneck Shirt for Men",
    image: "https://picsum.photos/1920/1080/",
    rating: 4.9,
    soldCount: "5K+",
    price: "Rp120.000"
  }
]);

const displayedCategories = computed(() => categoriesList.value.slice(0, 5))

const showAllCategories = () => {
  // Implement logic to show all categories, e.g., open a dialog or navigate to a new page
  console.log('Show all categories')
}
const selectedCategory = ref('all');

const currentSlide = ref(0)
const slides = ref([
  { img: 'https://picsum.photos/1920/1080/' },
  { img: 'https://picsum.photos/1920/1080/' },
  { img: 'https://picsum.photos/1920/1080/' },
])
</script>

<style scoped>
/* Tambahkan gaya responsif tambahan jika diperlukan */
@media (max-width: 600px) {
  .v-card-title {
    font-size: 1rem !important;
  }
  .v-card-text {
    font-size: 0.875rem;
  }
  .text-h6 {
    font-size: 1rem !important;
  }
}
.text-white {
  color: #FFFFFF !important;
}

.text-black {
  color: #000000 !important;
}

.on-sale-section {
  background-color: #2c3e50;
}

.today-for-you-section {
  background-color: #f5f5f5;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

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

.on-hover {
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
}

.custom-rounded {
  border-radius: 20px;
  /* Adjust this value to your preference */
}
</style>

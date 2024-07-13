<template>
    <div class="shop-main-content">
      <!-- Featured Product -->
      <div class="featured-product">
        <div class="product-image">
          <img :src="featuredProduct.image" :alt="featuredProduct.name">
          <div class="image-nav">
            <span v-for="n in 4" :key="n" :class="{ active: n === 1 }"></span>
          </div>
        </div>
        <div class="product-info">
          <div class="review-summary">
            <span>{{ featuredProduct.reviewCount }} review</span>
            <div class="rating">
              <v-rating
                v-model="featuredProduct.rating"
                color="amber"
                density="compact"
                half-increments
                readonly
                size="small"
              ></v-rating>
            </div>
          </div>
          <h2 class="product-name">{{ featuredProduct.name }}</h2>
          <p class="product-price">{{ featuredProduct.price }}$</p>
          <p class="product-description">{{ featuredProduct.description }}</p>
          <div class="action-buttons">
            <v-btn color="primary" class="add-to-cart">ADD TO CART</v-btn>
            <v-btn variant="outlined" class="add-to-wishlist">Add to wish list</v-btn>
          </div>
          <div class="social-share">
            <v-btn icon="mdi-instagram" variant="text"></v-btn>
            <v-btn icon="mdi-facebook" variant="text"></v-btn>
            <v-btn icon="mdi-twitter" variant="text"></v-btn>
          </div>
        </div>
      </div>
  
      <!-- Product Grid -->
      <div class="product-grid">
        <v-row>
          <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="3">
            <v-card class="product-card">
              <v-img :src="product.image" :alt="product.name" height="200" cover>
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <v-btn icon="mdi-heart" variant="text" color="red" class="favorite-button"></v-btn>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-subtitle>{{ product.brand }}</v-card-subtitle>
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <span class="text-h6">{{ product.price }}$</span>
                  <v-rating
                    v-model="product.rating"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const featuredProduct = ref({
    name: 'SOFA "MARTA"',
    price: 750,
    rating: 4.8,
    reviewCount: 1,
    description: 'Marta is a three-sofa with a big heart that fits perfectly wherever space is limited. Smartly designed, lightweight, comfortable padded cover and uses less material - good for the planet.',
    image: 'https://example.com/marta-sofa.jpg'
  });
  
  const products = ref([
    {
      id: 1,
      name: 'Sofa "Arson"',
      brand: 'Lane Furniture',
      price: 750,
      rating: 4.8,
      image: 'https://example.com/arson-sofa.jpg'
    },
    {
      id: 2,
      name: 'Sofa "Terry"',
      brand: 'Lane Furniture',
      price: 650,
      rating: 4.8,
      image: 'https://example.com/terry-sofa.jpg'
    },
    {
      id: 3,
      name: 'Sofa "Tereza"',
      brand: 'Lane Furniture',
      price: 450,
      rating: 4.8,
      image: 'https://example.com/tereza-sofa.jpg'
    },
    {
      id: 4,
      name: 'Sofa "Loly"',
      brand: 'Lane Furniture',
      price: 550,
      rating: 4.8,
      image: 'https://example.com/loly-sofa.jpg'
    },
    // Add more products as needed
  ]);
  </script>
  
  <style scoped>
  .shop-main-content {
    padding: 2rem;
  }
  
  .featured-product {
    display: flex;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .product-image {
    flex: 1;
    position: relative;
  }
  
  .product-image img {
    width: 100%;
    border-radius: 8px;
  }
  
  .image-nav {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
  }
  
  .image-nav span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.5;
  }
  
  .image-nav span.active {
    opacity: 1;
  }
  
  .product-info {
    flex: 1;
  }
  
  .review-summary {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .product-name {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .product-price {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .social-share {
    margin-top: 1rem;
  }
  
  .product-card {
    position: relative;
  }
  
  .favorite-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  </style>

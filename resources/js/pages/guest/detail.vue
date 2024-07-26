<template>
  <div class="shop-main-content">
    <!-- Featured Product -->
    <v-card class="pa-1">
      <div class="featured-product">
        <div cols="12" md="6" class="product-image">
          <v-carousel hide-delimiter-background :show-arrows="false" class="rounded-carousel">
            <v-carousel-item v-for="(image, i) in featuredProduct.images" :key="i" :src="image"
              class="carousel-item"></v-carousel-item>
          </v-carousel>
        </div>
        <div cols="12" md="6" class="product-info">
          <div class="review-summary">
            <span>{{ featuredProduct.reviewCount }} review</span>
            <div class="rating">
              <v-rating v-model="featuredProduct.rating" color="amber" density="compact" half-increments readonly
                size="small"></v-rating>
            </div>
          </div>
          <h2 class="product-name">{{ featuredProduct.name }}</h2>
          <p class="product-price">{{ featuredProduct.price }}$</p>
          <p class="product-description">{{ featuredProduct.description }}</p>
          <div class="quantity-selector">
            <span>Kuantitas</span>
            <div class="quantity-controls">
              <v-btn icon="mdi-minus" variant="text" @click="decreaseQuantity" :disabled="quantity <= 1"></v-btn>
              <span class="quantity-value">{{ quantity }}</span>
              <v-btn icon="mdi-plus" variant="text" @click="increaseQuantity"></v-btn>
            </div>
            <span class="stock-info">tersisa {{ featuredProduct.stock }} buah</span>
          </div>
          <div class="action-buttons">
            <v-btn color="primary" class="add-to-cart" @click="openWhatsApp"><v-icon start icon="mdi-whatsapp" /> Beli
              sekarang</v-btn>
          </div>
          <div class="social-share">
            atau bagikan
            <v-btn icon="mdi-instagram" variant="text"></v-btn>
            <v-btn icon="mdi-facebook" variant="text"></v-btn>
            <v-btn icon="mdi-twitter" variant="text"></v-btn>
          </div>
        </div>
      </div>
    </v-card>
    <v-row class="mt-2">
      <v-col cols="12" md="9">
        <v-card class="pa-1">
          <div class="pa-2">
            <h3>Specification</h3>
            <v-container class="mt-1">
              <v-row v-for="specification in featuredProduct.specs" :key="specification.key">
                <v-col cols="4">
                  {{ specification.name }}
                </v-col>
                <v-col cols="1">
                  :
                </v-col>
                <v-col cols="4">
                  {{ specification.value }}
                </v-col>
              </v-row>
            </v-container>

            <v-container class="mt-1">
              <h3>Deskripsi</h3>
              <p>
                {{ featuredProduct.description }}
              </p>
            </v-container>
          </div>
        </v-card>
        <!-- Product Grid -->
        <div class="product-grid mt-3">
          <h3 class="my-2">Produk Lainnya</h3>
          <v-row v-for="i in [1,2,3,]" :key="i">
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
                    <v-rating v-model="product.rating" color="amber" density="compact" half-increments readonly
                      size="small"></v-rating>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-1">
          <div class="pa-2">
            <h3>Produk pilihan</h3>
            <v-container class="mt-1">
              <v-col v-for="product in products" :key="product.id" cols="12">
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
                      <v-rating v-model="product.rating" color="amber" density="compact" half-increments readonly
                        size="small"></v-rating>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-container>
          </div>
        </v-card>
      </v-col>
    </v-row>

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
  images: [
    'https://picsum.photos/1920/1080/',
    'https://picsum.photos/1920/1081/',
    'https://picsum.photos/1920/1082/',
    'https://picsum.photos/1920/1083/'
  ],
  specs: [
    { name: 'Dimensions', value: '200cm x 90cm x 85cm' },
    { name: 'Material', value: 'Polyester, Wood' },
    { name: 'Color', value: 'Gray' },
    { name: 'Weight', value: '45 kg' },
    { name: 'Assembly', value: 'Required' }
  ],
  stock: 10,
});

const products = ref([
  {
    id: 1,
    name: 'Sofa "Arson"',
    brand: 'Lane Furniture',
    price: 750,
    rating: 4.8,
    image: 'https://picsum.photos/1920/1080/'
  },
  {
    id: 2,
    name: 'Sofa "Terry"',
    brand: 'Lane Furniture',
    price: 650,
    rating: 4.8,
    image: 'https://picsum.photos/1920/1080/'
  },
  {
    id: 3,
    name: 'Sofa "Tereza"',
    brand: 'Lane Furniture',
    price: 450,
    rating: 4.8,
    image: 'https://picsum.photos/1920/1080/'
  },
  {
    id: 4,
    name: 'Sofa "Loly"',
    brand: 'Lane Furniture',
    price: 550,
    rating: 4.8,
    image: 'https://picsum.photos/1920/1080/'
  },
  // Add more products as needed
]);

//quantity
const quantity = ref(1);
function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function increaseQuantity() {
  if (quantity.value >= featuredProduct.value.stock) {
    quantity.value = featuredProduct.value.stock;
  } else {
    quantity.value++;
  }
}

// btn whatsapp
const whatsappMessage = computed(() => {
  return encodeURIComponent(`Halo, saya tertarik dengan ${featuredProduct.value.name} yang Anda tawarkan.%0A%0ADetil Pesanan:%0A- Produk: ${featuredProduct.value.name}%0A- Jumlah: ${quantity.value} unit%0A- Harga Satuan: Rp${featuredProduct.value.price.toLocaleString('id-ID')}%0A%0AMohon informasi mengenai ketersediaan stok dan langkah selanjutnya untuk melakukan pembelian.%0A%0ATerima kasih atas bantuan Anda.`);
});

function openWhatsApp() {
  const phoneNumber = '6282139552647'; // Ganti dengan nomor WhatsApp yang sesuai
  window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage.value}`, '_blank');
}
</script>

<style scoped>
/* quantity */
.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin: 0 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.quantity-value {
  padding: 0 1rem;
  min-width: 40px;
  text-align: center;
}


.shop-main-content {
  padding: 2rem;
}

.featured-product {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding-inline: 0.5rem;
}

.product-image {
  flex: 1;
  min-width: 300px;
}

.product-image img {
  width: 100%;
  border-radius: 10px;
}

.product-info {
  flex: 1;
  min-width: 300px;
}

@media (max-width: 959px) {
  .featured-product {
    flex-direction: column;
  }

  .product-image,
  .product-info {
    width: 100%;
  }
}

.rounded-carousel {
  border-radius: 16px;
  overflow: hidden;
}

.carousel-item {
  border-radius: 16px !important;
}

/* Gunakan :deep untuk menargetkan elemen dalam v-carousel-item */
.rounded-carousel :deep(.v-img__img) {
  border-radius: 16px;
}

/* Jika masih ada masalah, coba tambahkan ini */
.rounded-carousel :deep(.v-window__container) {
  border-radius: 16px;
}

.rounded-carousel :deep(.v-window__container .v-window-item) {
  border-radius: 16px;
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

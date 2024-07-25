<template>
  <div class="shop-container">
    <v-card class="sidebar">
      <h3 class="filter-title"><v-icon>mdi-filter-variant</v-icon> FILTER</h3>

      <div class="filter-section">
        <h4>Lokasi</h4>
        <v-checkbox v-for="location in locations" :key="location" :label="location" hide-details dense></v-checkbox>
        <v-btn text small color="grey darken-1" class="mt-2">Lainnya <v-icon small>mdi-chevron-down</v-icon></v-btn>
      </div>

      <div class="filter-section">
        <h4>Tipe Penjual</h4>
        <v-checkbox v-for="type in sellerTypes" :key="type" :label="type" hide-details dense></v-checkbox>
      </div>

      <div class="filter-section">
        <h4>Metode Pembayaran</h4>
        <v-checkbox v-for="method in paymentMethods" :key="method" :label="method" hide-details dense></v-checkbox>
      </div>

      <div class="filter-section">
        <h4>Opsi Pengiriman</h4>
        <v-checkbox v-for="option in shippingOptions" :key="option" :label="option" hide-details dense></v-checkbox>
      </div>
    </v-card>

    <v-card class="main-content">
      <div class="sort-options mt-4 mb-2">
        <v-btn-toggle v-model="sortOption" mandatory>
          <v-btn value="related" text class="text-none">Terkait</v-btn>
          <v-btn value="latest" text class="text-none">Terbaru</v-btn>
          <v-btn value="topsales" text class="text-none">Terlaris</v-btn>
        </v-btn-toggle>
        <v-select v-model="priceSort" :items="priceSortOptions" label="Harga" dense outlined hide-details
          class="price-sort"></v-select>
      </div>

      <div class="product-grid">
        <v-card v-for="product in products" :key="product.id" flat class="product-card ma-2" @click="goToProductDetail"
          style="cursor: pointer;">
          <v-img :src="product.image" height="200" contain class="grey lighten-2">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-text class="pa-2">
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price">Rp{{ product.price.toLocaleString() }}</div>
            <div class="product-sold">{{ product.sold }} Terjual</div>
          </v-card-text>
        </v-card>
      </div>

      <div class="pagination mt-4">
        <v-pagination v-model="page" :length="17" total-visible="7"></v-pagination>
      </div>
    </v-card>

    <div class="discount-banner">
      <h3 class="discount-title">Diskon</h3>
      <div class="discount-amount">Rp125</div>
      <div class="min-purchase">Min. Belanja Rp12,5RB</div>
      <v-btn color="deep-orange" block class="text-none">Klaim</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const locations = ['Jabodetabek', 'Jawa Timur', 'DI Yogyakarta', 'Sulawesi Selatan'];
const sellerTypes = ['Shopee Mall', 'Star+', 'Star'];
const paymentMethods = ['COD (Bayar di Tempat)', 'Cicilan'];
const shippingOptions = ['Instan', 'Reguler', 'Hemat', 'Same Day'];

const featuredProducts = ref([
  { id: 1, name: 'Seragam Sekolah SD Atasan Putih', price: 62000, sold: 329, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Seragam sekolah SD Rok double', price: 105000, sold: 274, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Seragam - SD atasan putih tangan', price: 62000, sold: 34, image: 'https://via.placeholder.com/150' },
]);

const products = ref([
  { id: 1, name: 'Seragam SD Woffi Kemeja Panjang Badge Special', price: 68000, sold: 100, image: 'https://via.placeholder.com/200' },
  { id: 2, name: 'Dasi Sekolah SD Karet Bordir Tutwuri Umum', price: 32550, sold: 50, image: 'https://via.placeholder.com/200' },
  { id: 3, name: 'Topi Sekolah Topi Sd Smp Sma Harga kodian isi', price: 81111, sold: 200, image: 'https://via.placeholder.com/200' },
  { id: 4, name: 'Falahcollection - [Gratis Botol Minum] Tas Ransel', price: 56500, sold: 150, image: 'https://via.placeholder.com/200' },
  { id: 5, name: 'Seragam Sekolah SD Perempuan Laki Laki', price: 130000, sold: 75, image: 'https://via.placeholder.com/200' },
]);

const page = ref(1);
const sortOption = ref('related');
const priceSort = ref('');
const priceSortOptions = ['Harga: Rendah ke Tinggi', 'Harga: Tinggi ke Rendah'];

const goToProductDetail = (productId) => {
  router.push(`/detail`);
};
</script>

<style scoped>
.shop-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.sidebar {
  width: 250px;
  padding: 16px;
  border-radius: 4px;
}

.filter-title {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-section h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.main-content {
  flex-grow: 1;
  padding: 16px;
  border-radius: 4px;
}

.search-result {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-result h2 {
  font-size: 1.2rem;
  font-weight: 600;
}

.featured-shop {
  margin-bottom: 20px;
}

.product-showcase {
  display: flex;
  overflow-x: auto;
  margin-bottom: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.product-card {
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.3s;
}

.product-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-name {
  font-size: 0.9rem;
  margin-bottom: 4px;
  color: #222;
}

.product-price {
  font-size: 1rem;
  font-weight: 600;
  color: #ee4d2d;
}

.product-sold {
  font-size: 0.8rem;
  color: #757575;
}

.sort-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-sort {
  width: 200px;
}

.pagination {
  display: flex;
  justify-content: center;
}

.discount-banner {
  width: 200px;
  padding: 15px;
  background-color: #FFF0F0;
  border: 1px solid #FFD6D6;
  border-radius: 4px;
}

.discount-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.discount-amount {
  font-size: 24px;
  font-weight: bold;
  color: #ee4d2d;
}

.min-purchase {
  font-size: 12px;
  margin-bottom: 10px;
  color: #757575;
}
</style>

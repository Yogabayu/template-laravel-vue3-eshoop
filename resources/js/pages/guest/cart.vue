<template>
    <v-container>
        <!-- Voucher Banner -->
        <!-- <v-alert type="info" prominent class="mb-4">
            <v-icon start icon="mdi-ticket-percent"></v-icon>
            Pilih voucher Gratis Ongkir untuk menikmati Gratis Ongkir
        </v-alert> -->

        <!-- Product Table -->
        <v-card>
            <v-data-table :headers="headers" :items="cartItems" item-key="id" class="elevation-1">
                <template v-slot:item.product="{ item }">
                    <v-checkbox v-model="item.selected"></v-checkbox>
                    {{ item.product.name }}
                </template>

                <template v-slot:item.price="{ item }">
                    {{ formatCurrency(item.product.price) }}
                </template>

                <template v-slot:item.quantity="{ item }">
                    <v-btn icon="mdi-minus" @click="decreaseQuantity(item)"></v-btn>
                    {{ item.quantity }}
                    <v-btn icon="mdi-plus" @click="increaseQuantity(item)"></v-btn>
                </template>

                <template v-slot:item.total="{ item }">
                    {{ formatCurrency(item.product.price * item.quantity) }}
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-btn color="error" @click="removeItem(item)">Hapus</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <!-- Shipping Info -->
        <!-- <v-alert type="info" class="mt-4">
            Gratis Ongkir s/d Rp15.000 dengan min. belanja Rp0; Gratis Ongkir s/d Rp250.000 dengan min. belanja
            Rp3.000.000
            <v-btn text>Pelajari lebih lanjut</v-btn>
        </v-alert> -->

        <!-- Voucher Input -->
        <!-- <v-text-field label="Voucher Shopee" append-icon="mdi-ticket-percent" class="mt-4"></v-text-field> -->

        <!-- Total and Checkout -->
        <v-row align="center" justify="space-between" class="mt-4">
            <v-col cols="auto">
                <v-checkbox label="Pilih Semua (2)"></v-checkbox>
                <v-btn text color="error">Hapus</v-btn>
                <v-btn text color="primary">Hapus produk dari Penjual tidak aktif</v-btn>
                <v-btn text color="primary">Tambahkan ke Favorit</v-btn>
            </v-col>
            <v-col cols="auto">
                <div>Total ({{ selectedItems }} produk): {{ formatCurrency(totalPrice) }}</div>
                <v-btn color="error" x-large class="mt-2">Checkout</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { computed, ref } from 'vue';

const headers = [
    { title: 'Produk', key: 'product' },
    { title: 'Harga Satuan', key: 'price' },
    { title: 'Kuantitas', key: 'quantity' },
    { title: 'Total Harga', key: 'total' },
    { title: 'Aksi', key: 'actions' },
];

const cartItems = ref([
    {
        id: 1,
        selected: false,
        product: { name: '(UMU SUPPLIER) DOUBLEPOW CHARGER BATERAI 4 SLOTS FOR...', price: 50000 },
        quantity: 1,
    },
    {
        id: 2,
        selected: false,
        product: { name: 'Kabel USB Powerbank Ke 12v Modem Telkomsel Orbit A1 Star 2...', price: 24389 },
        quantity: 1,
    },
]);

const selectedItems = computed(() => cartItems.value.filter(item => item.selected).length);

const totalPrice = computed(() =>
    cartItems.value.reduce((total, item) =>
        item.selected ? total + (item.product.price * item.quantity) : total, 0)
);

function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

function decreaseQuantity(item) {
    if (item.quantity > 1) item.quantity--;
}

function increaseQuantity(item) {
    item.quantity++;
}

function removeItem(item) {
    const index = cartItems.value.findIndex(i => i.id === item.id);
    if (index !== -1) {
        cartItems.value.splice(index, 1);
    }
}
</script>

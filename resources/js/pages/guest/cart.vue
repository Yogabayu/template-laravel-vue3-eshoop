<template>
    <v-container>
        <!-- Product Table -->
        <v-card>
            <v-data-table :headers="headers" :items="cartItems" item-key="id" class="elevation-1" density="comfortable"
                :mobile-breakpoint="600">
                <template v-slot:top>
                    <v-toolbar flat class="mb-2">
                        <v-toolbar-title class="text-h5 font-weight-bold">
                            <v-icon icon="mdi-cart-outline" size="large" class="mr-2"></v-icon>
                            Keranjang Belanja
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-chip color="primary" class="mr-2">
                            {{ selectedItems }} Item
                        </v-chip>
                        <v-chip color="success">
                            Total: {{ formattedTotalPrice }}
                        </v-chip>
                    </v-toolbar>
                </template>

                <!-- Slot default untuk tampilan desktop -->
                <template v-slot:item.product="{ item }">
                    <v-checkbox v-model="item.selected" @change="updateSelectedItems"></v-checkbox>
                    {{ item.product.name }}
                </template>

                <template v-slot:item.price="{ item }">
                    {{ formatCurrency(item.product.price) }}
                </template>

                <template v-slot:item.quantity="{ item }">
                    <v-card-actions class="pa-0">
                        <v-btn icon="mdi-minus" @click="decreaseQuantity(item)" variant="tonal" density="comfortable"
                            size="small" :disabled="item.quantity <= 1"></v-btn>
                        <v-text-field v-model="item.quantity" type="number" min="1" max="999" hide-details
                            density="compact" class="quantity-input mx-2" style="width: 50px;"
                            @change="updateQuantity(item)"></v-text-field>
                        <v-btn icon="mdi-plus" @click="increaseQuantity(item)" variant="tonal" density="comfortable"
                            size="small"></v-btn>
                    </v-card-actions>
                </template>

                <template v-slot:item.total="{ item }">
                    {{ formatCurrency(item.product.price * item.quantity) }}
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-btn color="error" @click="removeItem(item)" icon="mdi-delete-outline" variant="text">

                    </v-btn>
                </template>

                <!-- Slot khusus untuk tampilan mobile -->
                <template v-slot:mobile-row="{ item }">
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <v-row no-gutters>
                                    <v-col cols="8">
                                        <v-checkbox v-model="item.selected" @change="updateSelectedItems" hide-details
                                            class="mr-2"></v-checkbox>
                                        {{ item.product.name }}
                                    </v-col>
                                    <v-col cols="4" class="text-right">
                                        {{ formatCurrency(item.product.price * item.quantity) }}
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <div class="text-subtitle-1">Harga: {{ formatCurrency(item.product.price) }}
                                        </div>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-card-actions class="pa-0 justify-center">
                                            <v-btn icon="mdi-minus" @click="decreaseQuantity(item)" variant="tonal"
                                                density="comfortable" size="small"
                                                :disabled="item.quantity <= 1"></v-btn>
                                            <v-text-field v-model="item.quantity" type="number" min="1" max="999"
                                                hide-details density="compact" class="quantity-input mx-2"
                                                style="width: 50px;" @change="updateQuantity(item)"></v-text-field>
                                            <v-btn icon="mdi-plus" @click="increaseQuantity(item)" variant="tonal"
                                                density="comfortable" size="small"></v-btn>
                                        </v-card-actions>
                                    </v-col>
                                </v-row>
                                <v-btn color="error" @click="removeItem(item)" block class="mt-3">Hapus</v-btn>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </template>
            </v-data-table>
        </v-card>

        <!-- Total and Checkout -->
        <v-row align="center" justify="space-between" class="mt-4">
            <v-col cols="12" sm="8" md="6" lg="8">
                <v-card outlined class="pa-4">
                    <v-checkbox dense :label="`Pilih Semua (${cartItems.length})`" v-model="selectAll"
                        @change="toggleSelectAll" class="mb-2"></v-checkbox>
                    <v-btn-group>
                        <v-btn color="error" variant="outlined" prepend-icon="mdi-delete" @click="removeSelectedItems">
                            Hapus
                        </v-btn>
                    </v-btn-group>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4" md="6" lg="4" class="mt-4 mt-sm-0">
                <v-card outlined class="pa-4">
                    <div class="text-h6 mb-2">
                        Total ({{ selectedItems }} produk): {{ formattedTotalPrice }}
                    </div>
                    <v-btn color="error" size="large" block @click="handleCheckout">
                        Checkout
                    </v-btn>
                    <!-- Dialog untuk alert -->
                    <v-dialog v-model="showDialog" max-width="300">
                        <v-card>
                            <v-card-text>
                                {{ dialogMessage }}
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text @click="showDialog = false">OK</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { computed, ref } from 'vue';

const showDialog = ref(false);
const dialogMessage = ref('');
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

const selectAll = ref(false);

const selectedItems = computed(() => cartItems.value.filter(item => item.selected).length);

const totalPrice = computed(() =>
    cartItems.value.reduce((total, item) =>
        item.selected ? total + (item.product.price * item.quantity) : total, 0)
);

const formattedTotalPrice = computed(() => formatCurrency(totalPrice.value));

const whatsappMessage = computed(() => {
    const selectedProducts = cartItems.value.filter(item => item.selected);
    let message = "Halo, saya ingin memesan produk berikut:\n\n";

    selectedProducts.forEach(item => {
        message += `- ${item.product.name}\n`;
        message += `  Jumlah: ${item.quantity}\n`;
        message += `  Harga Satuan: ${formatCurrency(item.product.price)}\n`;
        message += `  Total: ${formatCurrency(item.product.price * item.quantity)}\n\n`;
    });

    message += `Total Pesanan: ${formattedTotalPrice.value}\n\n`;
    message += "Mohon konfirmasi ketersediaan dan proses pembayaran. Terima kasih!";

    return encodeURIComponent(message);
});

function handleCheckout() {
    if (selectedItems.value === 0) {
        dialogMessage.value = 'Silakan pilih setidaknya satu item untuk checkout.';
        showDialog.value = true;
    } else {
        openWhatsApp();
    }
}

function openWhatsApp() {
    const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp yang sesuai
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage.value}`, '_blank');
}

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

function toggleSelectAll() {
    cartItems.value.forEach(item => item.selected = selectAll.value);
}

function updateSelectedItems() {
    selectAll.value = cartItems.value.every(item => item.selected);
}

function removeSelectedItems() {
    cartItems.value = cartItems.value.filter(item => !item.selected);
    selectAll.value = false;
}

function updateQuantity(item) {
    // Memastikan kuantitas adalah angka positif
    item.quantity = Math.max(1, Math.min(999, parseInt(item.quantity) || 1));
}
</script>
<style scoped>
.quantity-input input {
    text-align: center;
}
</style>

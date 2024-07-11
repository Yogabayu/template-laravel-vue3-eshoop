<template>
  <v-app :theme="theme">
    <AppHeader @toggle-drawer="toggleDrawer" @toggle-theme="toggleTheme" :theme="theme" />
    <AppNavigator v-model:drawer="drawer" />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import AppFooter from './AppFooter.vue';
import AppHeader from './AppHeader.vue';
import AppNavigator from './AppNavigator.vue';

const theme = ref('light');
const drawer = ref(false);

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}

function toggleDrawer() {
  drawer.value = !drawer.value;
}
</script>

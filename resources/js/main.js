/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core-scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { createPinia } from 'pinia'
import Swal from 'sweetalert2'
import { createApp } from 'vue'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
app.use(vuetify)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(createPinia())
app.use(router)

// Mount vue app
app.mount('#app')

AOS.init({
  duration: 400,
  easing: 'ease-in-out',
  once: false,
  mirror: true,
  offset: 50,
});

// Define the showToast method
const showToast = (icon, title, text) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: icon,
    title: title,
    text: text
  })
}

// Make showToast method globally available
app.config.globalProperties.$showToast = showToast

/** localhost */
// app.config.globalProperties.$userPhotoUrl = 'http://localhost:8000/user/photo/';
/** development */
/** production */
app.config.globalProperties.$userPhotoUrl = 'http://shop.yogabayuap.com/user/photo/';

/**
 * Archivo main.ts alternativo usando CSS Custom Properties
 * Para usar este archivo, renombra main.ts a main-scss.ts
 * y este archivo a main.ts
 */

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from './App.vue';

// Importar estilos de PrimeVue
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// Importar variables CSS nativas
import '@/assets/css/variables.css';

// Importar estilos personalizados con CSS nativo
import '@/assets/css/layout.css';
import '@/assets/css/inicio.css';

// Nota: También necesitas importar _sri-vue-plantilla.scss
// porque contiene estilos globales de PrimeVue personalizados
import '@/assets/css/_sri-vue-plantilla.scss';

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue);

app.mount('#app');

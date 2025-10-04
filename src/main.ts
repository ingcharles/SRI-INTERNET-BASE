import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from './App.vue';

// Importar estilos de PrimeVue
// import 'primevue/resources/themes/lara-light-blue/theme.css';
// import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

// Importar estilos personalizados
// import '@/assets/css/_sri-vue-variables.scss';
// import '@/assets/css/_sri-vue-plantilla.scss';

// Importar variables CSS nativas
import '@/assets/css/variables.css';

// Importar estilos personalizados con CSS nativo
import '@/assets/css/layout.css';
import '@/assets/css/inicio.css';

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue);

app.mount('#app');

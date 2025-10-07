import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import router from './router'
import App from './App.vue'

// Importar estilos de PrimeVue
import 'primeicons/primeicons.css'

// Importar variables del sistema
import '@/assets/css/_sri_vue_variables_responsivo_v2.css'
import '@/assets/css/_sri_vue_variables_v2.css'

// Importar sistema de grid responsivo en español
import '@/assets/css/_sri_vue_responsivo_v2.css'

// Importar fuentes e iconos
import '@/assets/iconos/sri-icon/sri-icono-fuentes.min.css'
import '@/assets/iconos/sri-menu-icon/sri-menu-icon-fuentes.min.css'
import '@/assets/iconos/fontawesome/font-awesome.min.css'

// Importar estilos personalizados con CSS nativo
import '@/assets/css/_sri_vue_cabecera_v2.css'
import '@/assets/css/_sri-vue-plantilla_v2.css'
import '@/assets/css/inicio.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far, fab)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    // preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        // order: 'theme, base, primevue',
      },
    },
  },
})

app.component('FontAwesome', FontAwesomeIcon)

app.mount('#app')

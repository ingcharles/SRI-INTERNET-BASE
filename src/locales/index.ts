import { createI18n } from 'vue-i18n'

// Importar los archivos de traducción
import es from './es.json'
import en from './en.json'
// Idioma por defecto usando variable de entorno o 'en' como fallback
const idiomaDefecto = import.meta.env.VITE_I18N_LOCALE || 'en'
const idiomaRespaldo = import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'es'

// Crear la instancia de i18n
const i18n = createI18n({
  legacy: false, // Usar Composition API
  locale: idiomaDefecto,
  fallbackLocale: idiomaRespaldo,
  globalInjection: true, // Permitir usar $t en templates
  messages: {
    es,
    en,
  },
})

export default i18n

/// <reference types="vite/client" />

declare module 'lucide-vue-next'

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // Usar tipos estrictos para evitar any/{} vacíos
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

declare module '*.json' {
  const value: Record<string, unknown>
  export default value
}

// Declaraciones para vue-i18n con Composition API
declare module '@vue/runtime-core' {
  import { VueMessageType } from 'vue-i18n'

  interface ComponentCustomProperties {
    $t: (key: string, values?: Record<string, unknown>) => VueMessageType
    $te: (key: string) => boolean
    $d: (value: number | Date, key?: string, locale?: string) => string
    $n: (value: number, key?: string, locale?: string) => string
  }
}

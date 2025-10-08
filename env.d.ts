/// <reference types="vite/client" />
declare module 'lucide-vue-next'
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // Usar tipos estrictos para evitar any/{} vacíos
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

# AGENTS.md

Este proyecto en español es una plantilla base completo con Vue 3, Pinia, TypeScript, PrimeVue y pruebas tdd con Vitest

## Objetivos

- Código claro, tipado y probado.
- UI accesible y consistente con PrimeVue.
- Estado predecible con Pinia.
- DX rápida con Vite + Vitest.

## Stack recomendado

- Node >=22.12.0 LTS
- Vite 7.0.6, Vue 3.5.22, TypeScript 5.8.0
- Pinia 3.0.3
- PrimeVue 4.1.1, PrimeIcons 7.0.0, PrimeFlex 3.3.1
- Vitest 3.2.4, Vue Test Utils 2.4.6
- ESLint + Prettier (reglas de TypeScript y Vue)

## Estructura de carpetas sugerida

```src/
  app/ # App.vue, main.ts, boot files
  componentes/  # Presentacionales y reutilizables
  vistas/          # Vistas de router
  enumeraciones/          # Vistas de router
  constantes/          # Vistas de router
  interfaces/          # Tipo interfaces
  almacenes/ # Pinia stores
  composables/ # Lógica reutilizable (Composition API)
  servicios/disenador/      # API clients y adaptadores
  enrutador/ # Configuración de rutas
  styles/ # CSS global, variables y tema
  tipos/ # Tipos y contratos TS
  utilidades/ # Utilidades puras
  pruebas/ # Config y helpers de test
assets/
```

## Principios de código

- Principios SOLID de desarrollo y buenas prácticas de desarrollo
- TypeScript estricto: evita `any` implícito, usa tipos/`interface` y genéricos.
- Composition API + `<script setup>` por defecto.
- Componentes pequeños <200 líneas, con `props`/`emits` tipados.
- No mutar `props`; usar `v-model` con nombres explícitos (`v-model:valor`).
- Estado global en Pinia (acciones para mutaciones, no manipular fuera de acciones).
- Rutas y componentes pesados con carga diferida (code splitting).
- Archivos, variables y funciones en español
- Comentarios tipo JSDocs

## Uso estilos u componentes

- Utilizar componentes de la libreria primeVue.
- Estilos CSS responsivos para diferentes dispositivos crear los estilos en \_sri-vue-plantilla.scss; evita estilos inline.
- Color principal #0c4597

## Pinia: buenas prácticas

- Usa la sintaxis `setup` para mejor tipado.
- `state` mínimo y serializable; deriva con `computed`.
- Mutaciones solo dentro de `actions`; efectúa I/O (API) dentro de acciones.
- `storeToRefs(almacen)` para exponer estado a componentes.

```ts
// src/servicios/usuario.service.ts
export interface Usuario {
  id: number
  nombre: string
}

export async function getUsuarios(api = fetch): Promise<Usuario[]> {
  const res = await api('/api/users')
  if (!('ok' in res) || !(res as any).ok) throw new Error('Error de red')
  return res.json()
}

// src/composables/useDisenador.ts
import { ref } from 'vue'
import type { Disenador } from '@/tipos/disenador'
import { getDisenador } from '@/servicios/disenador/servicios/disenador.service'

export function Disenador(api = getDisenador) {
  const disenador = ref<Disenador[]>([])
  const cargando = ref(false)
  const error = ref<string | null>(null)

  async function cargarDatos() {
    cargando.value = true
    error.value = null
    try {
      disenador.value = await api()
    } catch (e: any) {
      error.value = e?.message ?? 'Error'
    } finally {
      cargando.value = false
    }
  }

  return { usuarios, cargando, error, cargarDatos }
}
```

## Pruebas

- Realiza pruebas para todos los archivos

## Pruebas con Vitest

```ts
// src/components/pruebas/Saludo.spec.ts
import { mount } from '@vue/test-utils'
import Saludo from '@/components/Saludo.vue'

it('Deberia emitir "clicked" al pulsar el botón', async () => {
  const wrapper = mount(Saludo, { props: { mensaje: 'Hola' } })
  await wrapper.find('button').trigger('click')
  expect(wrapper.emitted('clicked')).toBeTruthy()
})
```

### Prueba de almacen Pinia

```ts
// src/stores/pruebas/contador.spec.ts
import { useContador } from '@/stores/contador'

it('Deberia incrementa el valor correctamente', () => {
  const almacen = useContador()
  almacen.incrementar(2)
  expect(almacen.valor).toBe(2)
  expect(almacen.doble).toBe(4)
})
```

### Prueba de composable con mock

```ts
// src/composables/pruebas/useUsuarios.spec.ts
import { useUsuarios } from '@/composables/useUsuarios'
import { vi } from 'vitest'

it('Deberia cargar usuarios desde el servicio', async () => {
  const mockApi = vi.fn().mockResolvedValue([{ id: 1, nombre: 'Ada' }])
  const { usuarios, cargando, cargar } = useUsuarios(mockApi as any)
  const prom = cargar()
  expect(cargando.value).toBe(true)
  await prom
  expect(usuarios.value).toHaveLength(1)
})
```

## Accesibilidad (A11y)

- Usa componentes de PrimeVue con atributos ARIA (`aria-label`, `aria-describedby`).
- Label con atributos for
- Input con atributos id
- Gestiona el foco y navegación por teclado en diálogos y menús.
- Contraste mínimo WCAG AA.

## Rendimiento

- `defineProps`/`defineEmits` tipados, `computed` para derivaciones costosas.
- `v-memo`/`keep-alive` cuando corresponda.
- Rutas y componentes grandes con `defineAsyncComponent` y `import()`.

## Seguridad

- Evita `v-html` (si es imprescindible, sanitiza).
- No expongas secretos en cliente utiliza variables de entorno.
- Security By Design

## Ejemplo de plantilla de componente + test

- Utilizar la palabra Debería al incio de cada test.

```vue
<!-- src/componentes/InputNombre.vue -->
<script setup lang="ts">
import { ref } from 'vue'
const nombre = defineModel<string>({ local: true })
const emit = defineEmits<{ (e: 'submit', value: string): void }>()
function enviar() {
  emit('submit', nombre.value?.trim() || '')
}
</script>

<template>
  <div class="flex gap-2 align-items-center">
    <PrimeInputText v-model="nombre" placeholder="Tu nombre" class="w-12rem" />
    <PrimeButton label="Enviar" icon="pi pi-check" @click="enviar" />
  </div>
</template>
```

```ts
// src/tests/InputNombre.spec.ts
import { mount } from '@vue/test-utils'
import InputNombre from '@/components/InputNombre.vue'
import InputText from 'primevue/inputtext'
import PrimeVue from 'primevue/config'

it('Debería emitir submit con el valor', async () => {
  const wrapper = mount(InputNombre, {
    global: { plugins: [[PrimeVue, {}]], components: { InputText } },
  })
  await wrapper.find('input').setValue('Grace')
  await wrapper.find('button').trigger('click')
  expect(wrapper.emitted('submit')?.[0][0]).toBe('Grace')
})
```

## Notas finales

- Mantén la coherencia y simplicidad.
- Escribe primero pruebas TDD siempre.
- Revisa el checklist antes de abrir un PR.

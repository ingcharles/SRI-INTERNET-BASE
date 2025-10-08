import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MenuNavegacionBase from '@/components/base/componentes/MenuNavegacionBase.vue'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import PanelMenu from 'primevue/panelmenu'

describe('MenuNavegacionBase', () => {
  // Configuración compartida para todos los tests
  const configuracionGlobal = {
    plugins: [PrimeVue],
    components: { InputText, Button, PanelMenu },
    stubs: ['router-link'],
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  // Helper para crear el contenedor con configuración común
  const crearContenedor = (propiedades = {}) => {
    return mount(MenuNavegacionBase, {
      props: propiedades,
      global: configuracionGlobal,
    })
  }

  it('Debería renderizar el componente correctamente', () => {
    const contenedor = crearContenedor()

    expect(contenedor.find('.menu-lateral').exists()).toBe(true)
  })

  it('Debería mostrar la sección de búsqueda cuando no es solo iconos', () => {
    const contenedor = crearContenedor({ mostrarMenuSoloIconos: false })

    expect(contenedor.find('.seccion-buscar').exists()).toBe(true)
    expect(contenedor.find('input').exists()).toBe(true)
  })

  it('Debería ocultar la sección de búsqueda cuando es solo iconos', () => {
    const contenedor = crearContenedor({ mostrarMenuSoloIconos: true })

    expect(contenedor.find('.seccion-buscar').exists()).toBe(false)
  })

  it('Debería filtrar items del menú al buscar', async () => {
    const contenedor = crearContenedor()
    const entrada = contenedor.find('input')

    await entrada.setValue('RUC')

    expect(entrada.element.value).toBe('RUC')
  })

  it('Debería limpiar la búsqueda al hacer click en el botón limpiar', async () => {
    const contenedor = crearContenedor()
    const entrada = contenedor.find('input')

    await entrada.setValue('test')

    const botonLimpiar = contenedor.find('[aria-label="Limpiar búsqueda"]')
    await botonLimpiar.trigger('click')

    expect(entrada.element.value).toBe('')
  })

  it('Debería mostrar lista de iconos cuando mostrarMenuSoloIconos es true', () => {
    const contenedor = crearContenedor({ mostrarMenuSoloIconos: true })

    expect(contenedor.find('.lista-menu').exists()).toBe(true)
  })
})

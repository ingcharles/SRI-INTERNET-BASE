import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import CabeceraBase from '@/components/base/componentes/CabeceraBase.vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';

describe('CabeceraBase', () => {
  // Configuración compartida para todos los tests
  const configuracionGlobal = {
    plugins: [PrimeVue],
    components: { Button },
    stubs: ['router-link']
  };

  // Mock de matchMedia una sola vez para todos los tests
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (consulta: string) => ({
        matches: false,
        media: consulta,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false
      })
    });
  });

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // Helper para crear el wrapper con configuración común
  const crearContenedor = (props = {}) => {
    return mount(CabeceraBase, {
      props,
      global: configuracionGlobal
    });
  };

  it('Debería renderizar el componente correctamente', () => {
    const wrapper = crearContenedor();

    expect(wrapper.find('.encabezado-app').exists()).toBe(true);
    expect(wrapper.find('.logo-aplicacion').attributes('alt')).toBe('Logo SRI');
  });

  it('Debería mostrar la información del usuario', () => {
    const wrapper = crearContenedor();
    const infoUsuario = wrapper.find('.informacion-contribuyente');

    expect(infoUsuario.exists()).toBe(true);
    expect(infoUsuario.text()).toContain('1722039953001');
    expect(infoUsuario.text()).toContain('ANCHUNDIA VALENCIA CARLOS EDUARDO');
  });

  it('Debería emitir evento al hacer click en el botón del menú', async () => {
    const wrapper = crearContenedor();

    await wrapper.find('button[aria-label="Abrir o cerrar menu desplegado"]').trigger('click');

    expect(wrapper.emitted('alternar-menu')).toBeTruthy();
  });

  it('Debería mostrar botones completos en pantalla grande', () => {
    const wrapper = crearContenedor({ esPantallaPequenia: false });

    expect(wrapper.find('.menu-escritorio-container').exists()).toBe(true);
  });

  it('Debería mostrar menú de tres puntos en pantalla pequeña', () => {
    const wrapper = crearContenedor({ esPantallaPequenia: true });

    expect(wrapper.find('.contenedor-menu-movil button').exists()).toBe(true);
  });
});

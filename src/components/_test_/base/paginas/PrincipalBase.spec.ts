import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import PrincipalBase from '@/components/base/paginas/PrincipalBase.vue'
import PrimeVue from 'primevue/config';

describe('PrincipalBase', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Debería renderizar el componente correctamente', () => {
    const wrapper = mount(PrincipalBase, {
      global: {
        plugins: [PrimeVue],
        stubs: {
          EncabezadoApp: true,
          MenuLateral: true,
          ContenidoPrincipal: true,
          PiePagina: true,
          InicioVista: true
        }
      }
    });

    expect(wrapper.find('.PrincipalBase-container').exists()).toBe(true);
  });

  it('Debería tener todos los componentes principales', () => {
    const wrapper = mount(PrincipalBase, {
      global: {
        plugins: [PrimeVue],
        stubs: {
          EncabezadoApp: true,
          MenuLateral: true,
          ContenidoPrincipal: true,
          PiePagina: true,
          InicioVista: true
        }
      }
    });

    expect(wrapper.findComponent({ name: 'EncabezadoApp' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'ContenidoPrincipal' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'PiePagina' }).exists()).toBe(true);
  });
})

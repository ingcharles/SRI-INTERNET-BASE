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
          CabeceraBase: true,
          MenuNavegacionBase: true,
          ContenidoPrincipalBase: true,
        }
      }
    });
    expect(wrapper.findComponent({ name: 'PrincipalBase' }).exists()).toBe(true);
  });

  it('Debería tener todos los componentes principales', () => {
    const wrapper = mount(PrincipalBase, {
      global: {
        plugins: [PrimeVue],
        stubs: {
          CabeceraBase: true,
          MenuNavegacionBase: true,
          ContenidoPrincipalBase: true,
        }
      }
    });

    expect(wrapper.findComponent({ name: 'CabeceraBase' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'ContenidoPrincipalBase' }).exists()).toBe(true);
  });
})

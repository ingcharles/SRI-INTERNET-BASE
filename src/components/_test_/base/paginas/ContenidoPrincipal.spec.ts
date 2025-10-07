import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContenidoPrincipal from '@/components/base/componentes/ContenidoPrincipal.vue';
import PrimeVue from 'primevue/config';
import Breadcrumb from 'primevue/breadcrumb';

describe('ContenidoPrincipal', () => {
    it('Debería renderizar el componente correctamente', () => {
        const wrapper = mount(ContenidoPrincipal, {
            global: {
                plugins: [PrimeVue],
                components: { Breadcrumb }
            }
        });

        expect(wrapper.find('.contenido-principal').exists()).toBe(true);
        expect(wrapper.find('.area-contenido').exists()).toBe(true);
    });

    it('Debería mostrar breadcrumb cuando hay ruta actual', () => {
        const wrapper = mount(ContenidoPrincipal, {
            props: {
                rutaActual: ['Inicio', 'RUC']
            },
            global: {
                plugins: [PrimeVue],
                components: { Breadcrumb }
            }
        });

        expect(wrapper.find('.seccion-breadcrumb').exists()).toBe(true);
    });

    it('Debería ocultar breadcrumb cuando no hay ruta actual', () => {
        const wrapper = mount(ContenidoPrincipal, {
            global: {
                plugins: [PrimeVue],
                components: { Breadcrumb }
            }
        });

        expect(wrapper.find('.seccion-breadcrumb').exists()).toBe(false);
    });

    it('Debería renderizar el contenido del slot', () => {
        const wrapper = mount(ContenidoPrincipal, {
            slots: {
                default: '<div class="contenido-test">Contenido de prueba</div>'
            },
            global: {
                plugins: [PrimeVue],
                components: { Breadcrumb }
            }
        });

        expect(wrapper.find('.contenido-test').exists()).toBe(true);
        expect(wrapper.find('.contenido-test').text()).toBe('Contenido de prueba');
    });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MigaPanBase from '@/components/base/componentes/MigaPanBase.vue';
import PrimeVue from 'primevue/config';
import Breadcrumb from 'primevue/breadcrumb';

describe('MigaPanBase', () => {
    it('Debería renderizar el breadcrumb cuando hay ruta actual', () => {
        const wrapper = mount(MigaPanBase, {
            props: {
                rutaActual: ['Inicio', 'RUC']
            },
            global: {
                plugins: [PrimeVue],
                components: { Breadcrumb }
            }
        });

        expect(wrapper.find('.fila').exists()).toBe(true);
        expect(wrapper.find('.seccion-miga-pan').exists()).toBe(true);
        expect(wrapper.find('.p-breadcrumb').exists()).toBe(true);
    });

    it('No debería renderizar nada cuando no hay ruta actual', () => {
        const wrapper = mount(MigaPanBase, {
            global: {
                plugins: [PrimeVue],
                components: { Breadcrumb }
            }
        });

        expect(wrapper.find('.fila').exists()).toBe(false);
        expect(wrapper.find('.seccion-miga-pan').exists()).toBe(false);
    });

    it('No debería renderizar nada cuando la ruta actual está vacía', () => {
        const wrapper = mount(MigaPanBase, {
            props: {
                rutaActual: []
            },
            global: {
                plugins: [PrimeVue],
                components: { Breadcrumb }
            }
        });

        expect(wrapper.find('.fila').exists()).toBe(false);
        expect(wrapper.find('.seccion-miga-pan').exists()).toBe(false);
    });

    it('Debería generar los elementos correctos para la ruta', () => {
        const wrapper = mount(MigaPanBase, {
            props: {
                rutaActual: ['Inicio', 'Usuario', 'Perfil']
            },
            global: {
                plugins: [PrimeVue],
                components: { Breadcrumb }
            }
        });

        const breadcrumb = wrapper.findComponent(Breadcrumb);
        expect(breadcrumb.exists()).toBe(true);

        // Verificar que el home tiene el icono correcto
        expect(breadcrumb.props('home')).toEqual({
            icon: 'pi pi-home',
            to: '/'
        });
    });
});

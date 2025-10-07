import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MigaPanBase from '@/components/base/componentes/MigaPanBase.vue';
import PrimeVue from 'primevue/config';
import Breadcrumb from 'primevue/breadcrumb';

describe('MigaPanBase', () => {
    // Configuración compartida para todos los tests
    const configuracionGlobal = {
        plugins: [PrimeVue],
        components: { Breadcrumb }
    };

    // Helper para crear el contenedor con configuración común
    const crearContenedor = (propiedades = {}) => {
        return mount(MigaPanBase, {
            props: propiedades,
            global: configuracionGlobal
        });
    };

    it('Debería renderizar el breadcrumb cuando hay ruta actual', () => {
        const contenedor = crearContenedor({ rutaActual: ['Inicio', 'RUC'] });

        expect(contenedor.find('.fila').exists()).toBe(true);
        expect(contenedor.find('.seccion-miga-pan').exists()).toBe(true);
        expect(contenedor.find('.p-breadcrumb').exists()).toBe(true);
    });

    it('No debería renderizar nada cuando no hay ruta actual', () => {
        const contenedor = crearContenedor();

        expect(contenedor.find('.fila').exists()).toBe(false);
        expect(contenedor.find('.seccion-miga-pan').exists()).toBe(false);
    });

    it('No debería renderizar nada cuando la ruta actual está vacía', () => {
        const contenedor = crearContenedor({ rutaActual: [] });

        expect(contenedor.find('.fila').exists()).toBe(false);
        expect(contenedor.find('.seccion-miga-pan').exists()).toBe(false);
    });

    it('Debería generar los elementos correctos para la ruta', () => {
        const contenedor = crearContenedor({ rutaActual: ['Inicio', 'Usuario', 'Perfil'] });
        const migaPan = contenedor.findComponent(Breadcrumb);

        expect(migaPan.exists()).toBe(true);
        expect(migaPan.props('home')).toEqual({
            icon: 'pi pi-home',
            to: '/'
        });
    });
});

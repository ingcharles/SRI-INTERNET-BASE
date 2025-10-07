import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContenidoPrincipalBase from '../../../base/componentes/ContenidoPrincipalBase.vue';
import MigaPanBase from '../../../base/componentes/MigaPanBase.vue';
import PrimeVue from 'primevue/config';

describe('ContenidoPrincipalBase', () => {
    // Configuración compartida para todos los tests
    const configuracionGlobal = {
        plugins: [PrimeVue],
        components: { MigaPanBase }
    };

    // Helper para crear el contenedor con configuración común
    const crearContenedor = (opciones = {}) => {
        return mount(ContenidoPrincipalBase, {
            ...opciones,
            global: configuracionGlobal
        });
    };

    it('Debería renderizar el componente correctamente', () => {
        const contenedor = crearContenedor();

        expect(contenedor.find('.contenido-principal').exists()).toBe(true);
        expect(contenedor.find('.area-contenido').exists()).toBe(true);
    });

    it('Debería renderizar el contenido del slot', () => {
        const contenedor = crearContenedor({
            slots: {
                default: '<div class="contenido-test">Contenido de prueba</div>'
            }
        });

        const contenidoTest = contenedor.find('.contenido-test');

        expect(contenidoTest.exists()).toBe(true);
        expect(contenidoTest.text()).toBe('Contenido de prueba');
    });
});

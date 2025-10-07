import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InicioVista from '@/components/base/paginas/InicioVista.vue';

describe('InicioVista', () => {
    it('Debería renderizar el componente correctamente', () => {
        const wrapper = mount(InicioVista);

        expect(wrapper.find('.inicio-vista').exists()).toBe(true);
    });

    it('Debería mostrar la sección de servicios destacados', () => {
        const wrapper = mount(InicioVista);

        expect(wrapper.find('.seccion-servicios-destacados').exists()).toBe(true);
        expect(wrapper.find('.carrusel-servicios').exists()).toBe(true);
    });

    it('Debería renderizar los servicios destacados', () => {
        const wrapper = mount(InicioVista);

        const servicios = wrapper.findAll('.servicio-card');
        expect(servicios.length).toBeGreaterThan(0);
    });

    it('Debería mostrar la sección de tabs', () => {
        const wrapper = mount(InicioVista);

        expect(wrapper.find('.seccion-tabs').exists()).toBe(true);
        expect(wrapper.find('.tabs-header').exists()).toBe(true);
        expect(wrapper.find('.tabs-content').exists()).toBe(true);
    });

    it('Debería renderizar los servicios adicionales', () => {
        const wrapper = mount(InicioVista);

        const serviciosAdicionales = wrapper.findAll('.servicio-item');
        expect(serviciosAdicionales.length).toBeGreaterThan(0);
    });

    it('Debería tener botones de navegación del carrusel', () => {
        const wrapper = mount(InicioVista);

        const botones = wrapper.findAll('.carrusel-btn');
        expect(botones.length).toBe(2);

        // Verificar que los botones tienen los iconos correctos
        expect(wrapper.html()).toContain('pi-chevron-left');
        expect(wrapper.html()).toContain('pi-chevron-right');
    });

    it('Debería tener tabs activos', () => {
        const wrapper = mount(InicioVista);

        const tabActivo = wrapper.find('.tab-btn.active');
        expect(tabActivo.exists()).toBe(true);
        expect(tabActivo.text()).toBe('Servicios más utilizados');
    });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InicioVista from '../InicioVista.vue';

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

        const botonPrev = wrapper.find('.carrusel-prev');
        const botonNext = wrapper.find('.carrusel-next');

        expect(botonPrev.exists()).toBe(true);
        expect(botonNext.exists()).toBe(true);
    });

    it('Debería tener tabs activos', () => {
        const wrapper = mount(InicioVista);

        const tabActivo = wrapper.find('.tab-btn.active');
        expect(tabActivo.exists()).toBe(true);
        expect(tabActivo.text()).toBe('Servicios más utilizados');
    });
});

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PiePagina from '../PiePagina.vue';

describe('PiePagina', () => {
    it('Debería renderizar el componente correctamente', () => {
        const wrapper = mount(PiePagina);

        expect(wrapper.find('.pie-pagina').exists()).toBe(true);
        expect(wrapper.find('.pie-contenido').exists()).toBe(true);
    });

    it('Debería mostrar los enlaces de términos y política', () => {
        const wrapper = mount(PiePagina);

        const enlaces = wrapper.findAll('.pie-enlace');
        expect(enlaces.length).toBe(2);
        expect(enlaces[0].text()).toBe('Términos y Condiciones');
        expect(enlaces[1].text()).toBe('Política de Privacidad');
    });

    it('Debería mostrar el copyright con el año actual', () => {
        const wrapper = mount(PiePagina);
        const anioActual = new Date().getFullYear();

        expect(wrapper.text()).toContain(`© ${anioActual} SRI`);
    });

    it('Debería mostrar la versión del sistema', () => {
        const wrapper = mount(PiePagina);

        expect(wrapper.text()).toContain('Versión 1.0.0');
    });
});

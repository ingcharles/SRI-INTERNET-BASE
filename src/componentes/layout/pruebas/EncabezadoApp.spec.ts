import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import EncabezadoApp from '../EncabezadoApp.vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';

describe('EncabezadoApp', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('Debería renderizar el componente correctamente', () => {
        const wrapper = mount(EncabezadoApp, {
            global: {
                plugins: [PrimeVue],
                components: { Button }
            }
        });

        expect(wrapper.find('.encabezado-app').exists()).toBe(true);
        expect(wrapper.find('.logo-texto').text()).toBe('SRI');
        expect(wrapper.find('.logo-subtexto').text()).toBe('en línea');
    });

    it('Debería mostrar la información del usuario', () => {
        const wrapper = mount(EncabezadoApp, {
            global: {
                plugins: [PrimeVue],
                components: { Button }
            }
        });

        const infoUsuario = wrapper.find('.info-usuario');
        expect(infoUsuario.exists()).toBe(true);
        expect(infoUsuario.text()).toContain('1722039953001');
        expect(infoUsuario.text()).toContain('ANCHUNDIA VALENCIA CARLOS EDUARDO');
    });

    it('Debería emitir evento al hacer click en el botón del menú', async () => {
        const wrapper = mount(EncabezadoApp, {
            global: {
                plugins: [PrimeVue],
                components: { Button }
            }
        });

        const botonMenu = wrapper.find('.boton-menu');
        await botonMenu.trigger('click');

        expect(wrapper.emitted('alternar-menu')).toBeTruthy();
    });

    it('Debería mostrar botones completos en pantalla grande', () => {
        const wrapper = mount(EncabezadoApp, {
            props: {
                esPantallaPequena: false
            },
            global: {
                plugins: [PrimeVue],
                components: { Button }
            }
        });

        const botones = wrapper.findAll('.encabezado-derecha button');
        expect(botones.length).toBeGreaterThan(1);
    });

    it('Debería mostrar menú de tres puntos en pantalla pequeña', () => {
        const wrapper = mount(EncabezadoApp, {
            props: {
                esPantallaPequena: true
            },
            global: {
                plugins: [PrimeVue],
                components: { Button }
            }
        });

        const botonOpciones = wrapper.find('[aria-label="Más opciones"]');
        expect(botonOpciones.exists()).toBe(true);
    });
});

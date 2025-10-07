import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import CabeceraBase from '@/components/base/componentes/CabeceraBase.vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';

describe('CabeceraBase', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        // Mock matchMedia for PrimeVue components
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: (query: string) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: () => {},
                removeListener: () => {},
                addEventListener: () => {},
                removeEventListener: () => {},
                dispatchEvent: () => {}
            })
        });
    });

    it('Debería renderizar el componente correctamente', () => {
        const wrapper = mount(CabeceraBase, {
            global: {
                plugins: [PrimeVue],
                components: { Button },
                stubs: ['router-link']
            }
        });

        expect(wrapper.find('.encabezado-app').exists()).toBe(true);
        expect(wrapper.find('.logo-aplicacion').attributes('alt')).toBe('Logo SRI');
    });

    it('Debería mostrar la información del usuario', () => {
        const wrapper = mount(CabeceraBase, {
            global: {
                plugins: [PrimeVue],
                components: { Button },
                stubs: ['router-link']
            }
        });

        const infoUsuario = wrapper.find('.info-usuario');
        expect(infoUsuario.exists()).toBe(true);
        expect(infoUsuario.text()).toContain('1722039953001');
        expect(infoUsuario.text()).toContain('ANCHUNDIA VALENCIA CARLOS EDUARDO');
    });

    it('Debería emitir evento al hacer click en el botón del menú', async () => {
        const wrapper = mount(CabeceraBase, {
            global: {
                plugins: [PrimeVue],
                components: { Button },
                stubs: ['router-link']
            }
        });

        const botonMenu = wrapper.find('button[aria-label="Abrir o cerrar menu desplegado"]');
        await botonMenu.trigger('click');

        expect(wrapper.emitted('alternar-menu')).toBeTruthy();
    });

    it('Debería mostrar botones completos en pantalla grande', () => {
        const wrapper = mount(CabeceraBase, {
            props: {
                esPantallaPequena: false
            },
            global: {
                plugins: [PrimeVue],
                components: { Button },
                stubs: ['router-link']
            }
        });

        const menuDesktop = wrapper.find('.menu-desktop-container');
        expect(menuDesktop.exists()).toBe(true);
    });

    it('Debería mostrar menú de tres puntos en pantalla pequeña', () => {
        const wrapper = mount(CabeceraBase, {
            props: {
                esPantallaPequena: true
            },
            global: {
                plugins: [PrimeVue],
                components: { Button },
                stubs: ['router-link']
            }
        });

        const botonOpciones = wrapper.find('.menu-movil-container button');
        expect(botonOpciones.exists()).toBe(true);
    });
});

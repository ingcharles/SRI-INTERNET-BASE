import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import MenuNavegacionBase from '@/components/base/componentes/MenuNavegacionBase.vue';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import PanelMenu from 'primevue/panelmenu';

describe('MenuNavegacionBase', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('Debería renderizar el componente correctamente', () => {
        const wrapper = mount(MenuNavegacionBase, {
            global: {
                plugins: [PrimeVue],
                components: { InputText, Button, PanelMenu }
            }
        });

        expect(wrapper.find('.menu-lateral').exists()).toBe(true);
    });

    it('Debería mostrar la sección de búsqueda cuando no es solo iconos', () => {
        const wrapper = mount(MenuNavegacionBase, {
            props: {
                soloIconos: false
            },
            global: {
                plugins: [PrimeVue],
                components: { InputText, Button, PanelMenu }
            }
        });

        expect(wrapper.find('.seccion-buscar').exists()).toBe(true);
        expect(wrapper.find('input').exists()).toBe(true);
    });

    it('Debería ocultar la sección de búsqueda cuando es solo iconos', () => {
        const wrapper = mount(MenuNavegacionBase, {
            props: {
                soloIconos: true
            },
            global: {
                plugins: [PrimeVue],
                components: { InputText, Button, PanelMenu }
            }
        });

        expect(wrapper.find('.seccion-buscar').exists()).toBe(false);
    });

    it('Debería filtrar items del menú al buscar', async () => {
        const wrapper = mount(MenuNavegacionBase, {
            global: {
                plugins: [PrimeVue],
                components: { InputText, Button, PanelMenu }
            }
        });

        const input = wrapper.find('input');
        await input.setValue('RUC');

        expect(wrapper.vm.textoBusqueda).toBe('RUC');
    });

    it('Debería limpiar la búsqueda al hacer click en el botón limpiar', async () => {
        const wrapper = mount(MenuNavegacionBase, {
            global: {
                plugins: [PrimeVue],
                components: { InputText, Button, PanelMenu }
            }
        });

        const input = wrapper.find('input');
        await input.setValue('test');

        const botonLimpiar = wrapper.find('[aria-label="Limpiar búsqueda"]');
        await botonLimpiar.trigger('click');

        expect(wrapper.vm.textoBusqueda).toBe('');
    });

    it('Debería mostrar lista de iconos cuando soloIconos es true', () => {
        const wrapper = mount(MenuNavegacionBase, {
            props: {
                soloIconos: true
            },
            global: {
                plugins: [PrimeVue],
                components: { InputText, Button, PanelMenu }
            }
        });

        expect(wrapper.find('.lista-menu').exists()).toBe(true);
    });
});

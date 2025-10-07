import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContenidoPrincipalBase from '@/components/base/componentes/ContenidoPrincipalBase.vue'
import MigaPanBase from '@/components/base/componentes/MigaPanBase.vue';
import PrimeVue from 'primevue/config';

describe('ContenidoPrincipalBase', () => {
    it('Debería renderizar el componente correctamente', () => {
        const wrapper = mount(ContenidoPrincipalBase, {
            global: {
                plugins: [PrimeVue],
                components: { MigaPanBase }
            }
        });

        expect(wrapper.find('.contenido-principal').exists()).toBe(true);
        expect(wrapper.find('.area-contenido').exists()).toBe(true);
    });

    it('Debería renderizar el contenido del slot', () => {
        const wrapper = mount(ContenidoPrincipalBase, {
            slots: {
                default: '<div class="contenido-test">Contenido de prueba</div>'
            },
            global: {
                plugins: [PrimeVue],
                components: { MigaPanBase }
            }
        });

        expect(wrapper.find('.contenido-test').exists()).toBe(true);
        expect(wrapper.find('.contenido-test').text()).toBe('Contenido de prueba');
    });
});

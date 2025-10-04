import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ItemMenu, InformacionUsuario } from '@/interfaces/menu.interface';

/**
 * Almacén para gestionar el estado del layout
 */
export const useLayoutStore = defineStore('layout', () => {
    const menuLateralVisible = ref(true);
    const menuMovilVisible = ref(false);
    const informacionUsuario = ref<InformacionUsuario>({
        nombre: 'ANCHUNDIA VALENCIA CARLOS EDUARDO',
        identificacion: '1722039953001'
    });

    const itemsMenu = ref<ItemMenu[]>([
        {
            id: 'claves',
            etiqueta: 'CLAVES',
            icono: 'pi pi-key',
            ruta: '/claves',
            visible: true
        },
        {
            id: 'ruc',
            etiqueta: 'RUC',
            icono: 'pi pi-building',
            ruta: '/ruc',
            visible: true
        },
        {
            id: 'facturacion-fisica',
            etiqueta: 'FACTURACIÓN FÍSICA',
            icono: 'pi pi-file',
            ruta: '/facturacion-fisica',
            visible: true
        },
        {
            id: 'facturacion-electronica',
            etiqueta: 'FACTURACIÓN ELECTRÓNICA',
            icono: 'pi pi-desktop',
            ruta: '/facturacion-electronica',
            visible: true
        },
        {
            id: 'declaraciones',
            etiqueta: 'DECLARACIONES',
            icono: 'pi pi-file-edit',
            ruta: '/declaraciones',
            visible: true
        },
        {
            id: 'anexos',
            etiqueta: 'ANEXOS',
            icono: 'pi pi-paperclip',
            ruta: '/anexos',
            visible: true
        },
        {
            id: 'pagos',
            etiqueta: 'PAGOS',
            icono: 'pi pi-credit-card',
            ruta: '/pagos',
            visible: true
        },
        {
            id: 'deudas',
            etiqueta: 'DEUDAS',
            icono: 'pi pi-dollar',
            ruta: '/deudas',
            visible: true
        },
        {
            id: 'devoluciones',
            etiqueta: 'DEVOLUCIONES (TAX REFUND)',
            icono: 'pi pi-replay',
            ruta: '/devoluciones',
            visible: true
        },
        {
            id: 'reintegro',
            etiqueta: 'REINTEGRO DE VALORES',
            icono: 'pi pi-wallet',
            ruta: '/reintegro',
            visible: true
        },
        {
            id: 'tramites',
            etiqueta: 'TRÁMITES Y NOTIFICACIONES',
            icono: 'pi pi-bell',
            ruta: '/tramites',
            visible: true
        },
        {
            id: 'certificados',
            etiqueta: 'CERTIFICADOS',
            icono: 'pi pi-verified',
            ruta: '/certificados',
            visible: true
        },
        {
            id: 'vehiculos',
            etiqueta: 'VEHÍCULOS',
            icono: 'pi pi-car',
            ruta: '/vehiculos',
            visible: true
        },
        {
            id: 'otros',
            etiqueta: 'OTROS SERVICIOS',
            icono: 'pi pi-ellipsis-h',
            ruta: '/otros',
            visible: true
        }
    ]);

    const menuFiltrado = computed(() => {
        return itemsMenu.value.filter(item => item.visible);
    });

    /**
     * Alterna la visibilidad del menú lateral
     */
    function alternarMenuLateral() {
        menuLateralVisible.value = !menuLateralVisible.value;
    }

    /**
     * Alterna la visibilidad del menú móvil
     */
    function alternarMenuMovil() {
        menuMovilVisible.value = !menuMovilVisible.value;
    }

    /**
     * Cierra el menú móvil
     */
    function cerrarMenuMovil() {
        menuMovilVisible.value = false;
    }

    /**
     * Actualiza la información del usuario
     */
    function actualizarInformacionUsuario(info: InformacionUsuario) {
        informacionUsuario.value = info;
    }

    return {
        menuLateralVisible,
        menuMovilVisible,
        informacionUsuario,
        itemsMenu,
        menuFiltrado,
        alternarMenuLateral,
        alternarMenuMovil,
        cerrarMenuMovil,
        actualizarInformacionUsuario
    };
});

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ItemMenuAmburguesa, InformacionUsuario, ItemMenuPrime } from '@/interfaces/base';

/**
 * Almacén para gestionar el estado del principal base
 */
export const usarAlmacenPrincipalBase = defineStore('principalBase', () => {
  const menuLateralVisible = ref(true);
  const menuMovilVisible = ref(false);
  const informacionUsuario = ref<InformacionUsuario>({
    nombre: 'ANCHUNDIA VALENCIA CARLOS EDUARDO',
    identificacion: '1722039953001'
  });

  const itemsMenuAmburguesa = ref<ItemMenuAmburguesa[]>([
    {
      id: 'claves',
      etiqueta: 'CLAVES',
      icono: 'sri-menu-icon-claves',
      visible: true,
      hijos: [
        {
          id: 'generar-recuperar',
          etiqueta: 'Generar o recuperar clave',
          ruta: '/claves/generar-recuperar',
          visible: true
        },
        {
          id: 'cambiar-clave',
          etiqueta: 'Cambiar clave',
          ruta: '/claves/cambiar',
          visible: true
        },
        {
          id: 'usuarios-adicionales',
          etiqueta: 'Usuarios adicionales',
          visible: true,
          hijos: [
            {
              id: 'crear-administrar',
              etiqueta: 'Crear y administrar',
              ruta: '/claves/usuarios/crear',
              visible: true
            },
            {
              id: 'confirmacion',
              etiqueta: 'Confirmación',
              ruta: '/claves/usuarios/confirmacion',
              visible: true
            }
          ]
        },
        {
          id: 'conozca-mas',
          etiqueta: 'Conozca más ...',
          ruta: '/claves/info',
          visible: true
        }
      ]
    },
    {
      id: 'ruc',
      etiqueta: 'RUC',
      icono: 'sri-menu-icon-ruc',
      ruta: '/ruc',
      visible: true
    },
    {
      id: 'facturacion-fisica',
      etiqueta: 'FACTURACIÓN FÍSICA',
      icono: 'sri-menu-icon-facturacion-fisica',
      ruta: '/facturacion-fisica',
      visible: true
    },
    {
      id: 'facturacion-electronica',
      etiqueta: 'FACTURACIÓN ELECTRÓNICA',
      icono: 'sri-menu-icon-facturacion-electronica',
      ruta: '/facturacion-electronica',
      visible: true
    },
    {
      id: 'declaraciones',
      etiqueta: 'DECLARACIONES',
      icono: 'sri-menu-icon-declaraciones',
      ruta: '/declaraciones',
      visible: true
    },
    {
      id: 'anexos',
      etiqueta: 'ANEXOS',
      icono: 'sri-menu-icon-anexos',
      ruta: '/anexos',
      visible: true
    },
    {
      id: 'pagos',
      etiqueta: 'PAGOS',
      icono: 'sri-menu-icon-pagos',
      ruta: '/pagos',
      visible: true
    },
    {
      id: 'deudas',
      etiqueta: 'DEUDAS',
      icono: 'sri-menu-icon-deudas',
      ruta: '/deudas',
      visible: true
    },
    {
      id: 'devoluciones',
      etiqueta: 'DEVOLUCIONES (TAX REFUND)',
      icono: 'sri-menu-icon-devoluciones',
      ruta: '/devoluciones',
      visible: true
    },
    {
      id: 'reintegro',
      etiqueta: 'REINTEGRO DE VALORES',
      icono: 'sri-menu-icon-notas-de-credito',
      ruta: '/reintegro',
      visible: true
    },
    {
      id: 'tramites',
      etiqueta: 'TRÁMITES Y NOTIFICACIONES',
      icono: 'sri-menu-icon-tramites-notificaciones',
      ruta: '/tramites',
      visible: true
    },
    {
      id: 'certificados',
      etiqueta: 'CERTIFICADOS',
      icono: 'sri-menu-icon-certificados',
      ruta: '/certificados',
      visible: true
    },
    {
      id: 'vehiculos',
      etiqueta: 'VEHÍCULOS',
      icono: 'sri-menu-icon-vehiculos',
      ruta: '/vehiculos',
      visible: true
    },
    {
      id: 'otros',
      etiqueta: 'OTROS SERVICIOS',
      icono: 'sri-menu-icon-otros-servicios',
      ruta: '/otros',
      visible: true
    }
  ]);

  // Items del menú unificado (usado tanto en desktop como móvil)
const itemsMenuPrime = ref<ItemMenuPrime[]>([
  {
    label: 'Perfil',
    icon: 'sri-icon-perfil',
    url: 'https://srienlinea.sri.gob.ec/sri-en-linea/contribuyente/perfil',
  },
  {
    label: 'Alertas y avisos',
    icon: 'sri-icon-correos',
    url: 'https://srienlinea.sri.gob.ec/sri-en-linea/SriBuzon/Contribuyente/notificaciones',
    // target: '_blank'
    // command: () => console.log('Alertas y avisos clicked')
  },
  {
    label: 'Inicio',
    icon: 'sri-icon-home',
    url: 'https://srienlinea.sri.gob.ec/sri-en-linea/inicio/NAT'
  },
  {
    label: 'Iniciar sesión',
    icon: 'pi pi-sign-in',
    route: '/login'
  },
  {
    label: 'Cerrar sesión',
    icon: 'sri-icon-cerrar-sesion',
    command: () => console.log('Cerrar sesión clicked')
  },
  {
    label: 'Accesibilidad',
    icon: 'sri-icon-accesibilidad',
    url: 'https://srienlinea.sri.gob.ec/sri-en-linea/accesibilidad',
  }
]);

  const menuFiltrado = computed(() => {
    return itemsMenuAmburguesa.value.filter(item => item.visible);
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
    itemsMenuAmburguesa,
    itemsMenuPrime,
    menuFiltrado,
    alternarMenuLateral,
    alternarMenuMovil,
    cerrarMenuMovil,
    actualizarInformacionUsuario
  };
});

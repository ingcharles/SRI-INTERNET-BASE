<script setup lang="ts">
import { computed, ref } from 'vue';
import { usarAlmacenPrincipalBase } from '@/stores/base/principalBase';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import TieredMenu from 'primevue/tieredmenu';
import type { ItemMenuNavegacion } from '@/interfaces/principalBase';
import type { MenuItem } from 'primevue/menuitem';

// Ref (Variable reactivas)
const menuCabecera = ref();

// Store (Almacenes)
const almacenPrincipalBase = usarAlmacenPrincipalBase();


// Computed (Propiedades computadas)
const informacionUsuario = computed(() => almacenPrincipalBase.informacionUsuario);
const itemsMenuCabecera = computed<MenuItem[]>(() => {
  const items = almacenPrincipalBase.itemsMenuCabecera;
  return convertirAMenuPrime(items);
});

// Props (Propiedades que recibe)
const propiedades = defineProps<{
  esPantallaExtraPequenia?: boolean;
  esPantallaPequenia?: boolean;
  esPantallaMediana?: boolean;
}>();

// Emit (Eventos)
const emitir = defineEmits<(e: 'alternar-menu') => void>();


// Functions (Funciones)
/**
 * Muestra u oculta el menú de cabecera en dispositivos móviles
 */
const plegable = (event: Event) => {
  if (menuCabecera.value && menuCabecera.value.toggle) {
    return menuCabecera.value.toggle(event);
  }
};

/**
 * Convierte recursivamente los items del menú al formato compatible con PrimeVue
 */
const convertirAMenuPrime = (items: ItemMenuNavegacion[]): MenuItem[] => {
  return items.map(item => {
    console.log(item);
    const menuItem: MenuItem = {
      label: item.etiqueta,
      icon: item.icono,
      route: item.ruta,
      target: item.comportamientoUrl,
      command: item.command,
      url: item.url,
    };

    if (item.hijos && item.hijos.length > 0) {
      menuItem.items = convertirAMenuPrime(item.hijos);
    }
    return menuItem;
  });
}


/**
 * Maneja el click en el botón del menú
 */
const manejarClickMenu = () => emitir('alternar-menu');

</script>

<template>
  <header class="encabezado">
    <div class="contenedor-fluido">
      <div class="fila alinear-centro">
        <!-- Sección Izquierda: Menú hamburguesa + Logo -->
        <div class="columna-6 columna-md-3 columna-lg-3 encabezado-izquierda">
          <div class="mostrar-flex alinear-centro">
            <Button icon="sri-menu-icon-menu-hamburguesa " class="tamano-icono-hamburguesa" @click="manejarClickMenu"
              aria-label="Abrir o cerrar menu desplegado" />
            <div v-if="!propiedades.esPantallaExtraPequenia" class="logo-contenedor">
              <img alt="Logo SRI" class="logo-aplicacion" src="/src/assets/iconos/sri-en-linea.svg">
            </div>
          </div>
        </div>


        <!-- Sección Derecha: Iconos de acción -->
        <div class="columna-6 columna-md-9 columna-lg-9 encabezado-derecha">
          <div v-if="!propiedades.esPantallaMediana" class="contenedor-menu-escritorio">
            <!-- Sección Centro: Información del usuario -->
            <div class="informacion-contribuyente mostrar-flex flex-columna alinear-fin justificar-centro">
              <span class="nombre-contribuyente">{{ informacionUsuario.identificacion }}</span>
              <span class="id-contribuyente">{{ informacionUsuario.nombre }}</span>
            </div>
            <span class="separador-menu"></span>
            <!-- Escritorio: MenuBar solo con iconos -->
            <Menubar :model="itemsMenuCabecera">
              <template #item="{ item, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a v-ripple :href="href" @click="navigate" class="menu-item-escritorio"
                    :class="{ 'badge-notificacion': item.label === 'Alertas y avisos' }"
                    :aria-label="String(item.label)" v-tooltip.left="item.label">
                    <span :class="item.icon" />
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down menu-icono" />
                  </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target"
                  @click="() => (item.command as (() => void))?.()" class="menu-item-escritorio"
                  :class="{ 'badge-notificacion': item.label === 'Alertas y avisos' }" :aria-label="String(item.label)"
                  v-tooltip.left="item.label">
                  <span :class="item.icon" />
                  <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down menu-icono" />
                </a>
              </template>
            </Menubar>
          </div>

          <!-- Móvil: MenuBar con iconos y etiquetas -->
          <div v-else class="contenedor-menu-movil">
            <div class="card flex justify-center">
              <Button type="button" icon="pi pi-ellipsis-v" class="tamanio-fuente" @click="plegable"
                aria-haspopup="true" aria-controls="btnMostrarTieredMenu" />
              <TieredMenu ref="menuCabecera" id="btnMostrarTieredMenu" :model="itemsMenuCabecera" popup>
                <template #item="{ item, hasSubmenu }">
                  <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" @click="navigate" class="menu-item-movil"
                      :class="{ 'badge-notificacion': item.label === 'Alertas y avisos' }"
                      :aria-label="String(item.label)">
                      <span :class="item.icon" />
                      <span class="menu-etiqueta">{{ item.label }}</span>
                      <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down menu-icono" />
                    </a>
                  </router-link>
                  <a v-else v-ripple :href="item.url" :target="item.target"
                    @click="() => (item.command as (() => void))?.()" class="menu-item-movil"
                    :class="{ 'badge-notificacion': item.label === 'Alertas y avisos' }"
                    :aria-label="String(item.label)">
                    <span :class="item.icon" />
                    <span class="menu-etiqueta">{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down menu-icono" />
                  </a>
                </template>
              </TieredMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

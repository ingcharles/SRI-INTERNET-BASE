<script setup lang="ts">
import { computed, ref } from 'vue';
import { usarAlmacenPrincipalBase } from '@/stores/base/principalBase';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import TieredMenu from 'primevue/tieredmenu';

// Interfaz específica para nuestros items de menú
interface ItemMenu {
  label: string;
  icon: string;
  route?: string;
  url?: string;
  target?: string;
  command?: () => void;
  items?: ItemMenu[];
}

const almacenPrincipalBase = usarAlmacenPrincipalBase();
const menu = ref();

const plegable = (event: Event) => {
  if (menu.value && menu.value.toggle) {
    menu.value.toggle(event);
  }
};

const propiedades = defineProps<{
  esPantallaPequena?: boolean;
}>();

const emitir = defineEmits<(e: 'alternar-menu') => void>();

/**
 * Maneja el click en el botón del menú
 */
function manejarClickMenu() {
  emitir('alternar-menu');
}
const informacionUsuario = computed(() => almacenPrincipalBase.informacionUsuario);

// Items del menú unificado (usado tanto en desktop como móvil)
const itemsMenu = ref<ItemMenu[]>([
  {
    label: 'Perfil',
    icon: 'sri-icon-perfil',
    route: '/perfil'
  },
  {
    label: 'Alertas y avisos',
    icon: 'sri-icon-correos',
    command: () => console.log('Alertas y avisos clicked')
  },
  {
    label: 'Inicio',
    icon: 'sri-icon-home',
    route: '/'
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
    command: () => console.log('Accesibilidad clicked')
  },
  // {
  //   label: 'Ayuda',
  //   icon: 'sri-icon-ayuda',
  //   url: 'https://sri.gob.ec/ayuda',
  //   target: '_blank'
  // }
]);


</script>

<template>
  <header class="encabezado-app">
    <div class="contenedor-fluido">
      <div class="fila alinear-centro">
        <!-- Sección Izquierda: Menú hamburguesa + Logo -->
        <div class="columna-6 columna-md-2 columna-lg-3 encabezado-izquierda">
          <div class="mostrar-flex alinear-centro">
            <Button icon="sri-menu-icon-menu-hamburguesa " class="tamano-icono-hamburguesa" @click="manejarClickMenu"
              aria-label="Abrir o cerrar menu desplegado" />

            <div v-if="!propiedades.esPantallaPequena" class="logo-contenedor">
              <img alt="Logo SRI" class="logo-aplicacion" src="/src/assets/iconos/sri-en-linea.svg">
            </div>

          </div>
        </div>

        <!-- Sección Centro: Información del usuario -->
        <div class="columna-12 columna-md-6 columna-lg-5 encabezado-centro ocultar-xs">
          <div class="info-usuario mostrar-flex flex-columna alinear-centro justificar-centro">
            <span class="info-label">{{ informacionUsuario.identificacion }}</span>
            <span class="info-label">{{ informacionUsuario.nombre }}</span>
          </div>
        </div>

        <!-- Sección Derecha: Iconos de acción -->
        <div class="columna-6 columna-md-4 columna-lg-4 encabezado-derecha">
          <!-- Escritorio: MenuBar solo con iconos -->
          <div v-if="!propiedades.esPantallaPequena" class="menu-escritorio-container">
            <Menubar :model="itemsMenu">
              <template #item="{ item, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a v-ripple :href="href" @click="navigate" class="menu-item-escritorio"
                    :class="{ 'badge-notificacion': item.label === 'Alertas y avisos' }"
                    :aria-label="String(item.label)" v-tooltip.left="item.label">
                    <span :class="item.icon" />
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down menu-icono" />
                  </a>
                </router-link>
                <a v-else v-ripple :href="item.url" @click="() => (item.command as (() => void))?.()"
                  class="menu-item-escritorio" :class="{ 'badge-notificacion': item.label === 'Alertas y avisos' }"
                  :aria-label="String(item.label)" v-tooltip.left="item.label">
                  <span :class="item.icon" />
                  <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down menu-icono" />
                </a>
              </template>
            </Menubar>
          </div>

          <!-- Móvil: MenuBar con iconos y etiquetas -->
          <div v-else class="contenedor-menu-movil">
            <Button type="button" icon="pi pi-ellipsis-v" @click="plegable" aria-haspopup="true"
              aria-controls="btnCubrirMenu" />
            <TieredMenu ref="menu" id="btnCubrirMenu" :model="itemsMenu" popup>
              <template #item="{ item, props: propiedadesItem, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a v-ripple :href="href" v-bind="propiedadesItem.action" @click="navigate" class="menu-item-movil"
                    :class="{ 'badge-notificacion': item.label === 'Alertas y avisos' }"
                    :aria-label="String(item.label)">
                    <span :class="item.icon" />
                    <span class="menu-etiqueta">{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down menu-icono" />
                  </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target"
                  @click="() => (item.command as (() => void))?.()" class="menu-item-movil"
                  :class="{ 'badge-notificacion': item.label === 'Alertas y avisos' }" :aria-label="String(item.label)">
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
  </header>
</template>

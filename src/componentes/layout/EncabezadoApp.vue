<script setup lang="ts">
import { computed, ref } from 'vue';
import { useLayoutStore } from '@/almacenes/layout';
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

const layoutStore = useLayoutStore();
const menu = ref();

const items = ref([
  {
    label: 'File',
    icon: 'pi pi-file',
    items: [
      {
        label: 'New',
        icon: 'pi pi-plus',
        items: [
          {
            label: 'Document',
            icon: 'pi pi-file'
          },
          {
            label: 'Image',
            icon: 'pi pi-image'
          },
          {
            label: 'Video',
            icon: 'pi pi-video'
          }
        ]
      },
      {
        label: 'Open',
        icon: 'pi pi-folder-open'
      },
      {
        label: 'Print',
        icon: 'pi pi-print'
      }
    ]
  },
  {
    label: 'Edit',
    icon: 'pi pi-file-edit',
    items: [
      {
        label: 'Copy',
        icon: 'pi pi-copy'
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      }
    ]
  },
  {
    label: 'Search',
    icon: 'pi pi-search'
  },
  {
    separator: true
  },
  {
    label: 'Share',
    icon: 'pi pi-share-alt',
    items: [
      {
        label: 'Slack',
        icon: 'pi pi-slack'
      },
      {
        label: 'Whatsapp',
        icon: 'pi pi-whatsapp'
      }
    ]
  }
]);
const toggle = (event: Event) => {
  if (menu.value && menu.value.toggle) {
    menu.value.toggle(event);
  }
};
const props = defineProps<{
  esPantallaPequena?: boolean;
}>();

const emit = defineEmits<{
  (e: 'alternar-menu'): void;
}>();

const informacionUsuario = computed(() => layoutStore.informacionUsuario);

// Items del menú unificado (usado tanto en desktop como móvil)
const itemsMenu = ref<ItemMenu[]>([
  {
    label: 'Perfil',
    icon: 'pi pi-user',
    route: '/perfil'
  },
  {
    label: 'Notificaciones',
    icon: 'pi pi-bell',
    command: () => console.log('Notificaciones clicked')
  },
  {
    label: 'Inicio',
    icon: 'pi pi-home',
    route: '/'
  },
  {
    label: 'Sesión',
    icon: 'pi pi-sign-in',
    items: [
      {
        label: 'Iniciar sesión',
        icon: 'pi pi-sign-in',
        route: '/login'
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => console.log('Cerrar sesión clicked')
      }
    ]
  },
  {
    label: 'Accesibilidad',
    icon: 'pi pi-eye',
    command: () => console.log('Accesibilidad clicked')
  },
  {
    label: 'Ayuda',
    icon: 'pi pi-question-circle',
    url: 'https://sri.gob.ec/ayuda',
    target: '_blank'
  }
]);

/**
 * Maneja el click en el botón del menú
 */
function manejarClickMenu() {
  emit('alternar-menu');
}
</script>

<template>
  <header class="encabezado-app">
    <div class="contenedor-fluido">
      <div class="fila alinear-centro">
        <!-- Sección Izquierda: Menú hamburguesa + Logo -->
        <div class="columna-6 columna-md-3 columna-lg-2 encabezado-izquierda">
          <div class="mostrar-flex alinear-centro">
            <Button icon="pi pi-bars" class="p-button-text p-button-rounded boton-menu" @click="manejarClickMenu"
              aria-label="Menú" />
            <div class="logo-contenedor">
              <span class="logo-texto">SRI</span>
              <span class="logo-subtexto">en línea</span>
            </div>
          </div>
        </div>

        <!-- Sección Centro: Información del usuario -->
        <div class="columna-12 columna-md-6 columna-lg-8 encabezado-centro ocultar-xs">
          <div class="info-usuario mostrar-flex flex-columna alinear-centro justificar-centro">
            <span class="info-label">{{ informacionUsuario.identificacion }}</span>
            <span class="info-label">{{ informacionUsuario.nombre }}</span>
          </div>
        </div>

        <!-- Sección Derecha: Iconos de acción -->
        <div class="columna-6 columna-md-3 columna-lg-2 encabezado-derecha">
          <!-- Desktop: MenuBar solo con iconos -->
          <div v-if="!props.esPantallaPequena" class="menu-desktop-container">
            <a _ngcontent-c2="" aria-label="Ir a inicio" hidedelay="300" ptooltip="Inicio" showdelay="300"
              tooltipevent="hover" tooltipposition="left" href="/sri-en-linea/inicio/NAT"><em _ngcontent-c2=""
                class="sri-icon-home"></em><span _ngcontent-c2="" class="topbar-item-name">Inicio</span></a>
            <span class="sri-icon-home"></span>
            <Menubar :model="itemsMenu" class="menu-desktop">
              <template #item="{ item, props: itemProps, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a v-ripple :href="href" v-bind="itemProps.action" @click="navigate" class="menu-item-desktop"
                    :class="{ 'badge-notificacion': item.label === 'Notificaciones' }" :aria-label="item.label">
                    <span :class="item.icon" />
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down submenu-icon" />
                  </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="itemProps.action"
                  @click="item.command" class="menu-item-desktop"
                  :class="{ 'badge-notificacion': item.label === 'Notificaciones' }" :aria-label="item.label">
                  <span :class="item.icon" />
                  <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down submenu-icon" />
                </a>
              </template>
            </Menubar>
          </div>

          <!-- Móvil: MenuBar con iconos y etiquetas -->
          <div v-else class="menu-movil-container">
            <div class="card flex justify-center">
              <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true"
                aria-controls="overlay_tmenu" />
              <TieredMenu ref="menu" id="overlay_tmenu" :model="itemsMenu" popup>
                <template #item="{ item, props: itemProps, hasSubmenu }">
                  <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="itemProps.action" @click="navigate" class="menu-item-movil"
                      :class="{ 'badge-notificacion': item.label === 'Notificaciones' }" :aria-label="item.label">
                      <span :class="item.icon" />
                      <span class="menu-label">{{ item.label }}</span>
                      <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down submenu-icon" />
                    </a>
                  </router-link>
                  <a v-else v-ripple :href="item.url" :target="item.target" v-bind="itemProps.action"
                    @click="item.command" class="menu-item-movil"
                    :class="{ 'badge-notificacion': item.label === 'Notificaciones' }" :aria-label="item.label">
                    <span :class="item.icon" />
                    <span class="menu-label">{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down submenu-icon" />
                  </a>
                </template>
                <!-- <template #item="{ item, props, hasSubmenu }">
                  <a v-ripple class="mostrar-flex alinear-centro" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut"
                      class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{
                        item.shortcut }}</span>
                    <i v-if="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
                  </a>
                </template> -->
                <!-- <template #item="{ item, props: itemProps, hasSubmenu }">
                  <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="itemProps.action" @click="navigate" class="menu-item-movil"
                      :class="{ 'badge-notificacion': item.label === 'Notificaciones' }" :aria-label="item.label">
                      <span :class="item.icon" />
                      <span class="menu-label">{{ item.label }}</span>
                      <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down submenu-icon" />
                    </a>
                  </router-link>
                  <a v-else v-ripple :href="item.url" :target="item.target" v-bind="itemProps.action"
                    @click="item.command" class="menu-item-movil"
                    :class="{ 'badge-notificacion': item.label === 'Notificaciones' }" :aria-label="item.label">
                    <span :class="item.icon" />
                    <span class="menu-label">{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down submenu-icon" />
                  </a>
                </template> -->
              </TieredMenu>
            </div>
            <Menubar :model="itemsMenu" class="menu-movil">
              <template #item="{ item, props: itemProps, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a v-ripple :href="href" v-bind="itemProps.action" @click="navigate" class="menu-item-movil"
                    :class="{ 'badge-notificacion': item.label === 'Notificaciones' }" :aria-label="item.label">
                    <span :class="item.icon" />
                    <span class="menu-label">{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down submenu-icon" />
                  </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="itemProps.action"
                  @click="item.command" class="menu-item-movil"
                  :class="{ 'badge-notificacion': item.label === 'Notificaciones' }" :aria-label="item.label">
                  <span :class="item.icon" />
                  <span class="menu-label">{{ item.label }}</span>
                  <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down submenu-icon" />
                </a>
              </template>
            </Menubar>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

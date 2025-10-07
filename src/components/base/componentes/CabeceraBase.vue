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

const props = defineProps<{
  esPantallaPequena?: boolean;
}>();

const emit = defineEmits<{
  (e: 'alternar-menu'): void;
}>();

const informacionUsuario = computed(() => almacenPrincipalBase.informacionUsuario);

// Items del menú unificado (usado tanto en desktop como móvil)
const itemsMenu = ref<ItemMenu[]>([
  {
    label: 'Perfil',
    icon: 'sri-icon-perfil',
    route: '/perfil'
  },
  {
    label: 'Notificaciones',
    icon: 'sri-icon-correos',
    command: () => console.log('Notificaciones clicked')
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
  {
    label: 'Ayuda',
    icon: 'sri-icon-ayuda',
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
        <div class="columna-6 columna-md-3 columna-lg-3 encabezado-izquierda">
          <div class="mostrar-flex alinear-centro">
            <Button icon="sri-menu-icon-menu-hamburguesa " class="tamano-icono-hamburguesa" @click="manejarClickMenu"
              aria-label="Abrir o cerrar menu desplegado" />
            <div class="logo-contenedor">
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
        <div class="columna-6 columna-md-3 columna-lg-4 encabezado-derecha">
          <!-- Desktop: MenuBar solo con iconos -->
          <div v-if="!props.esPantallaPequena" class="menu-desktop-container">
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
              <Button type="button" icon="pi pi-ellipsis-v" @click="plegable" aria-haspopup="true"
                aria-controls="btnCubrirMenu" />
              <TieredMenu ref="menu" id="btnCubrirMenu" :model="itemsMenu" popup>
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
              </TieredMenu>
            </div>
            <!-- <Menubar :model="itemsMenu" class="menu-movil">
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
            </Menubar> -->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

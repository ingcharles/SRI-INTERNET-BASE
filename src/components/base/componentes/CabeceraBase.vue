<script setup lang="ts">
import { computed, ref } from 'vue';
import { usarAlmacenPrincipalBase } from '@/stores/base/principalBase';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import TieredMenu from 'primevue/tieredmenu';

const menuPrime = ref();
const almacenPrincipalBase = usarAlmacenPrincipalBase();
const emitir = defineEmits<(e: 'alternar-menu') => void>();
const informacionUsuario = computed(() => almacenPrincipalBase.informacionUsuario);
const itemsMenuPrime = computed(() => almacenPrincipalBase.itemsMenuPrime);

const plegable = (event: Event) => {
  if (menuPrime.value && menuPrime.value.toggle) {
    menuPrime.value.toggle(event);
  }
};

const propiedades = defineProps<{
  esPantallaExtraPequenia?: boolean;
  esPantallaPequenia?: boolean;
  esPantallaMediana?: boolean;
}>();


/**
 * Maneja el click en el botón del menú
 */
function manejarClickMenu() {
  emitir('alternar-menu');
}

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
            <Menubar :model="itemsMenuPrime">
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
            <Button type="button" icon="pi pi-ellipsis-v" class="tamanio-fuente" @click="plegable" aria-haspopup="true"
              aria-controls="btnCubrirMenu" />
            <TieredMenu ref="menu" id="btnCubrirMenu" :model="itemsMenuPrime" popup>
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

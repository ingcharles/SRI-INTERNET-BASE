<script setup lang="ts">
import { ref, computed } from 'vue';
import { usarAlmacenPrincipalBase } from '@/stores/base/principalBase';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import PanelMenu from 'primevue/panelmenu';
import type { MenuItem } from 'primevue/menuitem';
import type { ItemMenuNavegacion } from '@/interfaces/principalBase';

// Ref (Variable reactivas)
const textoBusqueda = ref('');

// Store (Almacenes)
const almacenPrincipalBase = usarAlmacenPrincipalBase();

// Propiedades computadas
const itemsMenuCabecera = computed<MenuItem[]>(() => {
  const items = almacenPrincipalBase.menuFiltradoNavegacion;

  if (textoBusqueda.value) {
    const busqueda = textoBusqueda.value;
    const itemsFiltrados = items.filter((item: MenuItem) =>
      item.etiqueta.includes(busqueda)
    );
    return convertirAMenuPrime(itemsFiltrados);
  }

  return convertirAMenuPrime(items);
});

// Props (Propiedades que recibe)
const propiedades = defineProps<{ mostrarMenuSoloIconos?: boolean; }>();
const itemsMenuSoloIconos = computed(() => {
  return almacenPrincipalBase.menuFiltradoNavegacion.filter((item: MenuItem) => item.icono);
});

// Emit (Eventos)
const emitir = defineEmits<(e: 'alternar-menu') => void>();

// Functions (Funciones)
/**
 * Convierte recursivamente los items del menú al formato de PrimeVue
 */
const convertirAMenuPrime = (items: ItemMenuNavegacion[], nivel = 0): MenuItem[] => {
  return items.map(item => {
    const menuItem: MenuItem & { level: number } = {
      id: item.id,
      label: item.etiqueta,
      icon: item.icono,
      route: item.ruta,
      level: nivel
    };

    if (item.hijos && item.hijos.length > 0) {
      menuItem.items = convertirAMenuPrime(item.hijos, nivel + 1);
    }

    return menuItem;
  });
}


/**
 * Limpia el texto de búsqueda
 */
function limpiarBusqueda() {
  textoBusqueda.value = '';
}

/**
 * Maneja el click en el menú lateral para alternar su estado
 */
const manejarClickMenu = () => emitir('alternar-menu');

</script>

<template>
  <aside class="menu-lateral" :class="{ 'solo-iconos': propiedades.mostrarMenuSoloIconos }">
    <!-- Buscador -->
    <div v-if="!propiedades.mostrarMenuSoloIconos" class="seccion-buscar">
      <div class="fila alinear-centro">
        <div class="columna-10">
          <InputText id="txtBusquedaServicios" type="search" v-model="textoBusqueda" placeholder="Buscar servicios" />
        </div>
        <div class="columna-2">
          <Button id="btnLimpiarBusqueda" v-if="textoBusqueda" icon="pi pi-times" class="p-button-text btn-buscar"
            @click="limpiarBusqueda" aria-label="Limpiar búsqueda" />
          <Button v-else icon="pi pi-search" class="p-button-text btn-buscar" aria-label="Buscar" />
        </div>
      </div>
    </div>

    <!-- Menú completo con texto -->
    <PanelMenu v-if="!propiedades.mostrarMenuSoloIconos" :model="itemsMenuCabecera">
      <template #item="{ item, active }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple class="p-panelmenu-header-link" :href="href" @click="navigate">
            <span class="p-panelmenu-header-icon" :class="item.icon" />
            <span class="p-panelmenu-header-label texto-subrayado tamanio-fuente-11">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple class="p-panelmenu-header-link" :href="item.route">
          <span v-if="item.items" :class="[
            'ui-panelmenu-icon fa fa-fw',
            active ? 'fa-caret-down' : 'fa-caret-right',
            item.level > 0 ? 'color-gris-medio' : ''
          ]" />
          <span class="p-panelmenu-header-icon" :class="item.icon" />
          <span class="p-panelmenu-header-label" :class="[

            item.level > 0 ? 'tamanio-fuente-11' : ''
          ]">{{ item.label }}</span>
        </a>

      </template>
    </PanelMenu>
    <!-- </PanelMenu> -->

    <!-- Solo iconos cuando está colapsado -->
    <div v-else class="lista-menu" @click="manejarClickMenu">
      <div class="mostrar-flex flex-columna alinear-centro">
        <Button :key="0" :icon="'fa fa-search'" :aria-label="'item.etiqueta'" :title="'item.etiqueta'" />
        <Button v-for="item in itemsMenuSoloIconos" :key="item.id" :icon="item.icono" :aria-label="item.etiqueta"
          :title="item.etiqueta" />
      </div>
    </div>
  </aside>
</template>

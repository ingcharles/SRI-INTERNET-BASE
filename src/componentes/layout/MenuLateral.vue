<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLayoutStore } from '@/almacenes/layout';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import PanelMenu from 'primevue/panelmenu';
import type { MenuItem } from 'primevue/menuitem';
import type { ItemMenu } from '@/interfaces/menu.interface';

const layoutStore = useLayoutStore();

defineProps<{
  soloIconos?: boolean;
}>();

const textoBusqueda = ref('');

/**
 * Convierte recursivamente los items del menú al formato de PrimeVue
 */
function convertirAMenuPrime(items: ItemMenu[]): MenuItem[] {
  return items.map(item => {
    const menuItem: MenuItem = {
      label: item.etiqueta,
      icon: item.icono,
      to: item.ruta
    };

    // Si tiene hijos, convertirlos recursivamente
    if (item.hijos && item.hijos.length > 0) {
      menuItem.items = convertirAMenuPrime(item.hijos);
    }

    return menuItem;
  });
}

const itemsMenuPrime = computed<MenuItem[]>(() => {
  const items = layoutStore.menuFiltrado;

  if (textoBusqueda.value) {
    const busqueda = textoBusqueda.value.toLowerCase();
    const itemsFiltrados = items.filter(item =>
      item.etiqueta.toLowerCase().includes(busqueda)
    );
    return convertirAMenuPrime(itemsFiltrados);
  }

  return convertirAMenuPrime(items);
});

/**
 * Items para mostrar solo iconos cuando el menú está colapsado
 */
const itemsIconos = computed(() => {
  return layoutStore.menuFiltrado.filter(item => item.icono);
});

/**
 * Limpia el texto de búsqueda
 */
function limpiarBusqueda() {
  textoBusqueda.value = '';
}
</script>

<template>
  <aside class="menu-lateral" :class="{ 'solo-iconos': soloIconos }">
    <!-- Buscador -->
    <div v-if="!soloIconos" class="seccion-buscar">
      <div class="fila alinear-centro">
        <div class="columna-10">
          <InputText type="search" v-model="textoBusqueda" placeholder="Buscar servicios" />
        </div>
        <div class="columna-2">
          <Button v-if="textoBusqueda" icon="pi pi-times" class="p-button-text btn-buscar" @click="limpiarBusqueda"
            aria-label="Limpiar búsqueda" />
          <Button v-else icon="pi pi-search" class="p-button-text btn-buscar" aria-label="Buscar" />
        </div>
      </div>
    </div>

    <!-- Navegación -->
    <!-- <nav class="menu-navegacion"> -->
    <!-- Menú completo con texto -->
    <PanelMenu v-if="!soloIconos" :model="itemsMenuPrime" />

    <!-- Solo iconos cuando está colapsado -->
    <div v-else class="lista-menu">
      <div class="mostrar-flex flex-columna alinear-centro espacio-2">
        <Button v-for="item in itemsIconos" :key="item.id" :icon="item.icono" class="p-button-rounded p-button-text"
          :aria-label="item.etiqueta" :title="item.etiqueta" />
      </div>
    </div>
    <!-- </nav> -->
  </aside>
</template>

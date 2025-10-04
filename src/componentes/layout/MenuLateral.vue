<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLayoutStore } from '@/almacenes/layout';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import PanelMenu from 'primevue/panelmenu';
import type { MenuItem } from 'primevue/menuitem';

const layoutStore = useLayoutStore();

const props = defineProps<{
  soloIconos?: boolean;
}>();

const textoBusqueda = ref('');

const itemsMenuPrime = computed<MenuItem[]>(() => {
  const items = layoutStore.menuFiltrado;

  if (textoBusqueda.value) {
    const busqueda = textoBusqueda.value.toLowerCase();
    return items
      .filter(item => item.etiqueta.toLowerCase().includes(busqueda))
      .map(item => ({
        label: item.etiqueta,
        icon: item.icono,
        to: item.ruta,
        items: item.hijos?.map(hijo => ({
          label: hijo.etiqueta,
          to: hijo.ruta
        }))
      }));
  }

  return items.map(item => ({
    label: item.etiqueta,
    icon: item.icono,
    to: item.ruta,
    items: item.hijos?.map(hijo => ({
      label: hijo.etiqueta,
      to: hijo.ruta
    }))
  }));
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
          <InputText v-model="textoBusqueda" placeholder="Buscar servicios" class="input-buscador" />
        </div>
        <div class="columna-2">
          <Button v-if="textoBusqueda" icon="pi pi-times" class="p-button-text btn-buscar" @click="limpiarBusqueda"
            aria-label="Limpiar búsqueda" />
          <Button v-else icon="pi pi-search" class="p-button-text btn-buscar" aria-label="Buscar" />
        </div>
      </div>
    </div>

    <!-- Navegación -->
    <nav class="menu-navegacion">
      <PanelMenu v-if="!soloIconos" :model="itemsMenuPrime" />
      <div v-else class="lista-menu">
        <div class="mostrar-flex flex-columna alinear-centro">
          <Button v-for="item in itemsMenuPrime" :key="item.label" :icon="item.icon"
            class="p-button-rounded p-button-secondary p-button-outlined" :aria-label="item.label" />
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usarAlmacenPrincipalBase } from '@/stores/base/principalBase';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import PanelMenu from 'primevue/panelmenu';
import type { MenuItem } from 'primevue/menuitem';
import type { ItemMenu } from '@/interfaces/menu.interface';

const almacenPrincipalBase = usarAlmacenPrincipalBase();

defineProps<{
  soloIconos?: boolean;
}>();

const textoBusqueda = ref('');

/**
 * Convierte recursivamente los items del menú al formato de PrimeVue
 */

function convertirAMenuPrime(items: ItemMenu[], level = 0): MenuItem[] {
  return items.map(item => {
    const menuItem: MenuItem & { nivel: number } = {
      label: item.etiqueta,
      icon: item.icono,
      to: item.ruta,
      nivel: level
    };

    if (item.hijos && item.hijos.length > 0) {
      menuItem.items = convertirAMenuPrime(item.hijos, level + 1);
    }

    return menuItem;
  });
}

const itemsMenuPrime = computed<MenuItem[]>(() => {
  const items = almacenPrincipalBase.menuFiltrado;

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
  return almacenPrincipalBase.menuFiltrado.filter(item => item.icono);
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
          <InputText id="txtBuscarServicios" type="search" v-model="textoBusqueda" placeholder="Buscar servicios" />
        </div>
        <div class="columna-2">
          <Button id="btnLimpiarBusqueda" v-if="textoBusqueda" icon="pi pi-times" class="p-button-text btn-buscar"
            @click="limpiarBusqueda" aria-label="Limpiar búsqueda" />
          <Button v-else icon="pi pi-search" class="p-button-text btn-buscar" aria-label="Buscar" />
        </div>
      </div>
    </div>

    <!-- Menú completo con texto -->
    <PanelMenu v-if="!soloIconos" :model="itemsMenuPrime">

      <template #item="{ item, active }">
        <router-link v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom>
          <a v-ripple class="p-panelmenu-header-link" :href="href" @click="navigate">
            <span class="p-panelmenu-header-icon" :class="item.icon" />
            <span class="p-panelmenu-header-label texto-subrayado tamanio-fuente-11">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple class="p-panelmenu-header-link" :href="item.to">
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

    <!-- Solo iconos cuando está colapsado -->
    <div v-else class="lista-menu">
      <div class="mostrar-flex flex-columna alinear-centro espacio-2">
        <Button v-for="item in itemsIconos" :key="item.id" :icon="item.icono" :aria-label="item.etiqueta"
          :title="item.etiqueta" />
      </div>
    </div>
  </aside>
</template>

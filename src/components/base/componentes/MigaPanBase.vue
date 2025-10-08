<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';
import type { MenuItem } from 'primevue/menuitem';
import { computed } from 'vue';

// Props (Propiedades que recibe)
const propiedades = defineProps<{
  rutaActual?: string[];
}>();

// Propiedades computadas
const itemsMigaPan = computed<MenuItem[]>(() => {
  if (!propiedades.rutaActual || propiedades.rutaActual.length === 0) {
    return [];
  }

  return propiedades.rutaActual.map((ruta, index) => ({
    label: ruta,
    to: index === propiedades.rutaActual!.length - 1 ? undefined : `/${ruta.toLowerCase()}`
  }));
});

const itemInicio: MenuItem = {
  icon: 'pi pi-home',
  to: '/'
};
</script>

<template>
  <div v-if="rutaActual && rutaActual.length > 0" class="fila">
    <div class="columna-12">
      <div class="seccion-miga-pan">
        <Breadcrumb :home="itemInicio" :model="itemsMigaPan" />
      </div>
    </div>
  </div>
</template>

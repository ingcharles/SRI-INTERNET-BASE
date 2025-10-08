<script setup lang="ts">
import MigaPanBase from '@/components/base/componentes/MigaPanBase.vue';

// Props (Propiedades que recibe)
const propiedades = defineProps<{ rutaActual?: string[]; }>();

</script>

<template>
  <main class="contenido-principal">
    <div class="contenedor-fluido">
      <!-- Breadcrumb -->
      <MigaPanBase :ruta-actual="propiedades.rutaActual" />
      <!-- Área de contenido -->
      <div class="fila">
        <div class="columna-12">
          <div class="area-contenido">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

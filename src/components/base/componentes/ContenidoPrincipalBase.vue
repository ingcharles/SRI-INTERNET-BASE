<script setup lang="ts">
import MigaPanBase from './MigaPanBase.vue';

const props = defineProps<{
  rutaActual?: string[];
}>();
</script>

<template>
  <main class="contenido-principal">
    <div class="contenedor-fluido">
      <!-- Breadcrumb -->
      <MigaPanBase :ruta-actual="rutaActual" />

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

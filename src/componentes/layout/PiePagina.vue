<script setup lang="ts">
const anioActual = new Date().getFullYear();
const version = '1.0.0';
</script>

<template>
  <footer class="pie-pagina">
    <div class="pie-contenido">
      <div class="pie-seccion">
        <a href="#" class="pie-enlace">Términos y Condiciones</a>
        <span class="separador">|</span>
        <a href="#" class="pie-enlace">Política de Privacidad</a>
      </div>
      <div class="pie-seccion">
        <span class="pie-texto">© {{ anioActual }} SRI - Servicio de Rentas Internas</span>
      </div>
      <div class="pie-seccion">
        <span class="pie-texto">Versión {{ version }}</span>
      </div>
    </div>
  </footer>
</template>

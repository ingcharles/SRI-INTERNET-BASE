<script setup lang="ts">
const anioActual = new Date().getFullYear();
const version = '1.0.0';
</script>

<template>
  <footer class="pie-pagina">
    <div class="contenedor-fluido">
      <div class="fila alinear-centro">
        <!-- Enlaces legales -->
        <div class="columna-12 columna-md-4">
          <div class="mostrar-flex justificar-centro justificar-md-inicio alinear-centro">
            <a href="#" class="pie-enlace">Términos y Condiciones</a>
            <span class="separador">|</span>
            <a href="#" class="pie-enlace">Política de Privacidad</a>
          </div>
        </div>

        <!-- Copyright -->
        <div class="columna-12 columna-md-4">
          <div class="mostrar-flex justificar-centro">
            <p class="pie-texto">© {{ anioActual }} SRI - Servicio de Rentas Internas</p>
          </div>
        </div>

        <!-- Versión -->
        <div class="columna-12 columna-md-4">
          <div class="mostrar-flex justificar-centro justificar-md-fin">
            <p class="pie-texto">Versión {{ version }}</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

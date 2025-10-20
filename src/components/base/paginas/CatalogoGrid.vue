<script setup lang="ts">
/**
 * Componente de ejemplo del sistema de grid en español
 */
</script>

<template>
  <div class="ejemplo-grid">
    <h2>Sistema de Grid Responsivo en Español</h2>

    <!-- Ejemplo 1: Grid Básico -->
    <section class="seccion-ejemplo">
      <h3>1. Grid Básico (12 columnas)</h3>
      <div class="contenedor">
        <div class="fila">
          <div class="columna-12">
            <div class="caja">columna-12</div>
          </div>
        </div>
        <div class="fila">
          <div class="columna-6">
            <div class="caja">columna-6</div>
          </div>
          <div class="columna-6">
            <div class="caja">columna-6</div>
          </div>
        </div>
        <div class="fila">
          <div class="columna-4">
            <div class="caja">columna-4</div>
          </div>
          <div class="columna-4">
            <div class="caja">columna-4</div>
          </div>
          <div class="columna-4">
            <div class="caja">columna-4</div>
          </div>
        </div>
        <div class="fila">
          <div class="columna-3">
            <div class="caja">columna-3</div>
          </div>
          <div class="columna-3">
            <div class="caja">columna-3</div>
          </div>
          <div class="columna-3">
            <div class="caja">columna-3</div>
          </div>
          <div class="columna-3">
            <div class="caja">columna-3</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ejemplo 2: Grid Responsivo -->
    <section class="seccion-ejemplo">
      <h3>2. Grid Responsivo</h3>
      <p class="descripcion">
        Cambia el tamaño de la ventana para ver el efecto
      </p>
      <div class="contenedor">
        <div class="fila">
          <div class="columna-12 columna-md-6 columna-lg-4">
            <div class="caja">12 cols (móvil) → 6 cols (tablet) → 4 cols (desktop)</div>
          </div>
          <div class="columna-12 columna-md-6 columna-lg-4">
            <div class="caja">12 cols (móvil) → 6 cols (tablet) → 4 cols (desktop)</div>
          </div>
          <div class="columna-12 columna-md-12 columna-lg-4">
            <div class="caja">12 cols (móvil) → 12 cols (tablet) → 4 cols (desktop)</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ejemplo 3: Desplazamiento (Offset) -->
    <section class="seccion-ejemplo">
      <h3>3. Desplazamiento (Offset)</h3>
      <div class="contenedor">
        <div class="fila">
          <div class="columna-4 desplazar-4">
            <div class="caja">columna-4 desplazar-4 (centrado)</div>
          </div>
        </div>
        <div class="fila">
          <div class="columna-3 desplazar-3">
            <div class="caja">columna-3 desplazar-3</div>
          </div>
          <div class="columna-3 desplazar-3">
            <div class="caja">columna-3 desplazar-3</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ejemplo 4: Alineación -->
    <section class="seccion-ejemplo">
      <h3>4. Alineación</h3>
      <div class="contenedor">
        <div class="fila alinear-centro" style="min-height: 100px; background: #f0f0f0;">
          <div class="columna-4">
            <div class="caja">Centrado verticalmente</div>
          </div>
        </div>
        <div class="fila justificar-centro" style="margin-top: 1rem;">
          <div class="columna-4">
            <div class="caja">Centrado horizontalmente</div>
          </div>
        </div>
        <div class="fila justificar-entre" style="margin-top: 1rem;">
          <div class="columna-3">
            <div class="caja">Inicio</div>
          </div>
          <div class="columna-3">
            <div class="caja">Fin</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ejemplo 5: Orden -->
    <section class="seccion-ejemplo">
      <h3>5. Cambiar Orden</h3>
      <div class="contenedor">
        <div class="fila">
          <div class="columna-4 orden-3">
            <div class="caja">Primero en HTML, Tercero en pantalla</div>
          </div>
          <div class="columna-4 orden-1">
            <div class="caja">Segundo en HTML, Primero en pantalla</div>
          </div>
          <div class="columna-4 orden-2">
            <div class="caja">Tercero en HTML, Segundo en pantalla</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ejemplo 6: Sin Espaciado -->
    <section class="seccion-ejemplo">
      <h3>6. Sin Espaciado (Gutters)</h3>
      <div class="contenedor">
        <div class="fila sin-espaciado">
          <div class="columna-4">
            <div class="caja">Sin espaciado</div>
          </div>
          <div class="columna-4">
            <div class="caja">Sin espaciado</div>
          </div>
          <div class="columna-4">
            <div class="caja">Sin espaciado</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ejemplo 7: Utilidades Flex -->
    <section class="seccion-ejemplo">
      <h3>7. Utilidades Flex</h3>
      <div class="contenedor">
        <div class="fila">
          <div class="columna-6">
            <div class="mostrar-flex justificar-entre alinear-centro" style="background: #f0f0f0; padding: 1rem;">
              <span>Inicio</span>
              <span>Centro</span>
              <span>Fin</span>
            </div>
          </div>
          <div class="columna-6">
            <div class="mostrar-flex flex-columna espacio-2" style="background: #f0f0f0; padding: 1rem;">
              <div class="caja-pequenia">Item 1</div>
              <div class="caja-pequenia">Item 2</div>
              <div class="caja-pequenia">Item 3</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ejemplo-grid {
  padding: 2rem;
}

.seccion-ejemplo {
  margin-bottom: 3rem;
}

.seccion-ejemplo h3 {
  color: var(--color-azul-principal);
  margin-bottom: 1rem;
}

.descripcion {
  color: var(--color-gris-medio);
  font-style: italic;
  margin-bottom: 1rem;
}

.caja {
  background-color: var(--color-celeste);
  border: 2px solid var(--color-azul-principal);
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  color: var(--color-gris-fuerte);
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.caja-pequenia {
  background-color: var(--color-turqueza-claro);
  border: 1px solid var(--color-turqueza-fuerte);
  padding: 0.5rem;
  text-align: center;
}

.fila {
  margin-bottom: 1rem;
}
</style>

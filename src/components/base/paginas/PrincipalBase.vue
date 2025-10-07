<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usarAlmacenPrincipalBase } from '@/stores/base/principalBase';
import CabeceraBase from '@/components/base/componentes/CabeceraBase.vue';
import MenuNavegacionBase from '@/components/base/componentes/MenuNavegacionBase.vue';
import ContenidoPrincipalBase from '@/components/base/componentes/ContenidoPrincipalBase.vue';

// Constantes
const ANCHO_PANTALLA_PEQUENA = 768;

// Store
const almacenPrincipalBase = usarAlmacenPrincipalBase();

// Alternativa sin @vueuse/core
const anchoPantalla = ref(window.innerWidth);

// Computeds
const esPantallaPequena = computed(() => anchoPantalla.value < ANCHO_PANTALLA_PEQUENA);
const menuColapsado = computed(() => !almacenPrincipalBase.menuLateralVisible);

/**
 * Determina si se deben mostrar solo iconos en el menú
 * En móviles: iconos cuando el menú móvil no está visible
 * En desktop: iconos cuando el menú lateral está colapsado
 */
const mostrarSoloIconos = computed(() =>
  esPantallaPequena.value
    ? !almacenPrincipalBase.menuMovilVisible
    : menuColapsado.value
);

/**
 * Clases dinámicas para el contenedor principal
 */
const clasesContenedor = computed(() => ({
  'menu-movil-expandido': esPantallaPequena.value && almacenPrincipalBase.menuMovilVisible
}));

/**
 * Clases dinámicas para el menú de navegación
 */
const clasesMenuNavegacion = computed(() => ({
  'menu-movil-visible': esPantallaPequena.value && almacenPrincipalBase.menuMovilVisible
}));

/**
 * Clases dinámicas para el contenido principal
 */
const clasesContenidoPrincipal = computed(() => ({
  'menu-colapsado': menuColapsado.value
}));

/**
 * Maneja el cambio de tamaño de la ventana
 */
const manejarRedimension = () => {
  anchoPantalla.value = window.innerWidth;
};

/**
 * Alterna la visibilidad del menú según el tamaño de pantalla
 */
const manejarToggleMenu = () => {
  if (esPantallaPequena.value) {
    almacenPrincipalBase.alternarMenuMovil();
  } else {
    almacenPrincipalBase.alternarMenuLateral();
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('resize', manejarRedimension);
});

onUnmounted(() => {
  window.removeEventListener('resize', manejarRedimension);
});
</script>

<template>
  <div class="contenedor-principal" :class="clasesContenedor">
    <CabeceraBase :es-pantalla-pequena="esPantallaPequena" @alternar-menu="manejarToggleMenu" />

    <MenuNavegacionBase :solo-iconos="mostrarSoloIconos" :class="clasesMenuNavegacion" />

    <ContenidoPrincipalBase :class="clasesContenidoPrincipal" :ruta-actual="['Inicio']">
      <router-view />
    </ContenidoPrincipalBase>
  </div>
</template>

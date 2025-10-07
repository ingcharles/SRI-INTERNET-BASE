<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usarAlmacenPrincipalBase } from '@/stores/base/principalBase';
import CabeceraBase from '@/components/base/componentes/CabeceraBase.vue';
import MenuNavegacionBase from '@/components/base/componentes/MenuNavegacionBase.vue';
import ContenidoPrincipalBase from '@/components/base/componentes/ContenidoPrincipalBase.vue';

// Constantes
const ANCHO_PANTALLA_EXTRA_PEQUENIA = 576;
const ANCHO_PANTALLA_PEQUENIA = 768;
const ANCHO_PANTALLA_MEDIANA = 992;

// Store
const almacenPrincipalBase = usarAlmacenPrincipalBase();

// Alternativa sin @vueuse/core
const anchoPantalla = ref(window.innerWidth);

// Computeds
const esPantallaExtraPequenia = computed(() => anchoPantalla.value < ANCHO_PANTALLA_EXTRA_PEQUENIA);
const esPantallaPequenia = computed(() => anchoPantalla.value < ANCHO_PANTALLA_PEQUENIA);
const esPantallaMediana = computed(() => anchoPantalla.value < ANCHO_PANTALLA_MEDIANA);
const menuColapsado = computed(() => !almacenPrincipalBase.menuLateralVisible);

/**
 * Determina si se deben mostrar solo iconos en el menú
 * En móviles: iconos cuando el menú móvil no está visible
 * En desktop: iconos cuando el menú lateral está colapsado
 */
const mostrarSoloIconos = computed(() =>
  esPantallaPequenia.value
    ? !almacenPrincipalBase.menuMovilVisible
    : menuColapsado.value
);

/**
 * Clases dinámicas para el menú de navegación
 */
const clasesMenuNavegacion = computed(() => ({
  'menu-movil-visible': esPantallaPequenia.value && almacenPrincipalBase.menuMovilVisible
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
  if (esPantallaPequenia.value) {
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
  <div class="contenedor-principal">
    <CabeceraBase :es-pantalla-extra-pequenia="esPantallaExtraPequenia" :es-pantalla-pequenia="esPantallaPequenia"
      :es-pantalla-mediana="esPantallaMediana" @alternar-menu="manejarToggleMenu" />

    <MenuNavegacionBase :solo-iconos="mostrarSoloIconos" :class="clasesMenuNavegacion" />

    <ContenidoPrincipalBase :class="clasesContenidoPrincipal" :ruta-actual="['Inicio']">
      <router-view />
    </ContenidoPrincipalBase>
  </div>
</template>

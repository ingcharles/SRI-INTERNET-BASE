<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usarAlmacenPrincipalBase } from '@/stores/base/principalBase';
import CabeceraBase from '@/components/base/componentes/CabeceraBase.vue';
import MenuNavegacionBase from '@/components/base/componentes/MenuNavegacionBase.vue';
import ContenidoPrincipalBase from '@/components/base/componentes/ContenidoPrincipalBase.vue';

// Constants (Constantes)
const ANCHO_PANTALLA_EXTRA_PEQUENIA = 576;
const ANCHO_PANTALLA_PEQUENIA = 768;
const ANCHO_PANTALLA_MEDIANA = 992;

// Store (Almacenes)
const almacenPrincipalBase = usarAlmacenPrincipalBase();

// Ref (Variable reactivas)
const anchoPantalla = ref(window.innerWidth);

// Computed (Propiedades computadas)
const esPantallaExtraPequenia = computed(() => anchoPantalla.value < ANCHO_PANTALLA_EXTRA_PEQUENIA);
const esPantallaPequenia = computed(() => anchoPantalla.value < ANCHO_PANTALLA_PEQUENIA);
const esPantallaMediana = computed(() => anchoPantalla.value < ANCHO_PANTALLA_MEDIANA);
const menuColapsado = computed(() => !almacenPrincipalBase.menuLateralVisible);

/**
 * Determina si se deben mostrar solo iconos en el menú
 */
const mostrarMenuSoloIconos = computed(() =>
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

// Functions (Funciones)
/**
 * Maneja el cambio de tamaño de la ventana
 */
const manejarRedimension = () => {
  anchoPantalla.value = window.innerWidth;
};

/**
 * Alterna la visibilidad del menú según el tamaño de pantalla
 */
const manejarPlegableMenu = () => {
  if (esPantallaPequenia.value) {
    almacenPrincipalBase.alternarMenuMovil();
  } else {
    almacenPrincipalBase.alternarMenuEscritorio();
  }
};

// Lifecycle hooks (Métodos del ciclo de vida)
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
      :es-pantalla-mediana="esPantallaMediana" @alternar-menu="manejarPlegableMenu" />

    <MenuNavegacionBase :mostrar-menu-solo-iconos="mostrarMenuSoloIconos" :class="clasesMenuNavegacion" />

    <ContenidoPrincipalBase :class="clasesContenidoPrincipal" :ruta-actual="['Inicio']">
      <router-view />
    </ContenidoPrincipalBase>

  </div>
</template>

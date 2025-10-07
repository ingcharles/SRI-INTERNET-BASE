<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usarAlmacenPrincipalBase } from '@/stores/base/principalBase';
import CabeceraBase from '@/components/base/componentes/CabeceraBase.vue';
import MenuNavegacionBase from '@/components/base/componentes/MenuNavegacionBase.vue';
import ContenidoPrincipalBase from '@/components/base/componentes/ContenidoPrincipalBase.vue';


const almacenPrincipalBase = usarAlmacenPrincipalBase();
const anchoPantalla = ref(window.innerWidth);

const esPantallaPequena = computed(() => anchoPantalla.value < 768);
const menuColapsado = computed(() => !almacenPrincipalBase.menuLateralVisible);

// En móviles: siempre mostrar solo iconos cuando no está expandido el menú móvil
// En desktop: mostrar solo iconos cuando el menú lateral está colapsado
const mostrarSoloIconos = computed(() => {
  if (esPantallaPequena.value) {
    return !almacenPrincipalBase.menuMovilVisible;
  }
  return menuColapsado.value;
});

/**
 * Maneja el cambio de tamaño de la ventana
 */
function manejarRedimension() {
  anchoPantalla.value = window.innerWidth;
}

/**
 * Maneja el toggle del menú
 */
function manejarToggleMenu() {
  if (esPantallaPequena.value) {
    almacenPrincipalBase.alternarMenuMovil();
  } else {
    almacenPrincipalBase.alternarMenuLateral();
  }
}

onMounted(() => {
  window.addEventListener('resize', manejarRedimension);
});

onUnmounted(() => {
  window.removeEventListener('resize', manejarRedimension);
});
</script>

<template>
  <div class="app-container"
    :class="{ 'menu-movil-expandido': esPantallaPequena && almacenPrincipalBase.menuMovilVisible }">
    <CabeceraBase :es-pantalla-pequena="esPantallaPequena" @alternar-menu="manejarToggleMenu" />

    <MenuNavegacionBase :solo-iconos="mostrarSoloIconos" :class="{
      'menu-movil-visible': esPantallaPequena && almacenPrincipalBase.menuMovilVisible
    }" />

    <ContenidoPrincipalBase :class="{ 'menu-colapsado': menuColapsado }" :ruta-actual="['Inicio']">
      <router-view />
    </ContenidoPrincipalBase>

  </div>
</template>

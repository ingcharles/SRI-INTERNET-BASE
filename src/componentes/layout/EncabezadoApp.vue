<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutStore } from '@/almacenes/layout';
import Button from 'primevue/button';

const layoutStore = useLayoutStore();

const props = defineProps<{
  esPantallaPequena?: boolean;
}>();

const emit = defineEmits<{
  (e: 'alternar-menu'): void;
}>();

const informacionUsuario = computed(() => layoutStore.informacionUsuario);

/**
 * Maneja el click en el botón del menú
 */
function manejarClickMenu() {
  emit('alternar-menu');
}
</script>

<template>
  <header class="encabezado-app">
    <div class="encabezado-izquierda">
      <Button icon="pi pi-bars" class="p-button-text p-button-rounded boton-menu" @click="manejarClickMenu"
        aria-label="Menú" />
      <div class="logo-contenedor">
        <span class="logo-texto">SRI</span>
        <span class="logo-subtexto">en línea</span>
      </div>
    </div>

    <div class="encabezado-centro">
      <div class="info-usuario">
        <span class="info-label">{{ informacionUsuario.identificacion }}</span>
        <span class="info-label">{{ informacionUsuario.nombre }}</span>
      </div>
    </div>

    <div class="encabezado-derecha">
      <template v-if="!esPantallaPequena">
        <Button icon="pi pi-user" class="p-button-text p-button-rounded" aria-label="Perfil" />
        <Button icon="pi pi-bell" class="p-button-text p-button-rounded" aria-label="Notificaciones" />
        <Button icon="pi pi-home" class="p-button-text p-button-rounded" aria-label="Inicio" />
        <Button icon="pi pi-sign-in" class="p-button-text p-button-rounded" aria-label="Iniciar sesión" />
        <Button icon="pi pi-sign-out" class="p-button-text p-button-rounded" aria-label="Cerrar sesión" />
        <Button icon="pi pi-eye" class="p-button-text p-button-rounded" aria-label="Accesibilidad" />
      </template>
      <template v-else>
        <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-rounded" aria-label="Más opciones" />
      </template>
    </div>
  </header>
</template>

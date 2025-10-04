<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';
import type { MenuItem } from 'primevue/menuitem';
import { computed } from 'vue';

const props = defineProps<{
    rutaActual?: string[];
}>();

const itemsMiga = computed<MenuItem[]>(() => {
    if (!props.rutaActual || props.rutaActual.length === 0) {
        return [];
    }

    return props.rutaActual.map((ruta, index) => ({
        label: ruta,
        to: index === props.rutaActual!.length - 1 ? undefined : `/${ruta.toLowerCase()}`
    }));
});

const itemInicio: MenuItem = {
    icon: 'pi pi-home',
    to: '/'
};
</script>

<template>
    <main class="contenido-principal">
        <div v-if="rutaActual && rutaActual.length > 0" class="seccion-breadcrumb">
            <Breadcrumb :home="itemInicio" :model="itemsMiga" />
        </div>

        <div class="area-contenido">
            <slot />
        </div>
    </main>
</template>

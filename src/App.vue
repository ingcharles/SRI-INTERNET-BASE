<template>
  <PrincipalBase />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const PrincipalBase = defineAsyncComponent(
  () => import('@/components/base/paginas/PrincipalBase.vue'),
)
</script>

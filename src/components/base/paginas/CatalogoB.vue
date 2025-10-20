<!--
* Nombre: CatalogoB.vue
* Descripción: componente de ejemplo de componentes de la suite de primevue con sus estilos respectivos.
* Autor: Coordinación de Gestión de Datos y Arquitectura Tecnológica
* Copyright 2024 Servicio de Rentas Internas.
-->

<template>
  <div class="contenedor color-gris-fuerte">
    <div class="mostrar-flex flex-columna">
      <h1 class="titulo">{{ t('catalogoB.titulo') }}</h1>
      <div class="subtitulo">{{ t('catalogoB.subtitulo') }}</div>
      <div class="instrucciones">{{ t('catalogoB.instrucciones') }}</div>

      <Stepper value="1">
        <StepList>

          <Step v-for="item in items" :key="item.etiqueta" :value="item.valor">{{ item.etiqueta }}</Step>

        </StepList>
        <StepPanels>
          <StepPanel v-for="item in items" :key="item.valor" :value="item.valor">
            <div class="mostrar-flex flex-columna h-48">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
                {{ item.etiqueta }}
              </div>
            </div>
            <!-- <div class="mostrar-flex pt-6"
              :class="item.valor === '1' ? 'justify-end' : item.valor === items.length.toString() ? 'justify-start' : 'justify-between'">
              <Button v-if="item.valor !== '1'" :label="t('catalogoB.botones.anterior')" severity="secondary"
                icon="pi pi-arrow-left" @click="activateCallback((parseInt(item.valor) - 1).toString())" />
              <Button v-if="item.valor !== items.length.toString()" :label="t('catalogoB.botones.siguiente')"
                icon="pi pi-arrow-right" iconPos="right"
                @click="activateCallback((parseInt(item.valor) + 1).toString())" />
            </div> -->
          </StepPanel>
        </StepPanels>
      </Stepper>
      <div class="relleno-10" />
      <Tabs value="0">
        <TabList class="mostrar-flex">
          <Tab v-for="tab in tabs" :key="tab.titulo" :value="tab.valor" class="flex-llenar texto-izquierda">{{
            t(tab.titulo) }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="tab in tabs" :key="tab.contenido" :value="tab.valor">
            <h2>{{ t(tab.contenido) }}</h2>
            <div v-if="tab.valor === '0'" class="centrar-botones">
              <Button id="btnSucess" :label="t('catalogoB.botones.exito')" class="p-button-success" />
              <Button id="btnInfo" :label="t('catalogoB.botones.info')" class="p-button-info" />
              <Button id="btnWarning" :label="t('catalogoB.botones.advertencia')" class="p-button-warning" />
              <Button id="btnHelp" :label="t('catalogoB.botones.ayuda')" class="p-button-help" />
              <Button id="btnDanger" :label="t('catalogoB.botones.peligro')" class="p-button-danger" />
              <Button id="btnAnterior" :label="t('catalogoB.botones.anterior')" icon="fa fa-fw fa-caret-left"
                icon-pos="left" />
              <Button id="btnSiguiente" :label="t('catalogoB.botones.siguiente')" icon="fa fa-fw fa-caret-right"
                icon-pos="right" />
              <Button id="btnAgregarElemento" v-tooltip.top="t('catalogoB.botones.tooltipBotonAgregar')" type="button"
                icon="pi pi-plus" class="p-button-secondary p-button-plus">
              </Button>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import Step from 'primevue/step'
import StepPanels from 'primevue/steppanels'
import StepPanel from 'primevue/steppanel'
import Button from 'primevue/button'
import type { StepItem, TabItem } from '@/interfaces/principalBase'
import { useI18n } from 'vue-i18n'

// Composable de internacionalización
const { t } = useI18n()

// Variable para los items del Stepper
const items: StepItem[] = [
  {
    etiqueta: 'Personal',
    valor: '1'
  },
  {
    etiqueta: 'Impuestos',
    valor: '2'
  },
  {
    etiqueta: 'Periodo fiscal',
    valor: '3'
  },
  {
    etiqueta: 'Confirmación',
    valor: '4'
  },
  {
    etiqueta: 'Resumen transacción',
    valor: '5'
  }
]

// Array de tabs con las claves de traducción
const tabs: TabItem[] = [
  { titulo: 'catalogoB.cabecera1', contenido: 'catalogoB.contenido1', valor: '0' },
  { titulo: 'catalogoB.cabecera2', contenido: 'catalogoB.contenido2', valor: '1' },
  { titulo: 'catalogoB.cabecera3', contenido: 'catalogoB.contenido3', valor: '2' },
  { titulo: 'catalogoB.cabecera4', contenido: 'catalogoB.contenido4', valor: '3' }
]
</script>

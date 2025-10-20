<!--
* Nombre: CatalogoA.vue
* Descripción: componente de ejemplo de componentes de la suite de primevue con sus estilos respectivos.
* Autor: Coordinación de Gestión de Datos y Arquitectura Tecnológica
* Copyright 2024 Servicio de Rentas Internas.
-->

<template>
  <div class="contenido-form">
    <div class="contenedor">
      <div class="fila">
        <div class="columna-12 columna-md-8 columna-lg-6 desplazar-md-2 desplazar-lg-3">
          <div class="fila">
            <div class="columna-12">
              <h1 class="titulo">{{ t('catalogoA.titulo') }}</h1>
              <div class="subtitulo">{{ t('catalogoA.subtitulo') }}</div>
              <div class="instrucciones">{{ t('catalogoA.instrucciones') }}</div>
              <Message v-if="mensaje" id="msgMensajeAdvertencia" :severity="severidadMensaje" :closable="false">{{
                mensaje }}
              </Message>
            </div>
          </div>
          <div class="fila">
            <div class="columna-12 columna-md-12 columna-lg-4">
              <label id="lblCiudades" for="ddnListaCiudadesSeleccionadasInputA">*{{ t('catalogoA.seccion_a.ciudades')
              }}</label>
            </div>
            <div class="columna-12 columna-md-12 columna-lg-4">
              <Select id="ddnListaCiudadesSeleccionadasA" input-id="ddnListaCiudadesSeleccionadasInputA"
                v-model="ciudadSeleccionada2" :options="ciudades" option-label="nombre" option-value="codigo"
                :editable="true" :placeholder="t('catalogoA.mensaje_seleccione')" />
            </div>
            <div class="columna-12 columna-md-12 columna-lg-4">
              <InlineMessage v-if="campoObligatorio && descripcion == ''" id="imsMensajeObligatorioB">{{
                t('mensaje.requerido') }}</InlineMessage>
            </div>
          </div>

          <div class="fila">
            <div class="columna-12 columna-md-12 columna-lg-4">
              <label id="lblCiudadesEditable" for="ddnListaCiudadesSeleccionadasInput">*{{
                t('catalogoA.seccion_a.ciudades_editable') }}</label>
            </div>
            <div class="columna-12 columna-md-12 columna-lg-4">
              <Select id="ddnListaCiudadesSeleccionadas" input-id="ddnListaCiudadesSeleccionadasInput"
                v-model="ciudadSeleccionada2" :options="ciudades" option-label="nombre" option-value="codigo"
                :editable="true" :placeholder="t('catalogoA.mensaje_seleccione')" />
            </div>
            <div class="columna-12 columna-md-12 columna-lg-4">
              <InlineMessage v-if="campoObligatorio && descripcion == ''" id="imsCiudadObligatorio">{{
                t('mensaje.requerido') }}</InlineMessage>
            </div>
          </div>

          <div class="fila">
            <div class="columna-12 columna-md-12 columna-lg-4">
              <label id="lblDatos" for="txtInformacionAdicional">*{{ t('catalogoA.seccion_a.datos') }}</label>
            </div>
            <div class="columna-12 columna-md-12 columna-lg-4">
              <InputText id="txtInformacionAdicional" type="text" :value="t('catalogoA.seccion_a.informacion')"
                disabled />
            </div>
            <div class="columna-12 columna-md-12 columna-lg-4 relleno-0">
              <span v-tooltip="t('catalogoA.seccion_a.informacion_adicional')"
                class="icono-info sri-icon-informacion"></span>
            </div>
          </div>

          <div class="fila">
            <div class="columna-12 columna-md-12 columna-lg-4">
              <label id="lblFecha" for="calFechaVigenciaInput">*{{ t('catalogoA.seccion_a.fecha') }}</label>
            </div>
            <div class="columna-12 columna-md-12 columna-lg-4">
              <DatePicker id="calFechaVigencia" v-model="fechaVigencia" input-id="calFechaVigenciaInput"
                :show-icon="true" :placeholder="t('catalogoA.formato_fecha')" />
            </div>
            <div class="columna-12 columna-md-12 columna-lg-4 relleno-0">
              <span v-tooltip="t('catalogoA.seccion_a.tooltip_fecha')" class="icono-info sri-icon-informacion"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="fila">
        <div class="columna-12 columna-md-8 columna-lg-6 desplazar-md-2 desplazar-lg-3">
          <div class="linea"></div>
          <h3>{{ t('catalogoA.titulo_fielset_regular') }}</h3>
          <div class="relleno-10" />
          <Fieldset :legend="t('catalogoA.seccion_b.titulo_fielset')">
            <div class="formulario">
              <h1 class="titulo">{{ t('catalogoA.seccion_b.titulo') }}</h1>
              <h2 class="subtitulo">{{ t('catalogoA.seccion_b.subtitulo') }}</h2>
              <div class="instrucciones">
                {{ t('catalogoA.seccion_b.instrucciones') }}
              </div>

              <div class="fila">
                <div class="columna-12 columna-md-12 columna-lg-4">
                  <label for="nombre">*{{ t('catalogoA.seccion_b.nombre') }}</label>
                </div>
                <div class="columna-12 columna-md-12 columna-lg-4">
                  <InputText id="nombre" v-model="nombre" type="text"
                    :placeholder="t('catalogoA.seccion_b.tooltip_nombre')" :x="150" />
                </div>
              </div>

              <div class="fila">
                <div class="columna-12 columna-md-12 columna-lg-4">
                  <label id="lblFechaVigenciaB" for="calFechaVigenciaBInput">*{{ t('catalogoA.seccion_b.fecha')
                  }}</label>
                </div>
                <div class="columna-12 columna-md-12 columna-lg-4">
                  <DatePicker id="calFechaVigencia2" v-model="fechaVigencia" input-id="calFechaVigenciaBInput"
                    :show-icon="true" :placeholder="t('catalogoA.formato_fecha')" />
                </div>
                <div class="columna-12 columna-md-12 columna-lg-4 relleno-0">
                  <span v-tooltip="t('catalogoA.seccion_b.tooltip_fecha')" class="icono-info sri-icon-informacion">
                  </span>
                </div>
              </div>


              <div class="fila justificar-centro">
                <Button id="btnGuardar" type="button" :label="t('catalogoA.seccion_b.boton_guardar')"
                  class="p-button-success" @click="guardar" />
                <Button id="btnCancelar" type="button" :label="t('catalogoA.seccion_b.boton_cancelar')"
                  class="p-button-secondary" @click="cancelar" />
              </div>
            </div>
          </Fieldset>
        </div>
      </div>

      <div class="fila">
        <div class="columna-12 columna-md-8 columna-lg-6 desplazar-md-2 desplazar-lg-3">
          <div class="linea"></div>
          <h3>{{ t('catalogoA.titulo_fielset_togeabble') }}</h3>
          <div class="relleno-10" />
          <Fieldset :legend="t('catalogoA.seccion_c.titulo_fielset')" :toggleable="true">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Message from 'primevue/message';
import InlineMessage from 'primevue/inlinemessage';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import type { Ciudad } from '@/interfaces/principalBase';
import type { SeveridadMensaje } from '@/types/base/principalBase';


// Composable de internacionalización
const { t } = useI18n();

// Estado reactivo
const fechaVigencia = ref<string>('');
const nombre = ref<string>('');
const mensaje = ref<string>('');
const descripcion = ref<string>('');
const severidadMensaje = ref<SeveridadMensaje>('info');
const campoObligatorio = ref<boolean>(false);
const ciudadSeleccionada = ref<string | null>(null);
const ciudadSeleccionada2 = ref<string | null>(null);

// Lista de ciudades
const ciudades = ref<Ciudad[]>([
  { nombre: 'Quito', codigo: 'QT' },
  { nombre: 'Guayaquil', codigo: 'GY' },
  { nombre: 'Cuenca', codigo: 'CU' },
  { nombre: 'Ambato', codigo: 'AB' },
  { nombre: 'Ibarra', codigo: 'IB' }
]);

/**
 * Maneja el evento de guardar
 */
function guardar() {
  console.log('Guardando datos...', {
    nombre: nombre.value,
    fechaVigencia: fechaVigencia.value,
    ciudadSeleccionada: ciudadSeleccionada.value
  });
}

/**
 * Maneja el evento de cancelar
 */
function cancelar() {
  nombre.value = '';
  fechaVigencia.value = '';
  ciudadSeleccionada.value = null;
  console.log('Formulario cancelado');
}
</script>

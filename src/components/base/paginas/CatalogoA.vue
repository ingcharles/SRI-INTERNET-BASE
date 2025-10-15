<!--
* Nombre: CatalogoA.vue
* Descripción: componente de ejemplo de componentes de la suite de primevue con sus estilos respectivos.
* Autor: Coordinación de Gestión de Datos y Arquitectura Tecnológica
* Copyright 2024 Servicio de Rentas Internas.
-->

<template>
  <div class="contenedor">
    <div class="formulario">
      <h1 class="titulo">{{ $t('catalogoA.titulo') }}</h1>
      <div class="subtitulo">{{ $t('catalogoA.subtitulo') }}</div>
      <div class="instrucciones">{{ $t('catalogoA.instrucciones') }}</div>
      <Message v-if="mensaje" id="msgMensajeAdvertencia" :severity="severidadMensaje" :closable="false">{{ mensaje }}
      </Message>
      <div class="grid-container-600">
        <div class="grid-item">
          <label id="lblCiudades" for="ddnListaCiudadesSeleccionadasInputA">*{{ $t('catalogoA.seccion_a.ciudades')
            }}</label>
        </div>
        <div class="grid-item">
          <Dropdown id="ddnListaCiudadesSeleccionadasA" input-id="ddnListaCiudadesSeleccionadasInputA"
            v-model="selectedCity2" :options="cities" option-label="name" option-value="code" :editable="true" :x="200"
            :placeholder="$t('catalogoA.mensaje_seleccione')" />
        </div>
        <div class="grid-item">
          <InlineMessage v-if="campoObligatorio && descripcion == ''" id="imsMensajeObligatorioB">{{
            $t('mensaje.requerido') }}</InlineMessage>
        </div>
        <div class="grid-item">
          <label id="lblCiudadesEditable" for="ddnListaCiudadesSeleccionadasInput">*{{
            $t('catalogoA.seccion_a.ciudades_editable') }}</label>
        </div>
        <div class="grid-item">
          <Dropdown id="ddnListaCiudadesSeleccionadas" input-id="ddnListaCiudadesSeleccionadasInput"
            v-model="selectedCity2" :options="cities" option-label="name" option-value="code" :editable="true" :x="200"
            :placeholder="$t('catalogoA.mensaje_seleccione')" />
        </div>
        <div class="grid-item">
          <InlineMessage v-if="campoObligatorio && descripcion == ''" id="imsCiudadObligatorio">{{
            $t('mensaje.requerido') }}</InlineMessage>
        </div>
        <div class="grid-item">
          <label id="lblDatos" for="txtInformacionAdicional">*{{ $t('catalogoA.seccion_a.datos') }}</label>
        </div>
        <div class="grid-item">
          <InputText id="txtInformacionAdicional" type="text" :value="$t('catalogoA.seccion_a.informacion')" :x="200"
            disabled />
          <span v-tooltip="$t('catalogoA.seccion_a.informacion_adicional')"
            class="icono-info sri-icon-informacion"></span>
        </div>
        <div class="grid-item"></div>
        <div class="grid-item">
          <label id="lblFecha" for="calFechaVigenciaInput">*{{ $t('catalogoA.seccion_a.fecha') }}</label>
        </div>
        <div class="grid-item">
          <Calendar id="calFechaVigencia" v-model="fechaVigencia" input-id="calFechaVigenciaInput" :show-icon="true"
            :x="200" :placeholder="$t('catalogoA.formato_fecha')" />
          <span v-tooltip="$t('catalogoA.seccion_a.tooltip_fecha')" class="icono-info sri-icon-informacion"></span>
        </div>
        <div class="grid-item"></div>
      </div>
      <div>
        <div class="linea"></div>
        <h3>{{ $t('catalogoA.titulo_fielset_regular') }}</h3>
        <div class="relleno-10" />
        <fieldset-primevue :legend="$t('catalogoA.seccion_b.titulo_fielset')">
          <div class="formulario">
            <h1 class="titulo">{{ $t('catalogoA.seccion_b.titulo') }}</h1>
            <h2 class="subtitulo">{{ $t('catalogoA.seccion_b.subtitulo') }}</h2>
            <div class="instrucciones">
              {{ $t('catalogoA.seccion_b.instrucciones') }}
            </div>
            <div class="grid-container-500">
              <div class="grid-item">
                <label for="nombre">*{{ $t('catalogoA.seccion_b.nombre') }}</label>
              </div>
              <div class="grid-item">
                <InputText id="nombre" v-model="nombre" type="text"
                  :placeholder="$t('catalogoA.seccion_b.tooltip_nombre')" :x="150" />
              </div>
              <div class="grid-item"></div>
              <div class="grid-item">
                <label id="lblFechaVigenciaB" for="calFechaVigenciaBInput">*{{ $t('catalogoA.seccion_b.fecha')
                  }}</label>
              </div>
              <div class="grid-item">
                <Calendar id="calFechaVigencia2" v-model="fechaVigencia" input-id="calFechaVigenciaBInput"
                  :show-icon="true" :x="150" :placeholder="$t('catalogoA.formato_fecha')" />
                <span v-tooltip="$t('catalogoA.seccion_b.tooltip_fecha')" class="icono-info sri-icon-informacion">
                </span>
              </div>
              <div class="grid-item"></div>
            </div>
            <div class="centrar-botones">
              <Button id="btnGuardar" type="button" :label="$t('catalogoA.seccion_b.boton_guardar')"
                class="p-button-success" />
              <Button id="btnCancelar" type="button" :label="$t('catalogoA.seccion_b.boton_cancelar')"
                class="p-button-secondary" />
            </div>
          </div>
        </fieldset-primevue>
        <div class="linea"></div>
        <h3>{{ $t('catalogoA.titulo_fielset_togeabble') }}</h3>
        <div class="relleno-10" />
        <fieldset-primevue :legend="$t('catalogoA.seccion_c.titulo_fielset')" :toggleable="true" :x="600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </fieldset-primevue>
      </div>
    </div>
  </div>
</template>

<script>
import FieldsetPrimevue from 'primevue/fieldset'
import { useI18n } from 'vue-i18n'

export default {
  components: {
    FieldsetPrimevue
  },
  setup() {
    useI18n()
  },
  data() {
    return {
      fechaVigencia: '',
      nombre: '',
      mensaje: '',
      campoObligatorio: false,
      selectedCity: null,
      selectedCity2: null,
      cities: [
        { name: 'Quito', code: 'UI' },
        { name: 'Guayaquil', code: 'GY' },
        { name: 'Cuenca', code: 'CU' },
        { name: 'Ambato', code: 'AB' },
        { name: 'Ibarra', code: 'IB' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.p-dropdown {
  width: 14rem;
}

.country-item {
  img {
    width: 17px;
    margin-right: 0.5rem;
  }
}
</style>

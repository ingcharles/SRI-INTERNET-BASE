<!--
* Nombre: ConsultarTipoParametro.vue
* Descripción: pagina de ejemplo de consumo de servicio rest con CRUD de una tabla denominada tipo parametro.
* Autor: Coordinación de Gestión de Datos y Arquitectura Tecnológica
* Copyright 2024 Servicio de Rentas Internas.
-->

<template>
  <div class="contenido-form">
    <div class="contenedor">
      <div class="fila">
        <div class="columna-12 columna-md-10 columna-lg-10 desplazar-md-1 desplazar-lg-1">
          <div class="fila">
            <div class="columna-12">
              <h1 class="titulo">{{ t('tipoParametro.crear.titulo') }}</h1>
              <div class="subtitulo">{{ t('tipoParametro.consultar.subtitulo') }}</div>
              <div class="instrucciones">{{ t('tipoParametro.consultar.instrucciones') }}</div>
              <Message v-if="mensajePantalla" id="msgMensajePantalla" :severity="severidadMensaje" :icon="iconoMensaje"
                :closable="false">
                {{ mensajePantalla }}
              </Message>
            </div>
          </div>

          <div class="fila">
            <div class="columna-12 columna-md-12 columna-lg-2">
              <label id="lblEstado" :for="estados[0].id">*Estado:</label>
            </div>
            <div class="columna-12 columna-md-12 columna-lg-6">
              <div v-for="estado of estados" :key="estado.id" style="display: inline-block; margin-right: 20px;">
                <RadioButton :id="'rbnEstado-' + estado.id" v-model="estadoSeleccionado" :input-id="estado.id"
                  name="estado" :value="estado.id" required />
                <label id="lblNombreEstado" class="margen-izquierdo-5" :for="estado.id">{{ estado.nombre }}</label>
              </div>
            </div>
            <div class="columna-12 columna-md-12 columna-lg-4">
              <InlineMessage class="espacio-1" v-if="campoObligatorio && estadoSeleccionado == ''"
                id="imsMensajeRequerido">
                {{ t('mensaje.requerido') }}
              </InlineMessage>
            </div>
          </div>

          <div class="fila justificar-centro">
            <Button id="btnBuscar" type="button" label="Buscar" @click="obtenerTiposParametrosPorEstado()" />
            <Button id="btnCancelar" type="button" label="Cancelar" class="p-button-secondary"
              @click="resetearDatos()" />
          </div>

          <div class="fila" v-if="tiposParametros.length > 0">
            <div class="columna-12">
              <div class="resumenDataTable">
                {{ t('tipoParametro.consultar.resumen') }}{{ tiposParametros.length }} {{
                  t('tipoParametro.consultar.resumen2') }}
              </div>
            </div>
          </div>

          <div class="fila">
            <div class="columna-12">
              <DataTable id="dttTiposParametros" :value="tiposParametros" emptyMessage="No hay registros disponibles"
                paginator :rows="10" :rows-per-page-options="[10, 20, 30, 40, 50]" table-style="width: 100%"
                :scrollable="true">
                <template #empty> {{ t('tipoParametro.consultar.sinresultados') }} </template>
                <Column field="codigo" header="Código" style="width: 10%"></Column>
                <Column field="nombre" header="Nombre" style="width: 20%"></Column>
                <Column field="descripcion" header="Descripción" style="width: 30%"></Column>
                <Column field="fechaVigencia" header="Fecha Vigencia" style="width: 15%"></Column>
                <Column field="estado" header="Estado" style="width: 10%"></Column>
                <Column header="Acciones" style="width: 15%">
                  <template #body="slotProps">
                    <div>
                      <Button id="btnActualizarTipoParametro" icon="sri-icon-editar"
                        class="p-button-rounded p-button-text" :disabled="estadoSeleccionado == 'INA'"
                        @click="habilitarDialogoActualizarTipoParametro(slotProps.data)" />
                      <Button id="btnEliminarTipoParametro" icon="sri-icon-eliminar"
                        class="p-button-rounded p-button-secondary p-button-text color-rojo"
                        :disabled="estadoSeleccionado == 'INA'"
                        @click="confirmarEliminarTipoParametro(slotProps.data)" />
                    </div>
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog id="dlgEliminarTipoParametro" v-model:visible="eliminarTipoParametroDialog" header="Confirm" :modal="true"
    :closable="false">
    <template #header>
      <div class="formulario">
        <h3>Confirmar Eliminación</h3>
      </div>
    </template>
    <div class="confirmation-content">
      <span v-if="tipoParametroSeleccionado">¿Está seguro que desea eliminar el Tipo Parámetro seleccionado?</span>
    </div>
    <template #footer>
      <div class="centrar-botones">
        <Button id="btnAceptar" label="Aceptar" class="p-button-success" @click="eliminarTipoParametroHandler" />
        <Button id="btnCancelarEliminar" label="Cancelar" class="p-button-secondary"
          @click="eliminarTipoParametroDialog = false" />
      </div>
    </template>
  </Dialog>
  <Dialog id="dlgActualizarTipoParametro" v-model:visible="actualizarTipoParametroDialog" :x="500" header="Confirm"
    :modal="true" :closable="false">
    <template #header>
      <div class="formulario">
        <h3>Actualizar Tipo Parámetro</h3>
        <p class="instrucciones">Ingrese los valores requeridos</p>
      </div>
    </template>
    <Message v-if="mensajes.length > 0" :severity="severidadMensaje" :icon="iconoMensaje" :closable="false">
      <span v-for="(mensaje, indice) in mensajes" :key="indice">
        {{ mensaje }}<br v-if="indice < mensajes.length - 1">
      </span>
    </Message>
    <div class="fila">
      <div class="columna-12 columna-md-12 columna-lg-3">
        <label id="lblNombre" for="txtNombre">*{{ t('tipoParametro.crear.nombre') }}</label>
      </div>
      <div class="columna-12 columna-md-12 columna-lg-6">
        <InputText id="txtNombre" v-model="datosFormularioActualizacion.nombre" type="text" with="500" maxlength="65"
          :placeholder="t('tipoParametro.crear.placeholder_nombre')" @input="manejarValidacionNombre" />
      </div>
      <div class="columna-12 columna-md-12 columna-lg-3">
        <InlineMessage class="espacio-1" v-if="v$?.nombre?.$error && v$.nombre.$errors[0].$validator === 'required'"
          id="imsCampoObligatorio">
          {{ v$.nombre.$errors[0].$message }}
        </InlineMessage>
      </div>
    </div>
    <div class="fila">
      <div class="columna-12 columna-md-12 columna-lg-3">
        <label id="lblDescripcion" for="txtDescripcion">*{{ t('tipoParametro.crear.descripcion') }}</label>
      </div>
      <div class="columna-12 columna-md-12 columna-lg-6">
        <Textarea id="txtDescripcion" v-model="datosFormularioActualizacion.descripcion" maxlength="200"
          :placeholder="t('tipoParametro.crear.placeholder_descripcion')" @input="manejarValidacionDescripcion" />
      </div>
      <div class="columna-12 columna-md-12 columna-lg-3">
        <InlineMessage class="espacio-1"
          v-if="v$?.descripcion?.$error && v$.descripcion.$errors[0].$validator === 'required'"
          id="imsDescripcionObligatorio">
          {{ v$.descripcion.$errors[0].$message }}
        </InlineMessage>
      </div>
    </div>
    <template #footer>
      <div class="fila justificar-centro">
        <Button id="btnActualizar" type="button" label="Aceptar" class="p-button-success"
          @click="actualizarTipoParametroHandler()" />
        <Button id="btnCancelarActualizacion" type="button" label="Cancelar" class="p-button-secondary"
          @click="resetearValoresActualizacion()" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import useValidate from '@vuelidate/core'
import { required, helpers, maxLength, minLength } from '@vuelidate/validators'
import {
  obtenerListaTipoParametroPorEstado,
  eliminarTipoParametro as eliminarTipoParametroServicio,
  actualizarTipoParametro as actualizarTipoParametroServicio
} from '../servicios/TipoParametroServicio'
import { permitirSoloLetrasYEspacios, permitirSoloLetrasYNumeros, alphaWithSpaces, alphaNumWithSpaces } from '@/utilitarios/ValidacionesBase'
import usuarioStore from '@/stores/UsuarioStore'
import Button from 'primevue/button'
import Message from 'primevue/message'
import InlineMessage from 'primevue/inlinemessage'
import RadioButton from 'primevue/radiobutton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'

// Interfaces
interface Estado {
  nombre: string
  id: string
}

interface TipoParametro {
  codigo?: string
  nombre: string
  descripcion: string
  fechaVigencia?: string
  estado?: string
}

interface ErrorValidacion {
  $validator: string
  $message: string
}

interface EventoInput {
  target: HTMLInputElement | HTMLTextAreaElement
}

// Composable de internacionalización
const { t } = useI18n()

// Estado reactivo
const mensajes = ref<string[]>([])
const tiposParametros = ref<TipoParametro[]>([])
const mensajePantalla = ref<string>('')
const campoObligatorio = ref<boolean>(false)
const estados = ref<Estado[]>([
  { nombre: 'Activo', id: 'ACT' },
  { nombre: 'Inactivo', id: 'INA' }
])
const estadoSeleccionado = ref<string>('ACT')
const tipoParametroSeleccionado = ref<TipoParametro>({} as TipoParametro)
const eliminarTipoParametroDialog = ref<boolean>(false)
const actualizarTipoParametroDialog = ref<boolean>(false)
const campoObligatorioAct = ref<boolean>(false)
const severidadMensaje = ref<'success' | 'info' | 'warn' | 'error'>('info')

// Objeto reactivo para manejar los datos del formulario de actualización
const datosFormularioActualizacion = ref({
  nombre: '',
  descripcion: ''
})

// Reglas de validación
const reglas = computed(() => ({
  nombre: {
    required: helpers.withMessage(t('mensaje.requerido'), required),
    maxLength: helpers.withMessage('Nombre: el número máximo de caracteres permitidos es de 65.', maxLength(65)),
    minLength: helpers.withMessage('Nombre: el número mínimo de caracteres permitidos es de 10.', minLength(10)),
    alphaWithSpaces: helpers.withMessage('Nombre: solo se permite ingresar letras.', alphaWithSpaces)
  },
  descripcion: {
    required: helpers.withMessage(t('mensaje.requerido'), required),
    minLength: helpers.withMessage('Descripción: el número mínimo de caracteres permitidos es de 50.', minLength(50)),
    maxLength: helpers.withMessage('Descripción: el número máximo de caracteres permitidos es de 200.', maxLength(200)),
    alphaNumWithSpaces: helpers.withMessage('Descripción: solo se permite ingresar letras y números', alphaNumWithSpaces)
  }
}))

// Validador
const v$ = useValidate(reglas, datosFormularioActualizacion)

// Computed property para el ícono dinámico según la severidad
const iconoMensaje = computed(() => {
  switch (severidadMensaje.value) {
    case 'success':
      return 'sri-icon-exito'
    case 'error':
      return 'sri-icon-error'
    case 'warn':
      return 'sri-icon-alerta'
    case 'info':
    default:
      return 'sri-icon-informacion'
  }
})

/**
 * Obtiene el token del usuario logueado
 */
const obtenerTokenUsuarioLogueado = (): string => {
  return usuarioStore().getTokenUsuario
}

/**
 * Obtiene los tipos de parámetros por estado
 */
const obtenerTiposParametrosPorEstado = async (): Promise<void> => {
  mensajePantalla.value = ''
  const token = obtenerTokenUsuarioLogueado()

  if (estadoSeleccionado.value === '') {
    campoObligatorio.value = true
    severidadMensaje.value = 'warn'
    mensajePantalla.value = 'Debe seleccionar un estado'
    return
  }

  try {
    const response = await obtenerListaTipoParametroPorEstado(estadoSeleccionado.value, token)

    // Validar que la respuesta sea un array válido
    if (Array.isArray(response)) {
      tiposParametros.value = response
      if (tiposParametros.value.length === 0) {
        severidadMensaje.value = 'info'
        mensajePantalla.value = 'La búsqueda realizada no ha generado ningún resultado'
      }
    } else {
      tiposParametros.value = []
      severidadMensaje.value = 'error'
      mensajePantalla.value = 'Error: La respuesta del servidor no es válida'
    }
  } catch (error) {
    tiposParametros.value = []
    severidadMensaje.value = 'error'
    mensajePantalla.value = `Se ha producido un error al tratar de obtener los tipos parámetro con el siguiente error: ${error}`
  }
}

/**
 * Elimina un tipo parámetro
 */
const eliminarTipoParametroHandler = async (): Promise<void> => {
  const token = obtenerTokenUsuarioLogueado()
  const codigoTipoParametro = tipoParametroSeleccionado.value.codigo

  try {
    const respuesta = await eliminarTipoParametroServicio(codigoTipoParametro!, token)
    const respuestaExitosa = 200
    if (respuesta.status === respuestaExitosa) {
      eliminarTipoParametroDialog.value = false
      await obtenerTiposParametrosPorEstado()
      severidadMensaje.value = 'success'
      mensajePantalla.value = `El tipo parámetro con código: ${codigoTipoParametro} se ha eliminado exitósamente.`
    }
  } catch (error) {
    severidadMensaje.value = 'error'
    mensajePantalla.value = `Se ha producido un error al tratar de eliminar el tipo parámetro con el siguiente error: ${error}`
  }
}

/**
 * Confirma la eliminación de un tipo parámetro
 */
const confirmarEliminarTipoParametro = (tipoParametro: TipoParametro): void => {
  tipoParametroSeleccionado.value = tipoParametro
  eliminarTipoParametroDialog.value = true
}

/**
 * Resetea los datos del formulario de búsqueda
 */
const resetearDatos = (): void => {
  tiposParametros.value = []
  mensajePantalla.value = ''
  estadoSeleccionado.value = 'ACT'
  campoObligatorio.value = false
}

/**
 * Resetea los valores del formulario de actualización
 */
const resetearValoresActualizacion = (): void => {
  mensajes.value = []
  v$.value.$reset()
  severidadMensaje.value = 'info'
  tipoParametroSeleccionado.value = {} as TipoParametro
  datosFormularioActualizacion.value.nombre = ''
  datosFormularioActualizacion.value.descripcion = ''
  actualizarTipoParametroDialog.value = false
  campoObligatorioAct.value = false
}

/**
 * Habilita el diálogo de actualización de tipo parámetro
 */
const habilitarDialogoActualizarTipoParametro = (tipoParametro: TipoParametro): void => {
  tipoParametroSeleccionado.value = { ...tipoParametro }
  datosFormularioActualizacion.value.nombre = tipoParametro.nombre
  datosFormularioActualizacion.value.descripcion = tipoParametro.descripcion
  mensajes.value = []
  actualizarTipoParametroDialog.value = true
}

/**
 * Valida los campos requeridos
 */
const validarCamposRequeridos = (): void => {
  mensajes.value = []
  v$.value.$reset()
  v$.value.$validate()

  if (v$.value.$error) {
    setearMensajesErrorValidaciones(v$.value.$errors)
    campoObligatorioAct.value = true
  } else {
    campoObligatorioAct.value = false
    mensajes.value = []
  }
}

/**
 * Establece los mensajes de error de validaciones
 */
const setearMensajesErrorValidaciones = (errores: Record<string, ErrorValidacion>): void => {
  Object.keys(errores).forEach((i) => {
    const error = errores[i]
    if (error && error.$validator !== 'required') {
      mensajes.value[i] = error.$message
    }
  })
}

/**
 * Actualiza un tipo parámetro
 */
const actualizarTipoParametroHandler = async (): Promise<void> => {
  let respuestaServicio = null
  const token = obtenerTokenUsuarioLogueado()

  validarCamposRequeridos()
  if (campoObligatorioAct.value || mensajes.value.length > 0) {
    severidadMensaje.value = 'warn'
  } else {
    try {
      const response = await actualizarTipoParametroServicio(
        tipoParametroSeleccionado.value.codigo!,
        datosFormularioActualizacion.value.nombre,
        datosFormularioActualizacion.value.descripcion,
        token
      )
      respuestaServicio = response
      resetearValoresActualizacion()
      resetearDatos()
      if (respuestaServicio === undefined || respuestaServicio == null) {
        severidadMensaje.value = 'error'
        mensajePantalla.value = 'Error al actualizar tipo parametro.'
      } else {
        severidadMensaje.value = 'success'
        mensajePantalla.value = `El tipo parametro de código: ${respuestaServicio.data.codigo} ha sido actualizado exitosamente.`
      }
    } catch (error) {
      resetearValoresActualizacion()
      severidadMensaje.value = 'error'
      const errorMessage = error instanceof Error ? error.message : String(error)
      mensajePantalla.value = `Error al tratar de actualizar el tipo parametro, causa: ${errorMessage}`
    }
  }
}

/**
 * Maneja la validación del campo nombre (solo letras y espacios)
 */
const manejarValidacionNombre = (event: Event): void => {
  permitirSoloLetrasYEspacios(event as unknown as EventoInput, datosFormularioActualizacion, 'nombre')
}

/**
 * Maneja la validación del campo descripción (letras, números y espacios)
 */
const manejarValidacionDescripcion = (event: Event): void => {
  permitirSoloLetrasYNumeros(event as unknown as EventoInput, datosFormularioActualizacion, 'descripcion')
}
</script>

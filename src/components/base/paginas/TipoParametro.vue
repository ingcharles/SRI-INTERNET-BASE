<!--
* Nombre: TipoParametro.vue
* Descripción: pagina de ejemplo de la aplicación base que consume un servicio rest desarrollado con quarkus
* Autor: Coordinación de Gestión de Datos y Arquitectura Tecnológica
* Copyright 2024 Servicio de Rentas Internas.
-->

<template>
  <div class="contenido-form">
    <div class="contenedor">
      <div class="fila">
        <div class="columna-12 columna-md-10 columna-lg-6 desplazar-md-1 desplazar-lg-3">
          <div class="fila">
            <div class="columna-12">
              <h1 class="titulo">{{ t('tipoParametro.crear.titulo') }}</h1>
              <div class="subtitulo">{{ t('tipoParametro.crear.subtitulo') }}</div>
              <div class="instrucciones">{{ t('tipoParametro.crear.instrucciones') }}</div>
              <Message v-if="mensajes.length > 0" :severity="severidadMensaje" :icon="iconoMensaje" :closable="false">
                <span v-for="(mensaje, indice) in mensajes" :key="indice">
                  {{ mensaje }}<br v-if="indice < mensajes.length - 1">
                </span>
              </Message>
            </div>
          </div>

          <div class="fila">
            <div class="columna-12 columna-md-12 columna-lg-2">
              <label id="lblNombre" for="txtNombre">*{{ t('tipoParametro.crear.nombre') }}</label>
            </div>
            <div class="columna-12 columna-md-12 columna-lg-6">
              <InputText id="txtNombre" v-model="datosFormulario.nombre" type="text" maxlength="65"
                :placeholder="t('tipoParametro.crear.placeholder_nombre')" @input="manejarValidacionNombre" />
            </div>
            <div class="columna-12 columna-md-12 columna-lg-4">
              <InlineMessage class="espacio-1"
                v-if="v$?.nombre?.$error && v$.nombre.$errors[0].$validator === 'required'" id="imsCampoObligatorio">
                {{ v$.nombre.$errors[0].$message }}
              </InlineMessage>
            </div>
          </div>

          <div class="fila">
            <div class="columna-12 columna-md-12 columna-lg-2">
              <label id="lblDescripcion" for="txtDescripcion">*{{ t('tipoParametro.crear.descripcion') }}</label>
            </div>
            <div class="columna-12 columna-md-12 columna-lg-6">
              <Textarea id="txtDescripcion" v-model="datosFormulario.descripcion" maxlength="200"
                :placeholder="t('tipoParametro.crear.placeholder_descripcion')" @input="manejarValidacionDescripcion" />
            </div>
            <div class="columna-12 columna-md-12 columna-lg-4">
              <InlineMessage class="espacio-1"
                v-if="v$?.descripcion?.$error && v$.descripcion.$errors[0].$validator === 'required'"
                id="imsDescripcionObligatorio">
                {{ v$.descripcion.$errors[0].$message }}
              </InlineMessage>
            </div>
          </div>

          <div class="fila justificar-centro">
            <Button id="btnGuardar" type="button" :label="t('tipoParametro.crear.boton_guardar')"
              @click="crearTipoParametro()" />
            <Button id="btnCancelar" type="button" :label="t('tipoParametro.crear.boton_cancelar')"
              class="p-button-secondary" @click="resetearValores()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import useValidate from '@vuelidate/core'
import { required, helpers, maxLength, minLength } from '@vuelidate/validators'
import { permitirSoloLetrasYEspacios, permitirSoloLetrasYNumeros, alphaWithSpaces, alphaNumWithSpaces } from '@/utilitarios/ValidacionesBase'
import { crearTipoParametro as crearTipoParametroServicio } from '../servicios/TipoParametroServicio'
import usuarioStore from '@/stores/UsuarioStore'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Message from 'primevue/message'
import InlineMessage from 'primevue/inlinemessage'

// Interfaces
interface ErrorValidacion {
  $validator: string
  $message: string
}

// Composable de internacionalización
const { t } = useI18n()

// Estado reactivo
const nombre = ref<string>('')
const descripcion = ref<string>('')
const tipoParametroJson = ref<string>('')
const mensajes = ref<string[]>([])
const severidadMensaje = ref<'success' | 'info' | 'warn' | 'error'>('info')
const campoObligatorio = ref<boolean>(false)
const fechaVigencia = ref<Date | null>(null)

// Objeto reactivo para manejar los datos del formulario con las validaciones
const datosFormulario = ref({
  nombre: '',
  descripcion: ''
})

// Reglas de validación
const reglas = computed(() => ({
  nombre: {
    required: helpers.withMessage(t('mensaje.requerido'), required),
    maxLength: helpers.withMessage(t('tipoParametro.crear.mensaje_nombre_max_caracteres'), maxLength(65)),
    minLength: helpers.withMessage(t('tipoParametro.crear.mensaje_nombre_min_caracteres'), minLength(10)),
    alphaWithSpaces: helpers.withMessage(t('tipoParametro.crear.mensaje_nombre_solo_letras'), alphaWithSpaces)
  },
  descripcion: {
    required: helpers.withMessage(t('mensaje.requerido'), required),
    minLength: helpers.withMessage(t('tipoParametro.crear.mensaje_descripcion_min_caracteres'), minLength(50)),
    maxLength: helpers.withMessage(t('tipoParametro.crear.mensaje_descripcion_max_caracteres'), maxLength(200)),
    alphaNumWithSpaces: helpers.withMessage(t('tipoParametro.crear.mensaje_solo_letras_numeros'), alphaNumWithSpaces),
  }
}))

// Validador
const v$ = useValidate(reglas, datosFormulario)

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
 * Crea un nuevo tipo parámetro
 */
const crearTipoParametro = async (): Promise<void> => {
  validarCamposRequeridos()

  if (campoObligatorio.value || mensajes.value.length > 0) {
    severidadMensaje.value = 'warn'
  } else {
    let tipoParametro = null
    tipoParametroJson.value = `{ "nombre": "${datosFormulario.value.nombre}","descripcion": "${datosFormulario.value.descripcion}" }`
    const token = obtenerTokenUsuarioLogueado()

    try {
      const response = await crearTipoParametroServicio(tipoParametroJson.value, token)
      tipoParametro = response
      resetearValores()
      severidadMensaje.value = 'success'
      mensajes.value[0] = `El tipo parámetro con código: ${tipoParametro?.codigo || 'N/A'} se ha creado exitósamente.`
    } catch (error) {
      severidadMensaje.value = 'error'
      mensajes.value[0] = `Se ha producido un error al tratar de crear el tipo parámetro con el siguiente error: ${error}`
    }
  }
}

/**
 * Resetea todos los valores del formulario
 */
const resetearValores = (): void => {
  mensajes.value = []
  v$.value.$reset()
  datosFormulario.value.nombre = ''
  datosFormulario.value.descripcion = ''
  nombre.value = ''
  descripcion.value = ''
  severidadMensaje.value = 'info'
  campoObligatorio.value = false
  fechaVigencia.value = null
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
    campoObligatorio.value = true
  } else {
    campoObligatorio.value = false
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
// Interface para el evento de input
interface EventoInput {
  target: HTMLInputElement | HTMLTextAreaElement
}

/**
 * Maneja la validación del campo nombre (solo letras y espacios)
 */
const manejarValidacionNombre = (event: Event): void => {
  permitirSoloLetrasYEspacios(event as unknown as EventoInput, datosFormulario, 'nombre')
}

/**
 * Maneja la validación del campo descripción (letras, números y espacios)
 */
const manejarValidacionDescripcion = (event: Event): void => {
  permitirSoloLetrasYNumeros(event as unknown as EventoInput, datosFormulario, 'descripcion')
}
</script>

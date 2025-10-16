/*
 * Nombre: ValidacionesBase.ts
 * Descripción: archivo que contiene funciones de validación para toda la aplicación
 * Autor: Coordinación de Gestión de Datos y Arquitectura Tecnológica
 * Copyright 2024 Servicio de Rentas Internas.
 */

import { helpers } from '@vuelidate/validators'

// Interfaces
interface EventoInput {
  target: HTMLInputElement | HTMLTextAreaElement
}

interface ContextoValidacion {
  value?: {
    [key: string]: string | number | boolean | null
  }
  [key: string]: string | number | boolean | null | object | undefined
}

/*
    Los metodos: permitirSoloLetrasYEspacios, permitirSoloLetrasYNumeros, permitirSoloNumeros
    se debe utilizar si se desea evitar el ingreso de ciertos caracteres en un inputtext o text area
 */

/**
 * Permite solo letras y espacios en el campo de entrada
 * @param event - Evento del input
 * @param contexto - Objeto contexto donde se actualiza la propiedad
 * @param propiedad - Nombre de la propiedad a actualizar
 */
export const permitirSoloLetrasYEspacios = (
  event: EventoInput,
  contexto: ContextoValidacion,
  propiedad: string,
): void => {
  console.log(event, 'event')
  const { value } = event.target
  const valueFinal = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]/g, '')

  Reflect.set(event.target, 'value', valueFinal)

  // Verificar si el contexto es un ref de Vue (tiene una propiedad .value)
  if (contexto.value && typeof contexto.value === 'object') {
    Reflect.set(contexto.value, propiedad, valueFinal)
  } else {
    Reflect.set(contexto, propiedad, valueFinal)
  }
}

/**
 * Permite solo letras, números y espacios en el campo de entrada
 * @param event - Evento del input
 * @param contexto - Objeto contexto donde se actualiza la propiedad
 * @param propiedad - Nombre de la propiedad a actualizar
 */
export const permitirSoloLetrasYNumeros = (
  event: EventoInput,
  contexto: ContextoValidacion,
  propiedad: string,
): void => {
  const { value } = event.target
  const valueFinal = value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ ]/g, '')

  Reflect.set(event.target, 'value', valueFinal)

  // Verificar si el contexto es un ref de Vue (tiene una propiedad .value)
  if (contexto.value && typeof contexto.value === 'object') {
    Reflect.set(contexto.value, propiedad, valueFinal)
  } else {
    Reflect.set(contexto, propiedad, valueFinal)
  }
}

/**
 * Permite solo números en el campo de entrada
 * @param event - Evento del input
 * @param contexto - Objeto contexto donde se actualiza la propiedad
 * @param propiedad - Nombre de la propiedad a actualizar
 */
export const permitirSoloNumeros = (
  event: EventoInput,
  contexto: ContextoValidacion,
  propiedad: string,
): void => {
  const { value } = event.target
  const valueFinal = value.replace(/\D/g, '')

  Reflect.set(event.target, 'value', valueFinal)

  // Verificar si el contexto es un ref de Vue (tiene una propiedad .value)
  if (contexto.value && typeof contexto.value === 'object') {
    Reflect.set(contexto.value, propiedad, valueFinal)
  } else {
    Reflect.set(contexto, propiedad, valueFinal)
  }
}

/*
    Los metodos: alphaWithSpaces, alphaNumWithSpaces deben ser utilizados cuando las validaciones
    en un inputtext o text area se requiere que sea realizada posterior al ingreso de datos
 */

/*
    Este método permite validar solo letras y espacios en blanco
    ya que el método alpha no permite espacios en blanco, tiene un mensaje por defecto,
    que puede ser sobrescrito donde se lo utilice.
*/
export const alphaWithSpaces = helpers.withParams(
  { message: 'El campo solo puede contener letras y espacios en blanco' },
  (value: string): boolean => {
    if (!value) return true // Permite valores vacíos
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/.test(value)
  },
)

/*
    Este método permite validar solo letras, números y espacios en blanco
    ya que el método alphaNum no permite espacios en blanco, tiene un mensaje por defecto,
    que puede ser sobrescrito donde se lo utilice.
*/
export const alphaNumWithSpaces = helpers.withParams(
  { message: 'El campo solo puede contener letras, números y espacios en blanco' },
  (value: string): boolean => {
    if (!value) return true // Permite valores vacíos
    return /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]*$/.test(value)
  },
)

/**
 * Valida que el campo contenga solo números
 */
export const soloNumeros = helpers.withParams(
  { message: 'El campo solo puede contener números' },
  (value: string): boolean => {
    if (!value) return true // Permite valores vacíos
    return /^\d*$/.test(value)
  },
)

/**
 * Valida formato de email
 */
export const formatoEmail = helpers.withParams(
  { message: 'El formato del email no es válido' },
  (value: string): boolean => {
    if (!value) return true // Permite valores vacíos
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },
)

/**
 * Valida que el campo no contenga espacios al inicio o final
 */
export const sinEspaciosLaterales = helpers.withParams(
  { message: 'El campo no puede tener espacios al inicio o final' },
  (value: string): boolean => {
    if (!value) return true // Permite valores vacíos
    return value === value.trim()
  },
)

/**
 * Valida formato de teléfono ecuatoriano
 */
export const telefonoEcuador = helpers.withParams(
  { message: 'El formato del teléfono no es válido (10 dígitos)' },
  (value: string): boolean => {
    if (!value) return true // Permite valores vacíos
    return /^\d{10}$/.test(value)
  },
)

/*
 * Nombre: TipoParametroServicio.ts
 * Descripción: servicio para interactuar con el api rest que que tiene las opciones CRUD de la tabla TipoParametro
 * Autor: Coordinación de Gestión de Datos y Arquitectura Tecnológica
 * Copyright 2024 Servicio de Rentas Internas.
 */

import axios, { type AxiosResponse } from 'axios'

// Interfaces
interface TipoParametro {
  codigo: string
  nombre: string
  descripcion: string
  estado?: string
  fechaCreacion?: string
  fechaModificacion?: string
}

interface RespuestaServicio {
  data: any
  status: number
  statusText: string
  headers: any
  config: any
  request?: any
}

interface TituloActualizacion {
  title: string
}

// Configuración de la API
const obtenerTipoParametroApi = axios.create({
  baseURL: import.meta.env.VUE_APP_API_BASE,
})

/**
 * Obtiene un tipo parámetro por su ID
 * @param idTipoParametro - ID del tipo parámetro a consultar
 * @returns Promise<TipoParametro | null> - Tipo parámetro encontrado o null
 */
export const obtenerTipoParametroPorId = async (
  idTipoParametro: string,
): Promise<TipoParametro | null> => {
  let tipoParametro: TipoParametro | null = null
  const url = `/${idTipoParametro}`

  try {
    const response: AxiosResponse<TipoParametro> = await obtenerTipoParametroApi.get(url)
    tipoParametro = response.data
  } catch (error) {
    console.error('Error al consultar tipo parámetro:', error)
    throw new Error(
      'Error al invocar al servicio para consultar la información del tipo parametro.',
    )
  }

  return tipoParametro
}

/**
 * Obtiene una lista de tipos parámetro filtrados por estado
 * @param estado - Estado de los tipos parámetro a consultar
 * @param token - Token de autorización
 * @returns Promise<TipoParametro[] | null> - Lista de tipos parámetro o null
 */
export const obtenerListaTipoParametroPorEstado = async (
  estado: string,
  token: string,
): Promise<TipoParametro[] | null> => {
  let listaTipoParametro: TipoParametro[] | null = null
  const url = `/findByEstado/${estado}`

  try {
    const response: AxiosResponse<TipoParametro[]> = await obtenerTipoParametroApi.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    listaTipoParametro = response.data
  } catch (error) {
    console.error('Error al realizar la consulta:', error)
    throw new Error('Error al realizar la consulta.')
  }

  return listaTipoParametro
}

/**
 * Crea un nuevo tipo parámetro
 * @param tipoParametroJson - JSON con los datos del tipo parámetro a crear
 * @param token - Token de autorización
 * @returns Promise<TipoParametro | null> - Tipo parámetro creado o null
 */
export const crearTipoParametro = async (
  tipoParametroJson: string,
  token: string,
): Promise<TipoParametro | null> => {
  let tipoParametroCreado: TipoParametro | null = null

  try {
    const response: AxiosResponse<TipoParametro> = await axios.post(
      import.meta.env.VUE_APP_API_BASE || '',
      tipoParametroJson,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    tipoParametroCreado = response.data
  } catch (error) {
    console.error('Error al crear Tipo Parametro:', error)
    throw new Error('Error al crear Tipo Parametro.')
  }

  return tipoParametroCreado
}

/**
 * Elimina un tipo parámetro por su código
 * @param codigoTipoParametro - Código del tipo parámetro a eliminar
 * @param token - Token de autorización
 * @returns Promise<RespuestaServicio | null> - Respuesta del servicio
 */
export const eliminarTipoParametro = async (
  codigoTipoParametro: string,
  token: string,
): Promise<RespuestaServicio | null> => {
  let respuestaServicio: RespuestaServicio | null = null
  const url = `/${codigoTipoParametro}`

  try {
    const response: AxiosResponse = await obtenerTipoParametroApi.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    respuestaServicio = response
  } catch (error) {
    console.error('Error al eliminar Tipo Parametro:', error)
    throw new Error('Error al eliminar Tipo Parametro.')
  }

  return respuestaServicio
}

/**
 * Actualiza un tipo parámetro existente
 * @param codigoTipoParametro - Código del tipo parámetro a actualizar
 * @param nombre - Nuevo nombre del tipo parámetro
 * @param descripcion - Nueva descripción del tipo parámetro
 * @param token - Token de autorización
 * @returns Promise<RespuestaServicio | null> - Respuesta del servicio
 */
export const actualizarTipoParametro = async (
  codigoTipoParametro: string,
  nombre: string,
  descripcion: string,
  token: string,
): Promise<RespuestaServicio | null> => {
  let respuestaServicio: RespuestaServicio | null = null
  const titulo: TituloActualizacion = { title: 'Actualizar Tipo Parametro' }
  const url = `/${codigoTipoParametro}?nombre=${encodeURIComponent(nombre)}&descripcion=${encodeURIComponent(descripcion)}`

  try {
    const response: AxiosResponse = await obtenerTipoParametroApi.put(url, titulo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    respuestaServicio = response
  } catch (error) {
    console.error('Error al actualizar el tipo parametro:', error)
    throw new Error('Error al actualizar el tipo parametro.')
  }

  return respuestaServicio
}

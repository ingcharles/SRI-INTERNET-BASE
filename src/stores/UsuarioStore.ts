/*
 * Nombre: UsuarioStore.ts
 * Descripción: Componente de tipo store que se encarga de mantener en caché la información del usuario logueado
 * para que pueda ser utilizado por los componentes de la aplicación
 * Autor: Coordinación de Gestión de Datos y Arquitectura Tecnológica
 * Copyright 2024 Servicio de Rentas Internas.
 */

import { defineStore } from 'pinia'

// Interfaces
interface AutorizacionUsuario {
  permisos: string[]
  roles: string[]
  recursos: string[]
  [key: string]: any
}

interface SesionKeycloak {
  token: string
  refreshToken: string
  idToken?: string
  tokenParsed?: any
  authenticated: boolean
  [key: string]: any
}

interface EstadoUsuario {
  nombreUsuario: string
  token: string
  autorizacionUsuario: AutorizacionUsuario | null
  sesionKeycloak: SesionKeycloak | null
}

/**
 * Store de Pinia para gestionar la información del usuario logueado
 */
const usuarioStore = defineStore('usuarioLogueado', {
  state: (): EstadoUsuario => ({
    nombreUsuario: '',
    token: '',
    autorizacionUsuario: null,
    sesionKeycloak: null,
  }),

  actions: {
    /**
     * Establece la información básica del usuario
     * @param nombreUsuario - Nombre del usuario logueado
     * @param token - Token de autenticación
     * @param sesionKeycloak - Información de la sesión de Keycloak
     */
    setInformacionUsuario(
      nombreUsuario: string,
      token: string,
      sesionKeycloak: SesionKeycloak,
    ): void {
      this.nombreUsuario = nombreUsuario
      this.token = token
      this.sesionKeycloak = sesionKeycloak
    },

    /**
     * Establece la información de autorización del usuario
     * @param autorizacionUsuario - Información de permisos y roles del usuario
     */
    setInformacionAutorizacionUsuario(autorizacionUsuario: AutorizacionUsuario): void {
      this.autorizacionUsuario = autorizacionUsuario
    },

    /**
     * Limpia toda la información del usuario (útil para logout)
     */
    limpiarInformacionUsuario(): void {
      this.nombreUsuario = ''
      this.token = ''
      this.autorizacionUsuario = null
      this.sesionKeycloak = null
    },

    /**
     * Actualiza solo el token del usuario
     * @param token - Nuevo token de autenticación
     */
    actualizarToken(token: string): void {
      this.token = token
    },

    /**
     * Verifica si el usuario tiene un permiso específico
     * @param permiso - Permiso a verificar
     * @returns boolean - true si tiene el permiso, false en caso contrario
     */
    tienePermiso(permiso: string): boolean {
      return this.autorizacionUsuario?.permisos?.includes(permiso) || false
    },

    /**
     * Verifica si el usuario tiene un rol específico
     * @param rol - Rol a verificar
     * @returns boolean - true si tiene el rol, false en caso contrario
     */
    tieneRol(rol: string): boolean {
      return this.autorizacionUsuario?.roles?.includes(rol) || false
    },
  },

  getters: {
    /**
     * Obtiene el nombre del usuario
     */
    getNombreUsuario: (state): string => state.nombreUsuario,

    /**
     * Obtiene el token del usuario
     */
    getTokenUsuario: (state): string => state.token,

    /**
     * Obtiene la información de autorización del usuario
     */
    getAutorizacionUsuario: (state): AutorizacionUsuario | null => state.autorizacionUsuario,

    /**
     * Obtiene la sesión de Keycloak
     */
    getSesionKeycloak: (state): SesionKeycloak | null => state.sesionKeycloak,

    /**
     * Verifica si el usuario está autenticado
     */
    estaAutenticado: (state): boolean => {
      return Boolean(state.token && state.nombreUsuario)
    },

    /**
     * Obtiene todos los permisos del usuario
     */
    getPermisos: (state): string[] => {
      return state.autorizacionUsuario?.permisos || []
    },

    /**
     * Obtiene todos los roles del usuario
     */
    getRoles: (state): string[] => {
      return state.autorizacionUsuario?.roles || []
    },

    /**
     * Obtiene información resumida del usuario
     */
    getResumenUsuario: (state) => {
      return {
        nombre: state.nombreUsuario,
        autenticado: Boolean(state.token && state.nombreUsuario),
        cantidadPermisos: state.autorizacionUsuario?.permisos?.length || 0,
        cantidadRoles: state.autorizacionUsuario?.roles?.length || 0,
      }
    },
  },
})

export default usuarioStore

// Exportar también las interfaces para uso en otros archivos
export type { AutorizacionUsuario, SesionKeycloak, EstadoUsuario }

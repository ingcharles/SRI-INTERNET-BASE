/**
 * Interface para los items del menú de navegación
 */
export interface ItemMenuNavegacion {
  id: string
  etiqueta: string
  icono?: string
  ruta?: string
  url?: string
  comportamientoUrl?: string
  hijos?: ItemMenuNavegacion[]
  command?: () => void
  visible?: boolean
}

/**
 * Interface para la información del usuario
 */
export interface InformacionUsuario {
  nombre: string
  identificacion: string
}

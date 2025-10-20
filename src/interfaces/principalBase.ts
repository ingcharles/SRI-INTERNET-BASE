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

/**
 * Interfaz para las ciudades
 */
export interface Ciudad {
  nombre: string
  codigo: string
}

/**
 * Interfaz para el componente Step
 */
export interface StepItem {
  etiqueta: string
  valor: string
}

/**
 * Interfaz para el componente Tab
 */
export interface TabItem {
  titulo: string
  contenido: string
  valor: string
}

/**
 * Interfaz para el Estado del Tipo Parametro
 */
export interface EstadoTipoParametro {
  nombre: string
  id: string
}

/**
 * Interfaz para el Tipo Parametro
 */
export interface TipoParametro {
  codigo?: string
  nombre: string
  descripcion: string
  fechaVigencia?: string
  estado?: string
}

/**
 * Interfaz para controlar los errores de validación
 */
export interface ErrorValidacion {
  $validator: string
  $message: string
}

/**
 * Interfaz validacion input y textarea
 */
export interface EventoInput {
  target: HTMLInputElement | HTMLTextAreaElement
}

export interface RespuestaServicio {
  data: unknown
  status: number
  statusText: string
  headers: Record<string, unknown>
  config: Record<string, unknown>
  request?: unknown
}

export interface TituloActualizacion {
  title: string
}

export interface AutorizacionUsuario {
  permisos: string[]
  roles: string[]
  recursos: string[]
  [key: string]: any
}

export interface SesionKeycloak {
  token: string
  refreshToken: string
  idToken?: string
  tokenParsed?: any
  authenticated: boolean
  [key: string]: any
}

export interface EstadoUsuario {
  nombreUsuario: string
  token: string
  autorizacionUsuario: AutorizacionUsuario | null
  sesionKeycloak: SesionKeycloak | null
}

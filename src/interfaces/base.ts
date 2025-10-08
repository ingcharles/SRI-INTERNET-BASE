// Interfaz específica para nuestros items de menú
export interface ItemMenuPrime {
  label: string;
  icon: string;
  route?: string;
  url?: string;
  target?: string;
  command?: () => void;
  items?: ItemMenuPrime[];
}

/**
 * Interface para los items del menú
 */
export interface ItemMenuAmburguesa {
    id: string;
    etiqueta: string;
    icono?: string;
    ruta?: string;
    hijos?: ItemMenuAmburguesa[];
    visible?: boolean;
}

/**
 * Interface para la información del usuario
 */
export interface InformacionUsuario {
    nombre: string;
    identificacion: string;
}

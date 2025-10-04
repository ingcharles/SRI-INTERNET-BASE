/**
 * Interface para los items del menú
 */
export interface ItemMenu {
    id: string;
    etiqueta: string;
    icono?: string;
    ruta?: string;
    hijos?: ItemMenu[];
    visible?: boolean;
}

/**
 * Interface para la información del usuario
 */
export interface InformacionUsuario {
    nombre: string;
    identificacion: string;
}

/**
 * Interface para las opciones del navbar
 */
export interface OpcionNavbar {
    id: string;
    etiqueta: string;
    icono: string;
    accion?: () => void;
    ruta?: string;
}

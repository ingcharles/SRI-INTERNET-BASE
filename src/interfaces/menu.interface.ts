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

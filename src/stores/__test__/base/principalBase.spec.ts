import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usarAlmacenPrincipalBase } from '../../base/principalBase';

describe('usarAlmacenPrincipalBase', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('Debería inicializar con valores por defecto', () => {
        const almacen = usarAlmacenPrincipalBase();

        expect(almacen.menuLateralVisible).toBe(true);
        expect(almacen.menuMovilVisible).toBe(false);
        expect(almacen.informacionUsuario.nombre).toBe('ANCHUNDIA VALENCIA CARLOS EDUARDO');
        expect(almacen.informacionUsuario.identificacion).toBe('1722039953001');
        expect(almacen.itemsMenu.length).toBeGreaterThan(0);
    });

    it('Debería alternar la visibilidad del menú lateral', () => {
        const almacen = usarAlmacenPrincipalBase();
        const estadoInicial = almacen.menuLateralVisible;

        almacen.alternarMenuLateral();
        expect(almacen.menuLateralVisible).toBe(!estadoInicial);

        almacen.alternarMenuLateral();
        expect(almacen.menuLateralVisible).toBe(estadoInicial);
    });

    it('Debería alternar la visibilidad del menú móvil', () => {
        const almacen = usarAlmacenPrincipalBase();

        expect(almacen.menuMovilVisible).toBe(false);
        almacen.alternarMenuMovil();
        expect(almacen.menuMovilVisible).toBe(true);
        almacen.alternarMenuMovil();
        expect(almacen.menuMovilVisible).toBe(false);
    });

    it('Debería cerrar el menú móvil', () => {
        const almacen = usarAlmacenPrincipalBase();

        almacen.alternarMenuMovil();
        expect(almacen.menuMovilVisible).toBe(true);
        almacen.cerrarMenuMovil();
        expect(almacen.menuMovilVisible).toBe(false);
    });

    it('Debería actualizar la información del usuario', () => {
        const almacen = usarAlmacenPrincipalBase();
        const nuevaInfo = {
            nombre: 'NUEVO USUARIO',
            identificacion: '9999999999999'
        };

        almacen.actualizarInformacionUsuario(nuevaInfo);
        expect(almacen.informacionUsuario.nombre).toBe(nuevaInfo.nombre);
        expect(almacen.informacionUsuario.identificacion).toBe(nuevaInfo.identificacion);
    });

    it('Debería filtrar items del menú visibles', () => {
        const almacen = usarAlmacenPrincipalBase();
        const totalItems = almacen.itemsMenu.length;

        expect(almacen.menuFiltrado.length).toBe(totalItems);

        if (almacen.itemsMenu[0]) {
            almacen.itemsMenu[0].visible = false;
            expect(almacen.menuFiltrado.length).toBe(totalItems - 1);
        }
    });
});

import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usarAlmacenPrincipalBase } from '../../base/principalBase'

describe('usarAlmacenPrincipalBase', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Debería inicializar con valores por defecto', () => {
    const almacen = usarAlmacenPrincipalBase()

    expect(almacen.menuLateralVisible).toBe(true)
    expect(almacen.menuMovilVisible).toBe(false)
    expect(almacen.informacionUsuario.nombre).toBe('ANCHUNDIA VALENCIA CARLOS EDUARDO')
    expect(almacen.informacionUsuario.identificacion).toBe('1722039953001')
    expect(almacen.itemsMenuNavegacion.length).toBeGreaterThan(0)
  })

  it('Debería alternar la visibilidad del menú lateral', () => {
    const almacen = usarAlmacenPrincipalBase()
    const estadoInicial = almacen.menuLateralVisible

    almacen.alternarMenuEscritorio()
    expect(almacen.menuLateralVisible).toBe(!estadoInicial)

    almacen.alternarMenuEscritorio()
    expect(almacen.menuLateralVisible).toBe(estadoInicial)
  })

  it('Debería alternar la visibilidad del menú móvil', () => {
    const almacen = usarAlmacenPrincipalBase()

    expect(almacen.menuMovilVisible).toBe(false)
    almacen.alternarMenuMovil()
    expect(almacen.menuMovilVisible).toBe(true)
    almacen.alternarMenuMovil()
    expect(almacen.menuMovilVisible).toBe(false)
  })

  it('Debería cerrar el menú móvil', () => {
    const almacen = usarAlmacenPrincipalBase()

    almacen.alternarMenuMovil()
    expect(almacen.menuMovilVisible).toBe(true)
    almacen.cerrarMenuMovil()
    expect(almacen.menuMovilVisible).toBe(false)
  })

  it('Debería actualizar la información del usuario', () => {
    const almacen = usarAlmacenPrincipalBase()
    const nuevaInfo = {
      nombre: 'NUEVO USUARIO',
      identificacion: '9999999999999',
    }

    almacen.actualizarInformacionUsuario(nuevaInfo)
    expect(almacen.informacionUsuario.nombre).toBe(nuevaInfo.nombre)
    expect(almacen.informacionUsuario.identificacion).toBe(nuevaInfo.identificacion)
  })

  it('Debería filtrar items del menú visibles', () => {
    const almacen = usarAlmacenPrincipalBase()
    const totalItems = almacen.itemsMenuNavegacion.length

    expect(almacen.menuFiltradoNavegacion.length).toBe(totalItems)

    if (almacen.itemsMenuNavegacion[0]) {
      almacen.itemsMenuNavegacion[0].visible = false
      expect(almacen.menuFiltradoNavegacion.length).toBe(totalItems - 1)
    }
  })
})

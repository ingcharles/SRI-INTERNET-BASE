# Menú Lateral Multinivel - Documentación

## Resumen

Se ha implementado un menú lateral multinivel siguiendo el diseño del SRI, con soporte para submenús anidados y modo colapsado con iconos.

## Características Implementadas

### 1. Menú Multinivel

- ✅ Soporte para múltiples niveles de anidación
- ✅ Submenús desplegables con indicadores visuales
- ✅ Navegación jerárquica clara

### 2. Modo Colapsado

- ✅ Muestra solo iconos cuando el menú está colapsado
- ✅ Tooltips con el nombre completo al pasar el mouse
- ✅ Transición suave entre estados

### 3. Búsqueda

- ✅ Buscador de servicios funcional
- ✅ Filtrado en tiempo real
- ✅ Botón para limpiar búsqueda

## Estructura del Menú

### Ejemplo de Menú Multinivel

```typescript
{
  id: 'claves',
  etiqueta: 'CLAVES',
  icono: 'pi pi-key',
  visible: true,
  hijos: [
    {
      id: 'generar-recuperar',
      etiqueta: 'Generar o recuperar clave',
      ruta: '/claves/generar-recuperar',
      visible: true
    },
    {
      id: 'usuarios-adicionales',
      etiqueta: 'Usuarios adicionales',
      visible: true,
      hijos: [
        {
          id: 'crear-administrar',
          etiqueta: 'Crear y administrar',
          ruta: '/claves/usuarios/crear',
          visible: true
        },
        {
          id: 'confirmacion',
          etiqueta: 'Confirmación',
          ruta: '/claves/usuarios/confirmacion',
          visible: true
        }
      ]
    }
  ]
}
```

## Niveles de Menú

### Nivel 1 - Categorías Principales

- Texto en mayúsculas
- Icono a la izquierda
- Fondo gris claro al expandir
- Ejemplo: **CLAVES**, **RUC**, **FACTURACIÓN FÍSICA**

### Nivel 2 - Opciones de Categoría

- Texto en formato normal
- Indentación de 2.5rem
- Sin iconos
- Ejemplo: _Generar o recuperar clave_, _Cambiar clave_

### Nivel 3 - Sub-opciones

- Texto en formato normal
- Indentación de 3.5rem
- Sin iconos
- Ejemplo: _Crear y administrar_, _Confirmación_

## Componentes Modificados

### 1. `src/stores/layout.ts`

**Cambios:**

- Agregado soporte para estructura multinivel en `itemsMenu`
- Implementado menú de CLAVES con submenús anidados

**Estructura:**

```typescript
interface ItemMenu {
  id: string
  etiqueta: string
  icono?: string
  ruta?: string
  visible: boolean
  hijos?: ItemMenu[] // Soporte recursivo
}
```

### 2. `src/componentes/base/MenuLateral.vue`

**Cambios:**

- Función recursiva `convertirAMenuPrime()` para convertir estructura multinivel
- Computed `itemsIconos` para mostrar solo iconos en modo colapsado
- Mejora en el filtrado de búsqueda

**Funciones clave:**

```typescript
function convertirAMenuPrime(items: ItemMenu[]): MenuItem[] {
  return items.map((item) => {
    const menuItem: MenuItem = {
      label: item.etiqueta,
      icon: item.icono,
      to: item.ruta,
    }

    if (item.hijos && item.hijos.length > 0) {
      menuItem.items = convertirAMenuPrime(item.hijos)
    }

    return menuItem
  })
}
```

### 3. `src/assets/css/layout.css`

**Cambios:**

- Estilos específicos para cada nivel de menú
- Indentación progresiva para submenús
- Estilos para modo colapsado con iconos
- Mejoras en hover y focus states

**Estilos clave:**

```css
/* Nivel 1 */
.menu-lateral .p-panelmenu .p-menuitem-link {
  padding: 0.6rem 1rem 0.6rem 2.5rem;
}

/* Nivel 2 */
.menu-lateral .p-panelmenu .p-submenu-list .p-menuitem-link {
  padding-left: 3.5rem;
}

/* Nivel 3 */
.menu-lateral .p-panelmenu .p-submenu-list .p-submenu-list .p-menuitem-link {
  padding-left: 4.5rem;
}
```

## Modo Colapsado

### Comportamiento

Cuando el menú está colapsado (`soloIconos = true`):

1. **Oculta el buscador** - No se muestra la barra de búsqueda
2. **Muestra solo iconos** - Lista vertical de botones circulares
3. **Tooltips** - Al pasar el mouse, muestra el nombre completo
4. **Ancho reducido** - El menú se reduce a 60px

### Código del Modo Colapsado

```vue
<div v-else class="lista-menu">
  <div class="mostrar-flex flex-columna alinear-centro espacio-2">
    <Button
      v-for="item in itemsIconos"
      :key="item.id"
      :icon="item.icono"
      class="p-button-rounded p-button-text"
      :aria-label="item.etiqueta"
      :title="item.etiqueta"
    />
  </div>
</div>
```

## Estilos Visuales

### Colores

- **Fondo menú:** Blanco (`var(--color-blanco)`)
- **Texto principal:** Gris fuerte (`var(--color-gris-fuerte)`)
- **Texto secundario:** Gris medio (`var(--color-gris-medio)`)
- **Hover:** Gris tenue (`var(--color-gris-tenue)`)
- **Activo:** Azul principal (`var(--color-azul-principal)`)

### Tipografía

- **Nivel 1:** 13px, bold, uppercase
- **Nivel 2:** 13px, normal
- **Nivel 3:** 12px, normal

### Espaciado

- **Padding vertical:** 0.6rem - 0.75rem
- **Indentación nivel 1:** 2.5rem
- **Indentación nivel 2:** 3.5rem
- **Indentación nivel 3:** 4.5rem

## Responsive

### Desktop (> 768px)

- Menú visible por defecto
- Ancho: 240px (expandido) / 60px (colapsado)
- Muestra texto completo o solo iconos

### Tablet (768px - 992px)

- Menú colapsable
- Se oculta automáticamente en pantallas pequeñas

### Mobile (< 768px)

- Menú overlay desde la izquierda
- Se oculta por defecto
- Botón hamburguesa para abrir/cerrar

## Uso

### Agregar un Nuevo Item de Menú

```typescript
// En src/stores/layout.ts
{
  id: 'nuevo-servicio',
  etiqueta: 'NUEVO SERVICIO',
  icono: 'pi pi-star',
  visible: true,
  hijos: [
    {
      id: 'opcion-1',
      etiqueta: 'Opción 1',
      ruta: '/nuevo-servicio/opcion-1',
      visible: true
    }
  ]
}
```

### Agregar un Submenú de Tercer Nivel

```typescript
{
  id: 'categoria',
  etiqueta: 'CATEGORÍA',
  icono: 'pi pi-folder',
  visible: true,
  hijos: [
    {
      id: 'subcategoria',
      etiqueta: 'Subcategoría',
      visible: true,
      hijos: [
        {
          id: 'opcion-a',
          etiqueta: 'Opción A',
          ruta: '/categoria/subcategoria/opcion-a',
          visible: true
        },
        {
          id: 'opcion-b',
          etiqueta: 'Opción B',
          ruta: '/categoria/subcategoria/opcion-b',
          visible: true
        }
      ]
    }
  ]
}
```

## Iconos Disponibles

PrimeIcons utilizados en el menú:

- `pi pi-key` - Claves
- `pi pi-building` - RUC
- `pi pi-file` - Facturación Física
- `pi pi-desktop` - Facturación Electrónica
- `pi pi-file-edit` - Declaraciones
- `pi pi-paperclip` - Anexos
- `pi pi-credit-card` - Pagos
- `pi pi-dollar` - Deudas
- `pi pi-replay` - Devoluciones
- `pi pi-wallet` - Reintegro
- `pi pi-bell` - Trámites
- `pi pi-verified` - Certificados
- `pi pi-car` - Vehículos
- `pi pi-ellipsis-h` - Otros Servicios

Ver más iconos en: https://primevue.org/icons

## Pruebas

Todas las pruebas unitarias pasan correctamente:

```bash
npm run test:unit

✓ MenuLateral > Debería renderizar el componente correctamente
✓ MenuLateral > Debería mostrar la sección de búsqueda cuando no es solo iconos
✓ MenuLateral > Debería limpiar la búsqueda al hacer click en el botón limpiar
✓ MenuLateral > Debería ocultar la sección de búsqueda en modo solo iconos
✓ MenuLateral > Debería renderizar el PanelMenu cuando no es solo iconos
✓ MenuLateral > Debería renderizar botones en modo solo iconos
```

## Problemas Resueltos

### ✅ Problema 1: Iconos no se mostraban en modo colapsado

**Solución:** Creado computed `itemsIconos` que filtra solo items con iconos

### ✅ Problema 2: Menú multinivel no funcionaba

**Solución:** Implementada función recursiva `convertirAMenuPrime()`

### ✅ Problema 3: Indentación incorrecta en submenús

**Solución:** Estilos CSS específicos para cada nivel con padding-left progresivo

## Mejoras Futuras

- [ ] Agregar animaciones de transición más suaves
- [ ] Implementar drag & drop para reordenar items
- [ ] Agregar badges con contadores en items del menú
- [ ] Implementar favoritos/accesos rápidos
- [ ] Agregar historial de navegación
- [ ] Soporte para temas claro/oscuro

## Referencias

- [PrimeVue PanelMenu](https://primevue.org/panelmenu/)
- [PrimeVue Button](https://primevue.org/button/)
- [PrimeIcons](https://primevue.org/icons/)

# Cambios de Clases CSS de Inglés a Español

## Resumen

Se han cambiado todas las clases CSS del sistema de grid del inglés al español completo para mantener la consistencia en todo el proyecto.

## Clases de Visualización (Display)

### Antes (Inglés)

```css
.d-flex
.d-inline-flex
.d-block
.d-inline-block
.d-inline
.d-none
```

### Después (Español)

```css
.mostrar-flex
.mostrar-flex-inline
.mostrar-bloque
.mostrar-bloque-inline
.mostrar-inline
.ocultar-elemento
```

## Tabla de Equivalencias

| Clase Anterior (Inglés) | Clase Nueva (Español)    | Descripción            |
| ----------------------- | ------------------------ | ---------------------- |
| `.d-flex`               | `.mostrar-flex`          | Display flex           |
| `.d-inline-flex`        | `.mostrar-flex-inline`   | Display inline-flex    |
| `.d-block`              | `.mostrar-bloque`        | Display block          |
| `.d-inline-block`       | `.mostrar-bloque-inline` | Display inline-block   |
| `.d-inline`             | `.mostrar-inline`        | Display inline         |
| `.d-none`               | `.ocultar-elemento`      | Display none (ocultar) |

## Archivos Modificados

### 1. Sistema de Grid

- ✅ `src/assets/css/grid-sistema.css` - Definiciones de clases actualizadas

### 2. Archivos CSS

- ✅ `src/assets/css/layout.css` - Actualizado `.d-flex` → `.mostrar-flex`
- ✅ `src/assets/css/inicio.css` - Actualizado `.d-flex` → `.mostrar-flex`

### 3. Componentes Vue

- ✅ `src/componentes/base/EncabezadoApp.vue` - Actualizado en template
- ✅ `src/componentes/base/MenuLateral.vue` - Actualizado en template
- ✅ `src/componentes/base/PiePagina.vue` - Actualizado en template
- ✅ `src/vistas/InicioVista.vue` - Actualizado en template
- ✅ `src/componentes/ejemplos/EjemploGrid.vue` - Actualizado en ejemplos

### 4. Documentación

- ✅ `REESTRUCTURACION-GRID.md` - Actualizada tabla de clases
- ✅ `CAMBIOS-CLASES-ESPANOL.md` - Documento nuevo (este archivo)

## Ejemplos de Uso

### Antes

```vue
<div class="d-flex justificar-centro alinear-centro">
  <span>Contenido</span>
</div>
```

### Después

```vue
<div class="mostrar-flex justificar-centro alinear-centro">
  <span>Contenido</span>
</div>
```

## Casos de Uso Comunes

### 1. Contenedor Flex Horizontal

```html
<div class="mostrar-flex justificar-entre alinear-centro">
  <div>Izquierda</div>
  <div>Derecha</div>
</div>
```

### 2. Contenedor Flex Vertical

```html
<div class="mostrar-flex flex-columna espacio-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### 3. Ocultar Elemento

```html
<div class="ocultar-elemento">Este contenido está oculto</div>
```

### 4. Mostrar como Bloque

```html
<span class="mostrar-bloque"> Este span se muestra como bloque </span>
```

## Beneficios del Cambio

1. **Consistencia Total**: Todas las clases del sistema están ahora en español
2. **Mejor Comprensión**: Los nombres son más descriptivos en español
3. **Mantenibilidad**: Más fácil para equipos de habla hispana
4. **Documentación Clara**: La documentación y el código usan el mismo idioma

## Migración para Proyectos Existentes

Si tienes código existente que usa las clases antiguas, puedes hacer un buscar y reemplazar:

```bash
# Buscar y reemplazar en todos los archivos
d-flex → mostrar-flex
d-inline-flex → mostrar-flex-inline
d-block → mostrar-bloque
d-inline-block → mostrar-bloque-inline
d-inline → mostrar-inline
d-none → ocultar-elemento
```

## Verificación

Para verificar que todos los cambios se aplicaron correctamente:

```bash
# Buscar cualquier referencia a las clases antiguas
grep -r "d-flex" src/
grep -r "d-block" src/
grep -r "d-none" src/
grep -r "d-inline" src/

# No debería devolver resultados en archivos .vue o .css
```

## Compatibilidad

- ✅ Compatible con todos los navegadores modernos
- ✅ No afecta el rendimiento
- ✅ Mantiene la misma funcionalidad
- ✅ Las pruebas unitarias siguen pasando

## Notas Importantes

- Las clases antiguas ya NO están disponibles
- Actualizar todos los archivos que usen las clases antiguas
- Revisar componentes de terceros que puedan usar estas clases
- Actualizar la documentación del equipo

## Soporte

Para dudas sobre las nuevas clases, consultar:

- `GUIA-GRID-SISTEMA.md` - Guía completa del sistema
- `VARIABLES-GRID-ESPANOL.md` - Variables CSS disponibles
- `REESTRUCTURACION-GRID.md` - Documentación de la reestructuración

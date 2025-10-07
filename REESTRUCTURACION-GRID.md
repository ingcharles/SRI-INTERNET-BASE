# Reestructuración del Proyecto con Grid Sistema

## Resumen

Se ha reestructurado completamente el proyecto para utilizar el sistema de grid personalizado (`grid-sistema.css`) en todos los componentes y vistas, siguiendo el diseño del SRI proporcionado en la imagen de referencia.

## Cambios Realizados

### 1. Layout CSS (`src/assets/css/layout.css`)

**Antes:** Usaba flexbox directo y estilos personalizados sin aprovechar el sistema de grid.

**Después:**

- Utiliza las clases del grid-sistema.css (`.contenedor-fluido`, `.fila`, `.columna-*`)
- Implementa breakpoints responsive del sistema de grid
- Estructura modular con comentarios claros por sección
- Mejor organización del código CSS

**Características principales:**

- **Encabezado:** Sistema de 3 columnas responsive (izquierda, centro, derecha)
- **Menú Lateral:** Ancho fijo de 240px, colapsable a 60px (solo iconos)
- **Contenido Principal:** Margen dinámico según estado del menú
- **Pie de Página:** Layout de 3 columnas con información legal, copyright y versión

### 2. Inicio CSS (`src/assets/css/inicio.css`)

**Antes:** Estilos básicos sin aprovechar el sistema de grid.

**Después:**

- **Carrusel de Servicios:** Usa grid para organizar los círculos de servicios destacados
- **Cards Circulares:** Diseño fiel al SRI con bordes de colores y iconos circulares
- **Sistema de Tabs:** Layout responsive con grid para los servicios adicionales
- **Servicios Lista:** Grid de 3 columnas en desktop, 2 en tablet, 1 en móvil

**Características principales:**

- Servicios circulares de 180px con hover effects
- Carrusel con botones de navegación
- Tabs con indicador visual activo
- Cards de servicios con iconos y descripciones

### 3. Componentes Vue Reestructurados

#### CabeceraBase.vue

```vue
<!-- Estructura con grid -->
<div class="contenedor-fluido">
  <div class="fila alinear-centro">
    <div class="columna-12 columna-md-3 columna-lg-2">...</div>
    <div class="columna-12 columna-md-6 columna-lg-8">...</div>
    <div class="columna-12 columna-md-3 columna-lg-2">...</div>
  </div>
</div>
```

**Mejoras:**

- Layout responsive de 3 columnas
- Oculta información de usuario en móviles
- Usa clases de alineación del grid (`alinear-centro`, `justificar-fin`)

#### MenuNavegacionBase.vue

```vue
<!-- Buscador con grid -->
<div class="fila alinear-centro">
  <div class="columna-10">
    <InputText />
  </div>
  <div class="columna-2">
    <Button />
  </div>
</div>
```

**Mejoras:**

- Buscador con proporción 10/2 columnas
- Navegación con PanelMenu de PrimeVue
- Modo solo iconos para menú colapsado

#### InicioVista.vue

```vue
<!-- Carrusel con grid -->
<div class="fila alinear-centro">
  <div class="columna-auto"><!-- Botón anterior --></div>
  <div class="columna"><!-- Servicios --></div>
  <div class="columna-auto"><!-- Botón siguiente --></div>
</div>

<!-- Lista de servicios con grid -->
<div class="fila">
  <div class="columna-12 columna-md-6 columna-lg-4">
    <!-- Servicio -->
  </div>
</div>
```

**Mejoras:**

- Carrusel con botones laterales usando `columna-auto`
- Grid responsive para servicios (1, 2 o 3 columnas según pantalla)
- Estructura semántica y accesible

#### ContenidoPrincipalBase.vue

```vue
<div class="contenedor-fluido">
  <div class="fila">
    <div class="columna-12">
      <!-- Breadcrumb -->
    </div>
  </div>
  <div class="fila">
    <div class="columna-12">
      <!-- Contenido -->
    </div>
  </div>
</div>
```

**Mejoras:**

- Usa contenedor fluido para máximo ancho
- Separación clara entre breadcrumb y contenido
- Estructura modular con slots

#### PiePagina.vue

```vue
<div class="fila alinear-centro">
  <div class="columna-12 columna-md-4"><!-- Enlaces --></div>
  <div class="columna-12 columna-md-4"><!-- Copyright --></div>
  <div class="columna-12 columna-md-4"><!-- Versión --></div>
</div>
```

**Mejoras:**

- Layout de 3 columnas en desktop
- Apilado vertical en móviles
- Alineación centrada con clases del grid

## Ventajas de la Reestructuración

### 1. Consistencia

- Todos los componentes usan el mismo sistema de grid
- Nomenclatura en español coherente en todo el proyecto
- Breakpoints unificados

### 2. Mantenibilidad

- Código más limpio y organizado
- Fácil de entender y modificar
- Comentarios claros en cada sección

### 3. Responsive

- Diseño mobile-first
- Breakpoints bien definidos (xs, sm, md, lg, xl, xxl)
- Comportamiento predecible en todos los dispositivos

### 4. Reutilización

- Clases del grid reutilizables
- No hay código CSS duplicado
- Componentes modulares

### 5. Performance

- CSS optimizado
- Menos estilos inline
- Mejor cacheo del navegador

## Breakpoints Utilizados

```css
/* Extra Small (xs) */
< 576px: Móviles pequeños

/* Small (sm) */
≥ 576px: Móviles grandes

/* Medium (md) */
≥ 768px: Tablets

/* Large (lg) */
≥ 992px: Laptops

/* Extra Large (xl) */
≥ 1200px: Desktops

/* Extra Extra Large (xxl) */
≥ 1400px: Pantallas grandes
```

## Clases del Grid Más Utilizadas

### Contenedores

- `.contenedor`: Ancho máximo según breakpoint
- `.contenedor-fluido`: Ancho completo con padding

### Layout

- `.fila`: Contenedor flex para columnas
- `.columna-*`: Columnas de 1 a 12
- `.columna-{breakpoint}-*`: Columnas responsive

### Alineación

- `.alinear-centro`: Alinea items verticalmente al centro
- `.justificar-centro`: Justifica contenido horizontalmente al centro
- `.justificar-fin`: Justifica contenido al final
- `.justificar-entre`: Espacio entre items

### Visualización

- `.mostrar-flex`: Display flex
- `.mostrar-bloque`: Display block
- `.ocultar-elemento`: Ocultar elemento (display: none)

### Responsive

- `.ocultar-xs`: Ocultar en móviles pequeños
- `.ocultar-sm`: Ocultar en móviles grandes
- `.mostrar-md`: Mostrar desde tablets

## Estructura de Archivos

```
src/
├── assets/
│   └── css/
│       ├── variables-grid.css      # Variables CSS del grid
│       ├── grid-sistema.css        # Sistema de grid completo
│       ├── layout.css              # Estilos del layout (REESTRUCTURADO)
│       └── inicio.css              # Estilos de inicio (REESTRUCTURADO)
├── componentes/
│   └── layout/
│       ├── CabeceraBase.vue       # (REESTRUCTURADO)
│       ├── MenuNavegacionBase.vue         # (REESTRUCTURADO)
│       ├── ContenidoPrincipalBase.vue  # (REESTRUCTURADO)
│       └── PiePagina.vue           # (REESTRUCTURADO)
└── vistas/
    └── InicioVista.vue             # (REESTRUCTURADO)
```

## Próximos Pasos

1. **Testing:** Ejecutar las pruebas unitarias para verificar que todo funciona
2. **Validación:** Revisar el diseño en diferentes dispositivos
3. **Optimización:** Ajustar espaciados y tamaños según feedback
4. **Documentación:** Actualizar guías de uso para el equipo

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar pruebas
npm run test

# Compilar para producción
npm run build
```

## Notas Importantes

- **No usar librerías CSS externas:** El proyecto usa solo el sistema de grid personalizado
- **Nomenclatura en español:** Todas las clases están en español para consistencia
- **Mobile-first:** Diseñar primero para móviles, luego escalar a desktop
- **Principios SOLID:** Componentes con responsabilidad única y reutilizables
- **TDD:** Mantener las pruebas actualizadas con cada cambio

## Soporte

Para dudas o problemas con el sistema de grid, consultar:

- `GUIA-GRID-SISTEMA.md`: Guía completa del sistema de grid
- `VARIABLES-GRID-ESPANOL.md`: Documentación de variables CSS
- `PERSONALIZACION-GRID.md`: Cómo personalizar el grid

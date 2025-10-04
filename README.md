# SRI Internet Base - Plantilla Vue 3

Sistema de plantilla base responsiva para aplicaciones web del SRI (Servicio de Rentas Internas), desarrollado con Vue 3, TypeScript, Pinia y PrimeVue siguiendo principios SOLID y metodología TDD.

## 🚀 Características

- ✅ Vue 3 con Composition API y `<script setup>`
- ✅ TypeScript estricto
- ✅ Pinia para gestión de estado
- ✅ PrimeVue para componentes UI
- ✅ Diseño responsivo completo
- ✅ TDD con Vitest (34 tests pasando)
- ✅ Principios SOLID
- ✅ Estilos SCSS personalizados
- ✅ Accesibilidad WCAG AA

## 📋 Requisitos

- Node.js >= 22.12.0 LTS
- npm >= 10.x

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install
```

## 🎯 Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo

# Pruebas
npm run test:unit        # Ejecutar pruebas unitarias

# Producción
npm run build            # Compilar para producción
npm run preview          # Vista previa de producción

# Calidad de Código
npm run type-check       # Verificar tipos TypeScript
npm run lint             # Ejecutar linter
npm run format           # Formatear código
```

## 📁 Estructura del Proyecto

```
src/
├── almacenes/           # Pinia stores
├── componentes/         # Componentes reutilizables
│   └── layout/         # Componentes del layout
├── vistas/             # Vistas de la aplicación
├── interfaces/         # Interfaces TypeScript
├── assets/             # Recursos estáticos
│   └── css/           # Estilos SCSS
├── App.vue            # Componente raíz
└── main.ts           # Punto de entrada
```

## 🎨 Componentes del Layout

### 1. Encabezado (EncabezadoApp)
- Menú hamburguesa
- Logo SRI
- Información del usuario
- Iconos de navegación

### 2. Menú Lateral (MenuLateral)
- Navegación con búsqueda
- Submenús multinivel
- Modo colapsado (solo iconos)
- Responsive

### 3. Contenido Principal (ContenidoPrincipal)
- Breadcrumbs
- Área de contenido dinámico

### 4. Pie de Página (PiePagina)
- Información legal
- Copyright
- Versión del sistema

## 🧪 Pruebas

El proyecto incluye 34 pruebas unitarias que cubren:
- Stores de Pinia
- Componentes Vue
- Vistas
- Lógica de negocio

```bash
# Ejecutar todas las pruebas
npm run test:unit

# Modo watch
npm run test:unit -- --watch

# Con cobertura
npm run test:unit -- --coverage
```

## 🎨 Estilos

### Variables SCSS
Todas las variables de diseño están en `src/assets/css/_sri-vue-variables.scss`:
- Colores corporativos
- Tamaños de fuente
- Espaciados
- Breakpoints

### Color Principal
- **Azul SRI**: #0c4597

### Breakpoints Responsive
- xs: 0px
- sm: 576px
- md: 768px
- lg: 992px
- xl: 1200px
- xxl: 1400px

## 📚 Documentación Completa

- [DOCUMENTACION.md](./DOCUMENTACION.md) - Documentación técnica completa
- [GUIA-VARIABLES-CSS.md](./GUIA-VARIABLES-CSS.md) - Guía de variables SCSS vs CSS nativo
- [COMO-CAMBIAR-A-CSS-NATIVO.md](./COMO-CAMBIAR-A-CSS-NATIVO.md) - Cómo cambiar entre versiones
- [GUIA-GRID-SISTEMA.md](./GUIA-GRID-SISTEMA.md) - Sistema de Grid Responsivo en Español

## 🎨 Dos Versiones de Estilos Disponibles

Este proyecto incluye **dos implementaciones de estilos**:

### 1. SCSS (Por Defecto - Actual)
- Variables SCSS tradicionales
- Compilación en build time
- Más potente para cálculos complejos
- **Archivos**: `_layout.scss`, `_inicio.scss`

### 2. CSS Custom Properties (Alternativa)
- Variables CSS nativas
- Cambios dinámicos en runtime
- Ideal para temas dinámicos
- **Archivos**: `layout.css`, `inicio.css`, `variables.css`

**Para cambiar entre versiones**, consulta [COMO-CAMBIAR-A-CSS-NATIVO.md](./COMO-CAMBIAR-A-CSS-NATIVO.md)

## 📐 Sistema de Grid Responsivo en Español

El proyecto incluye un **sistema de grid completo** similar a Bootstrap pero con nombres en español:

- ✅ **12 columnas** con sistema flexible
- ✅ **5 breakpoints** responsive (xs, sm, md, lg, xl, xxl)
- ✅ **CSS puro generado** - No requiere preprocesador
- ✅ **Nombres en español** - `.contenedor`, `.fila`, `.columna-6`
- ✅ **Variables CSS** - Fácil personalización
- ✅ **Utilidades completas** - Alineación, orden, espaciado, etc.

### Ejemplo Rápido

```html
<div class="contenedor">
  <div class="fila">
    <div class="columna-12 columna-md-6 columna-lg-4">
      Responsive: 12 cols (móvil) → 6 cols (tablet) → 4 cols (desktop)
    </div>
  </div>
</div>
```

### Personalización con Variables

```css
:root {
  --grid-gutter: 20px;        /* Cambiar espaciado */
  --contenedor-lg: 1000px;    /* Cambiar ancho máximo */
}
```

**Documentación**:
- [GUIA-GRID-SISTEMA.md](./GUIA-GRID-SISTEMA.md) - Guía completa
- [PERSONALIZACION-GRID.md](./PERSONALIZACION-GRID.md) - Personalización con variables

## 🤝 Contribución

1. Seguir principios SOLID
2. Escribir pruebas (TDD)
3. Usar TypeScript estricto
4. Código en español
5. Documentar con JSDoc

## 📄 Licencia

Copyright SRI-2023

## 👨‍💻 Autor

Planificación TI - LRodriguez

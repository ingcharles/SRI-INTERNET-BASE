# Guía del Sistema de Grid Responsivo en Español

## 📐 Descripción

Sistema de grid completo similar a Bootstrap pero con **nombres en español** y **CSS puro generado** (no SCSS). Sistema de 12 columnas con 5 breakpoints responsive.

## 🎯 Características

- ✅ **100% CSS Puro** - No requiere preprocesador
- ✅ **Nombres en Español** - Fácil de entender y usar
- ✅ **12 Columnas** - Sistema flexible
- ✅ **5 Breakpoints** - Totalmente responsivo
- ✅ **Utilidades Flex** - Control completo del layout
- ✅ **Sin Dependencias** - Solo CSS nativo

## 📏 Breakpoints

| Nombre | Prefijo | Ancho Mínimo | Contenedor Max |
|--------|---------|--------------|----------------|
| Extra Small | (ninguno) | < 576px | 100% |
| Small | `sm` | ≥ 576px | 540px |
| Medium | `md` | ≥ 768px | 720px |
| Large | `lg` | ≥ 992px | 960px |
| Extra Large | `xl` | ≥ 1200px | 1140px |
| Extra Extra Large | `xxl` | ≥ 1400px | 1320px |

## 🏗️ Estructura Básica

```html
<div class="contenedor">
  <div class="fila">
    <div class="columna-6">
      Mitad del ancho
    </div>
    <div class="columna-6">
      Mitad del ancho
    </div>
  </div>
</div>
```

## 📦 Contenedores

### Contenedor Fijo
```html
<div class="contenedor">
  <!-- Ancho máximo según breakpoint -->
</div>
```

### Contenedor Fluido
```html
<div class="contenedor-fluido">
  <!-- Siempre 100% de ancho -->
</div>
```

## 📊 Sistema de Columnas

### Columnas Básicas (1-12)

```html
<div class="fila">
  <div class="columna-1">8.33%</div>
  <div class="columna-2">16.67%</div>
  <div class="columna-3">25%</div>
  <div class="columna-4">33.33%</div>
  <div class="columna-5">41.67%</div>
  <div class="columna-6">50%</div>
  <div class="columna-7">58.33%</div>
  <div class="columna-8">66.67%</div>
  <div class="columna-9">75%</div>
  <div class="columna-10">83.33%</div>
  <div class="columna-11">91.67%</div>
  <div class="columna-12">100%</div>
</div>
```

### Columna Automática
```html
<div class="fila">
  <div class="columna">Crece automáticamente</div>
  <div class="columna">Crece automáticamente</div>
</div>
```

### Columna Auto (Ancho del Contenido)
```html
<div class="fila">
  <div class="columna-auto">Ancho del contenido</div>
  <div class="columna">Ocupa el resto</div>
</div>
```

## 📱 Grid Responsivo

### Ejemplo: Móvil → Tablet → Desktop

```html
<div class="fila">
  <!-- 12 cols en móvil, 6 en tablet, 4 en desktop -->
  <div class="columna-12 columna-md-6 columna-lg-4">
    Contenido
  </div>
  <div class="columna-12 columna-md-6 columna-lg-4">
    Contenido
  </div>
  <div class="columna-12 columna-md-6 columna-lg-4">
    Contenido
  </div>
</div>
```

### Todos los Breakpoints

```html
<div class="columna-12 columna-sm-6 columna-md-4 columna-lg-3 columna-xl-2">
  <!-- Responsive en todos los tamaños -->
</div>
```

## ↔️ Desplazamiento (Offset)

Mueve columnas a la derecha:

```html
<div class="fila">
  <!-- Centrar una columna de 6 -->
  <div class="columna-6 desplazar-3">
    Centrado
  </div>
</div>

<div class="fila">
  <!-- Desplazamiento responsive -->
  <div class="columna-4 desplazar-2 desplazar-md-4">
    Desplazado
  </div>
</div>
```

## 🔢 Orden

Cambia el orden visual de las columnas:

```html
<div class="fila">
  <div class="columna-4 orden-3">
    Aparece tercero
  </div>
  <div class="columna-4 orden-1">
    Aparece primero
  </div>
  <div class="columna-4 orden-2">
    Aparece segundo
  </div>
</div>
```

### Orden Especial
```html
<div class="orden-primero">Siempre primero</div>
<div class="orden-ultimo">Siempre último</div>
```

## 🎨 Alineación

### Justificar Contenido (Horizontal)

```html
<div class="fila justificar-inicio">Inicio</div>
<div class="fila justificar-fin">Fin</div>
<div class="fila justificar-centro">Centro</div>
<div class="fila justificar-entre">Space Between</div>
<div class="fila justificar-alrededor">Space Around</div>
<div class="fila justificar-uniforme">Space Evenly</div>
```

### Alinear Items (Vertical)

```html
<div class="fila alinear-inicio">Inicio</div>
<div class="fila alinear-fin">Fin</div>
<div class="fila alinear-centro">Centro</div>
<div class="fila alinear-base">Baseline</div>
<div class="fila alinear-estirar">Stretch</div>
```

### Alinear Self (Individual)

```html
<div class="fila">
  <div class="columna-4 alinear-self-inicio">Inicio</div>
  <div class="columna-4 alinear-self-centro">Centro</div>
  <div class="columna-4 alinear-self-fin">Fin</div>
</div>
```

## 🔄 Dirección Flex

```html
<div class="fila flex-fila">Horizontal →</div>
<div class="fila flex-fila-inversa">Horizontal ←</div>
<div class="fila flex-columna">Vertical ↓</div>
<div class="fila flex-columna-inversa">Vertical ↑</div>
```

## 📏 Espaciado (Gap)

```html
<!-- Gap general -->
<div class="fila espacio-0">Sin espacio</div>
<div class="fila espacio-1">0.25rem</div>
<div class="fila espacio-2">0.5rem</div>
<div class="fila espacio-3">1rem</div>
<div class="fila espacio-4">1.5rem</div>
<div class="fila espacio-5">3rem</div>

<!-- Gap entre filas -->
<div class="fila espacio-fila-3">1rem entre filas</div>

<!-- Gap entre columnas -->
<div class="fila espacio-columna-3">1rem entre columnas</div>
```

## 🚫 Sin Espaciado (Gutters)

```html
<div class="fila sin-espaciado">
  <div class="columna-4">Sin padding</div>
  <div class="columna-4">Sin padding</div>
  <div class="columna-4">Sin padding</div>
</div>
```

## 📺 Display

```html
<div class="d-flex">Display Flex</div>
<div class="d-inline-flex">Display Inline Flex</div>
<div class="d-block">Display Block</div>
<div class="d-inline-block">Display Inline Block</div>
<div class="d-inline">Display Inline</div>
<div class="d-none">Oculto</div>
```

## 👁️ Ocultar/Mostrar Responsive

```html
<!-- Ocultar en tamaños específicos -->
<div class="ocultar-xs">Oculto en móviles</div>
<div class="ocultar-sm">Oculto en small</div>
<div class="ocultar-md">Oculto en medium</div>
<div class="ocultar-lg">Oculto en large</div>
<div class="ocultar-xl">Oculto en extra large</div>
<div class="ocultar-xxl">Oculto en extra extra large</div>

<!-- Mostrar solo en tamaños específicos -->
<div class="mostrar-md">Solo visible en medium</div>
```

## 💪 Grow y Shrink

```html
<div class="fila">
  <div class="columna flex-llenar">Llena el espacio</div>
  <div class="columna flex-crecer-0">No crece</div>
  <div class="columna flex-crecer-1">Crece</div>
  <div class="columna flex-encoger-0">No se encoge</div>
  <div class="columna flex-encoger-1">Se encoge</div>
</div>
```

## 📝 Ejemplos Prácticos

### Layout de 3 Columnas Responsive

```html
<div class="contenedor">
  <div class="fila">
    <div class="columna-12 columna-md-4">
      Sidebar
    </div>
    <div class="columna-12 columna-md-8">
      Contenido Principal
    </div>
  </div>
</div>
```

### Card Grid Responsive

```html
<div class="contenedor">
  <div class="fila espacio-3">
    <div class="columna-12 columna-sm-6 columna-md-4 columna-lg-3">
      <div class="card">Card 1</div>
    </div>
    <div class="columna-12 columna-sm-6 columna-md-4 columna-lg-3">
      <div class="card">Card 2</div>
    </div>
    <div class="columna-12 columna-sm-6 columna-md-4 columna-lg-3">
      <div class="card">Card 3</div>
    </div>
    <div class="columna-12 columna-sm-6 columna-md-4 columna-lg-3">
      <div class="card">Card 4</div>
    </div>
  </div>
</div>
```

### Formulario con Labels y Inputs

```html
<div class="contenedor">
  <div class="fila alinear-centro mb-3">
    <div class="columna-12 columna-md-3">
      <label>Nombre:</label>
    </div>
    <div class="columna-12 columna-md-9">
      <input type="text" class="ancho-100">
    </div>
  </div>
  <div class="fila alinear-centro mb-3">
    <div class="columna-12 columna-md-3">
      <label>Email:</label>
    </div>
    <div class="columna-12 columna-md-9">
      <input type="email" class="ancho-100">
    </div>
  </div>
</div>
```

### Header con Logo y Navegación

```html
<header class="contenedor-fluido">
  <div class="fila alinear-centro justificar-entre">
    <div class="columna-auto">
      <img src="logo.png" alt="Logo">
    </div>
    <nav class="columna-auto">
      <div class="d-flex espacio-3">
        <a href="#">Inicio</a>
        <a href="#">Servicios</a>
        <a href="#">Contacto</a>
      </div>
    </nav>
  </div>
</header>
```

## 🎓 Comparación con Bootstrap

| Bootstrap | Sistema en Español |
|-----------|-------------------|
| `.container` | `.contenedor` |
| `.container-fluid` | `.contenedor-fluido` |
| `.row` | `.fila` |
| `.col` | `.columna` |
| `.col-6` | `.columna-6` |
| `.col-md-4` | `.columna-md-4` |
| `.offset-3` | `.desplazar-3` |
| `.order-1` | `.orden-1` |
| `.order-first` | `.orden-primero` |
| `.order-last` | `.orden-ultimo` |
| `.justify-content-center` | `.justificar-centro` |
| `.align-items-center` | `.alinear-centro` |
| `.d-flex` | `.d-flex` |
| `.flex-row` | `.flex-fila` |
| `.flex-column` | `.flex-columna` |

## 🚀 Uso en el Proyecto

El sistema de grid ya está importado globalmente en `main.ts`:

```typescript
import '@/assets/css/grid-sistema.css';
```

Puedes usarlo en cualquier componente sin importaciones adicionales:

```vue
<template>
  <div class="contenedor">
    <div class="fila">
      <div class="columna-md-6">
        Contenido
      </div>
    </div>
  </div>
</template>
```

## 📦 Archivo CSS

El sistema completo está en:
```
src/assets/css/grid-sistema.css
```

## 🎨 Componente de Ejemplo

Revisa el componente de ejemplo completo en:
```
src/componentes/ejemplos/EjemploGrid.vue
```

## 💡 Tips y Mejores Prácticas

1. **Usa contenedores** para centrar y limitar el ancho del contenido
2. **Combina breakpoints** para layouts complejos
3. **Usa `sin-espaciado`** cuando necesites columnas pegadas
4. **Aprovecha las utilidades flex** para alineación precisa
5. **Usa `columna-auto`** para anchos basados en contenido
6. **Combina `orden-*`** con breakpoints para reordenar en móvil

## 🔧 Personalización

Para modificar los breakpoints o espaciados, edita:
```
src/assets/css/grid-sistema.css
```

## 📚 Recursos Adicionales

- Ver ejemplos en vivo: `EjemploGrid.vue`
- Documentación de Flexbox: [MDN Flexbox](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Flexible_Box_Layout)
- Comparación con Bootstrap: [Bootstrap Grid](https://getbootstrap.com/docs/5.3/layout/grid/)

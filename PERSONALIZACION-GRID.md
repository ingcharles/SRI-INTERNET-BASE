# Personalización del Sistema de Grid con Variables CSS

## 📋 Descripción

El sistema de grid ahora usa **CSS Custom Properties (variables CSS)** para permitir una fácil personalización sin modificar el código fuente.

## 📁 Archivos

- **`variables-grid.css`** - Variables del sistema de grid
- **`grid-sistema.css`** - Sistema de grid (usa las variables)

## 🎨 Variables Disponibles

### Espaciado del Grid

```css
:root {
  --grid-gutter: 15px;           /* Espaciado entre columnas */
  --grid-gutter-doble: 30px;     /* Espaciado doble */
}
```

### Anchos Máximos de Contenedores

```css
:root {
  --contenedor-sm: 540px;        /* Small (≥576px) */
  --contenedor-md: 720px;        /* Medium (≥768px) */
  --contenedor-lg: 960px;        /* Large (≥992px) */
  --contenedor-xl: 1140px;       /* Extra Large (≥1200px) */
  --contenedor-xxl: 1320px;      /* Extra Extra Large (≥1400px) */
}
```

### Breakpoints

```css
:root {
  --breakpoint-xs: 0px;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1400px;
}
```

### Porcentajes de Columnas

```css
:root {
  --col-1: 8.333333%;
  --col-2: 16.666667%;
  --col-3: 25%;
  --col-4: 33.333333%;
  --col-5: 41.666667%;
  --col-6: 50%;
  --col-7: 58.333333%;
  --col-8: 66.666667%;
  --col-9: 75%;
  --col-10: 83.333333%;
  --col-11: 91.666667%;
  --col-12: 100%;
}
```

### Espaciado (Gap)

```css
:root {
  --espacio-0: 0;
  --espacio-1: 0.25rem;
  --espacio-2: 0.5rem;
  --espacio-3: 1rem;
  --espacio-4: 1.5rem;
  --espacio-5: 3rem;
}
```

## 🔧 Formas de Personalizar

### 1. Modificar el Archivo de Variables

Edita `src/assets/css/variables-grid.css`:

```css
:root {
  /* Cambiar el espaciado global */
  --grid-gutter: 20px;  /* Era 15px */
  
  /* Cambiar anchos de contenedores */
  --contenedor-lg: 1000px;  /* Era 960px */
}
```

### 2. Sobrescribir en tu CSS

Crea un archivo CSS personalizado:

```css
/* mi-tema.css */
:root {
  --grid-gutter: 10px;
  --contenedor-xl: 1200px;
}
```

Impórtalo después de `grid-sistema.css` en `main.ts`:

```typescript
import '@/assets/css/grid-sistema.css';
import '@/assets/css/mi-tema.css';  // Sobrescribe variables
```

### 3. Usar Temas Predefinidos

El archivo `variables-grid.css` incluye temas predefinidos:

```html
<!-- Tema Compacto -->
<div class="tema-compacto">
  <div class="contenedor">
    <!-- Contenido con espaciado reducido -->
  </div>
</div>

<!-- Tema Amplio -->
<div class="tema-amplio">
  <div class="contenedor">
    <!-- Contenido con espaciado aumentado -->
  </div>
</div>

<!-- Sin Espaciado -->
<div class="tema-sin-espaciado">
  <div class="contenedor">
    <!-- Contenido sin espaciado -->
  </div>
</div>
```

### 4. Cambiar Dinámicamente con JavaScript

```javascript
// Cambiar espaciado globalmente
document.documentElement.style.setProperty('--grid-gutter', '20px');

// Cambiar ancho de contenedor
document.documentElement.style.setProperty('--contenedor-lg', '1000px');

// Cambiar espaciado de gap
document.documentElement.style.setProperty('--espacio-3', '1.5rem');
```

### 5. Personalización por Componente

```vue
<template>
  <div class="mi-seccion">
    <div class="contenedor">
      <div class="fila">
        <div class="columna-6">Contenido</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mi-seccion {
  /* Sobrescribir variables solo en esta sección */
  --grid-gutter: 10px;
  --contenedor-lg: 900px;
}
</style>
```

## 📝 Ejemplos Prácticos

### Ejemplo 1: Grid Compacto para Móviles

```css
@media (max-width: 767px) {
  :root {
    --grid-gutter: 10px;
  }
}
```

### Ejemplo 2: Contenedores Más Anchos

```css
:root {
  --contenedor-sm: 600px;
  --contenedor-md: 800px;
  --contenedor-lg: 1000px;
  --contenedor-xl: 1200px;
  --contenedor-xxl: 1400px;
}
```

### Ejemplo 3: Sin Espaciado en Ciertas Secciones

```html
<div class="seccion-sin-espaciado">
  <div class="contenedor">
    <div class="fila">
      <div class="columna-6">Sin espaciado</div>
      <div class="columna-6">Sin espaciado</div>
    </div>
  </div>
</div>
```

```css
.seccion-sin-espaciado {
  --grid-gutter: 0;
}
```

### Ejemplo 4: Espaciado Personalizado por Breakpoint

```css
/* Móvil: espaciado pequeño */
:root {
  --grid-gutter: 10px;
}

/* Tablet: espaciado medio */
@media (min-width: 768px) {
  :root {
    --grid-gutter: 15px;
  }
}

/* Desktop: espaciado grande */
@media (min-width: 1200px) {
  :root {
    --grid-gutter: 20px;
  }
}
```

### Ejemplo 5: Tema Oscuro con Grid Personalizado

```css
.tema-oscuro {
  --grid-gutter: 20px;
  --contenedor-lg: 1000px;
  background-color: #1a1a1a;
  color: #ffffff;
}
```

## 🎯 Casos de Uso Comunes

### 1. Aplicación de Administración (Ancho Completo)

```css
:root {
  --contenedor-sm: 100%;
  --contenedor-md: 100%;
  --contenedor-lg: 100%;
  --contenedor-xl: 100%;
  --contenedor-xxl: 100%;
}
```

### 2. Blog o Sitio de Contenido (Ancho Limitado)

```css
:root {
  --contenedor-sm: 540px;
  --contenedor-md: 720px;
  --contenedor-lg: 800px;
  --contenedor-xl: 900px;
  --contenedor-xxl: 1000px;
}
```

### 3. E-commerce (Grid Compacto)

```css
:root {
  --grid-gutter: 10px;
  --espacio-3: 0.75rem;
}
```

### 4. Landing Page (Espaciado Amplio)

```css
:root {
  --grid-gutter: 25px;
  --espacio-3: 2rem;
  --espacio-4: 3rem;
}
```

## 🔄 Migración desde Valores Fijos

### Antes (Valores Fijos)

```css
.contenedor {
  padding-left: 15px;
  padding-right: 15px;
}

.columna-6 {
  flex: 0 0 50%;
  max-width: 50%;
}
```

### Después (Con Variables)

```css
.contenedor {
  padding-left: var(--grid-gutter);
  padding-right: var(--grid-gutter);
}

.columna-6 {
  flex: 0 0 var(--col-6);
  max-width: var(--col-6);
}
```

## 💡 Ventajas de Usar Variables

1. **Personalización Fácil** - Cambia valores sin tocar el código fuente
2. **Temas Dinámicos** - Crea múltiples temas fácilmente
3. **Responsive Avanzado** - Ajusta valores por breakpoint
4. **Mantenimiento** - Cambios centralizados
5. **JavaScript** - Modifica valores dinámicamente
6. **Componentes** - Personalización por componente

## 🚀 Mejores Prácticas

1. **No modifiques `grid-sistema.css`** - Usa variables para personalizar
2. **Crea temas** - Define variaciones como clases
3. **Documenta cambios** - Comenta por qué cambias valores
4. **Prueba responsive** - Verifica en todos los breakpoints
5. **Usa calc()** - Para cálculos dinámicos: `calc(var(--grid-gutter) * 2)`

## 📚 Recursos Adicionales

- [MDN: CSS Custom Properties](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties)
- [Can I Use: CSS Variables](https://caniuse.com/css-variables)
- [GUIA-GRID-SISTEMA.md](./GUIA-GRID-SISTEMA.md) - Guía completa del grid

## 🎓 Ejemplo Completo

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Personalización global */
    :root {
      --grid-gutter: 20px;
      --contenedor-lg: 1000px;
    }
    
    /* Tema para sección hero */
    .hero {
      --grid-gutter: 30px;
      --espacio-3: 2rem;
    }
    
    /* Tema para footer */
    .footer {
      --grid-gutter: 15px;
    }
  </style>
</head>
<body>
  <!-- Hero con espaciado amplio -->
  <section class="hero">
    <div class="contenedor">
      <div class="fila espacio-3">
        <div class="columna-12">
          <h1>Bienvenido</h1>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Contenido normal -->
  <main>
    <div class="contenedor">
      <div class="fila">
        <div class="columna-md-8">Contenido</div>
        <div class="columna-md-4">Sidebar</div>
      </div>
    </div>
  </main>
  
  <!-- Footer con espaciado reducido -->
  <footer class="footer">
    <div class="contenedor">
      <div class="fila">
        <div class="columna-12">© 2025</div>
      </div>
    </div>
  </footer>
</body>
</html>
```

## ✅ Checklist de Personalización

- [ ] Identificar qué variables necesitas cambiar
- [ ] Decidir si cambiar globalmente o por sección
- [ ] Probar en todos los breakpoints
- [ ] Verificar que no rompa el layout existente
- [ ] Documentar los cambios realizados
- [ ] Considerar crear un tema reutilizable

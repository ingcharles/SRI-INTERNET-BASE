# Variables del Sistema de Rejilla en Español

## 📋 Todas las Variables en Español

El sistema de grid ahora usa **100% variables en español** para mayor claridad y facilidad de uso.

## 🎨 Lista Completa de Variables

### Espaciado del Sistema

| Variable | Valor Por Defecto | Descripción |
|----------|-------------------|-------------|
| `--espaciado-rejilla` | `15px` | Espaciado entre columnas (padding) |
| `--espaciado-rejilla-doble` | `30px` | Espaciado doble |

### Anchos Máximos de Contenedores

| Variable | Valor | Breakpoint |
|----------|-------|------------|
| `--contenedor-pequeno` | `540px` | ≥ 576px (sm) |
| `--contenedor-mediano` | `720px` | ≥ 768px (md) |
| `--contenedor-grande` | `960px` | ≥ 992px (lg) |
| `--contenedor-extra-grande` | `1140px` | ≥ 1200px (xl) |
| `--contenedor-extra-extra-grande` | `1320px` | ≥ 1400px (xxl) |

### Puntos de Quiebre (Breakpoints)

| Variable | Valor | Uso |
|----------|-------|-----|
| `--punto-quiebre-xs` | `0px` | Extra pequeño |
| `--punto-quiebre-pequeno` | `576px` | Pequeño (sm) |
| `--punto-quiebre-mediano` | `768px` | Mediano (md) |
| `--punto-quiebre-grande` | `992px` | Grande (lg) |
| `--punto-quiebre-extra-grande` | `1200px` | Extra grande (xl) |
| `--punto-quiebre-extra-extra-grande` | `1400px` | Extra extra grande (xxl) |

### Anchos de Columnas

| Variable | Valor | Equivalente |
|----------|-------|-------------|
| `--ancho-columna-1` | `8.333333%` | 1/12 |
| `--ancho-columna-2` | `16.666667%` | 2/12 |
| `--ancho-columna-3` | `25%` | 3/12 (1/4) |
| `--ancho-columna-4` | `33.333333%` | 4/12 (1/3) |
| `--ancho-columna-5` | `41.666667%` | 5/12 |
| `--ancho-columna-6` | `50%` | 6/12 (1/2) |
| `--ancho-columna-7` | `58.333333%` | 7/12 |
| `--ancho-columna-8` | `66.666667%` | 8/12 (2/3) |
| `--ancho-columna-9` | `75%` | 9/12 (3/4) |
| `--ancho-columna-10` | `83.333333%` | 10/12 |
| `--ancho-columna-11` | `91.666667%` | 11/12 |
| `--ancho-columna-12` | `100%` | 12/12 (completo) |

### Espaciado Entre Elementos

| Variable | Valor | Uso |
|----------|-------|-----|
| `--espacio-0` | `0` | Sin espacio |
| `--espacio-1` | `0.25rem` | Espacio mínimo (4px) |
| `--espacio-2` | `0.5rem` | Espacio pequeño (8px) |
| `--espacio-3` | `1rem` | Espacio medio (16px) |
| `--espacio-4` | `1.5rem` | Espacio grande (24px) |
| `--espacio-5` | `3rem` | Espacio extra grande (48px) |

### Índice Z

| Variable | Valor | Uso |
|----------|-------|-----|
| `--indice-z-contenedor` | `1` | Contenedor |
| `--indice-z-fila` | `2` | Fila |
| `--indice-z-columna` | `3` | Columna |

### Otras Variables

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `--total-columnas` | `12` | Total de columnas en el sistema |

## 📝 Ejemplos de Uso

### Cambiar Espaciado Global

```css
:root {
  --espaciado-rejilla: 20px;
}
```

### Cambiar Ancho de Contenedor

```css
:root {
  --contenedor-grande: 1000px;
}
```

### Personalizar Columna

```css
:root {
  --ancho-columna-6: 48%;  /* Ajustar el 50% a 48% */
}
```

### Cambiar Espaciado Entre Elementos

```css
:root {
  --espacio-3: 1.5rem;  /* Cambiar de 1rem a 1.5rem */
}
```

## 🎨 Temas Predefinidos

### Tema Compacto

```css
.tema-compacto {
  --espaciado-rejilla: 10px;
  --espaciado-rejilla-doble: 20px;
  --contenedor-pequeno: 500px;
  --contenedor-mediano: 680px;
  --contenedor-grande: 900px;
  --contenedor-extra-grande: 1080px;
  --contenedor-extra-extra-grande: 1260px;
}
```

### Tema Amplio

```css
.tema-amplio {
  --espaciado-rejilla: 20px;
  --espaciado-rejilla-doble: 40px;
  --contenedor-pequeno: 580px;
  --contenedor-mediano: 760px;
  --contenedor-grande: 1020px;
  --contenedor-extra-grande: 1200px;
  --contenedor-extra-extra-grande: 1400px;
}
```

### Tema Sin Espaciado

```css
.tema-sin-espaciado {
  --espaciado-rejilla: 0px;
  --espaciado-rejilla-doble: 0px;
}
```

## 🔄 Comparación: Inglés vs Español

| Inglés (Antes) | Español (Ahora) |
|----------------|-----------------|
| `--grid-gutter` | `--espaciado-rejilla` |
| `--grid-gutter-doble` | `--espaciado-rejilla-doble` |
| `--contenedor-sm` | `--contenedor-pequeno` |
| `--contenedor-md` | `--contenedor-mediano` |
| `--contenedor-lg` | `--contenedor-grande` |
| `--contenedor-xl` | `--contenedor-extra-grande` |
| `--contenedor-xxl` | `--contenedor-extra-extra-grande` |
| `--breakpoint-xs` | `--punto-quiebre-xs` |
| `--breakpoint-sm` | `--punto-quiebre-pequeno` |
| `--breakpoint-md` | `--punto-quiebre-mediano` |
| `--breakpoint-lg` | `--punto-quiebre-grande` |
| `--breakpoint-xl` | `--punto-quiebre-extra-grande` |
| `--breakpoint-xxl` | `--punto-quiebre-extra-extra-grande` |
| `--col-1` | `--ancho-columna-1` |
| `--col-2` | `--ancho-columna-2` |
| `--grid-columnas` | `--total-columnas` |
| `--z-contenedor` | `--indice-z-contenedor` |
| `--z-fila` | `--indice-z-fila` |
| `--z-columna` | `--indice-z-columna` |

## 💡 Ventajas de Variables en Español

1. **Claridad** - Más fácil de entender para equipos hispanohablantes
2. **Consistencia** - Todo el sistema en un solo idioma
3. **Mantenibilidad** - Código más legible
4. **Documentación** - Más natural en español
5. **Aprendizaje** - Curva de aprendizaje reducida

## 🚀 Uso en el Proyecto

Las variables están definidas en:
```
src/assets/css/variables-grid.css
```

Y se usan en:
```
src/assets/css/grid-sistema.css
```

Importadas automáticamente en:
```
src/main.ts
```

## 📚 Documentación Relacionada

- [GUIA-GRID-SISTEMA.md](./GUIA-GRID-SISTEMA.md) - Guía completa del sistema
- [PERSONALIZACION-GRID.md](./PERSONALIZACION-GRID.md) - Cómo personalizar
- [README.md](./README.md) - Información general

## ✅ Estado Actual

- ✅ **100% variables en español**
- ✅ **Nombres descriptivos y claros**
- ✅ **Fácil de personalizar**
- ✅ **Documentación completa**
- ✅ **Temas predefinidos**

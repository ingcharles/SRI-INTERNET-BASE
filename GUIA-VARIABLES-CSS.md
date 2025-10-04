# Guía de Variables CSS - SCSS vs CSS Nativo

## Comparación de Enfoques

### 1. Variables SCSS (Actual en el proyecto)

**Ventajas:**
- ✅ Funciones y operaciones matemáticas
- ✅ Anidamiento de selectores
- ✅ Mixins y funciones reutilizables
- ✅ Importación de archivos parciales
- ✅ Compilación en tiempo de build

**Desventajas:**
- ❌ Requiere compilador (Sass)
- ❌ No se pueden cambiar dinámicamente
- ❌ No funcionan con JavaScript en runtime

**Uso:**
```scss
// _sri-vue-variables.scss
$color-azul-principal: #0c4597;
$fuente-size-campo: 14px;

// En otro archivo
@import './sri-vue-variables';

.mi-componente {
  color: $color-azul-principal;
  font-size: $fuente-size-campo;
}
```

### 2. CSS Custom Properties (Moderno - Recomendado)

**Ventajas:**
- ✅ Nativas del navegador (no requiere compilador)
- ✅ Se pueden cambiar dinámicamente con JavaScript
- ✅ Soportan herencia en cascada
- ✅ Ideales para temas dinámicos
- ✅ Mejor rendimiento en runtime

**Desventajas:**
- ❌ No soportan operaciones matemáticas complejas
- ❌ No tienen funciones como SCSS
- ❌ Sintaxis más verbosa

**Uso:**
```css
/* variables.css */
:root {
  --color-azul-principal: #0c4597;
  --fuente-size-campo: 14px;
}

/* En cualquier CSS */
.mi-componente {
  color: var(--color-azul-principal);
  font-size: var(--fuente-size-campo);
}
```

## Solución al Error Actual

El error que estás viendo:
```
Undefined variable: $color-azul-fuerte
```

Se debe a que `_sri-vue-plantilla.scss` no estaba importando `_sri-vue-variables.scss`.

**Ya está corregido** con:
```scss
@import './sri-vue-variables';
```

## Enfoque Híbrido (Recomendado para proyectos grandes)

Puedes usar ambos enfoques:

### Paso 1: Convertir variables SCSS a CSS Custom Properties

```scss
// _sri-vue-variables.scss
$color-azul-principal: #0c4597;

:root {
  --color-azul-principal: #{$color-azul-principal};
}
```

### Paso 2: Usar CSS Custom Properties en componentes

```vue
<style scoped>
.mi-componente {
  /* Usa la variable CSS nativa */
  background-color: var(--color-azul-principal);
}
</style>
```

### Paso 3: Cambiar dinámicamente con JavaScript

```typescript
// Cambiar tema dinámicamente
document.documentElement.style.setProperty('--color-azul-principal', '#ff0000');
```

## Migración Recomendada

### Opción 1: Mantener SCSS (Actual)
Si no necesitas cambios dinámicos, mantén SCSS. Es más potente para estilos complejos.

```scss
// Continúa usando
@import './sri-vue-variables';
```

### Opción 2: Migrar a CSS Nativo (Moderno)

1. **Actualizar main.ts:**
```typescript
// Reemplazar
import '@/assets/css/_sri-vue-variables.scss';
import '@/assets/css/_sri-vue-plantilla.scss';

// Por
import '@/assets/css/variables.css';
import '@/assets/css/estilos.css';
```

2. **Convertir estilos:**
```css
/* Antes (SCSS) */
.boton {
  background: $color-azul-principal;
}

/* Después (CSS) */
.boton {
  background: var(--color-azul-principal);
}
```

### Opción 3: Híbrido (Mejor de ambos mundos)

Usa SCSS para compilación y genera CSS Custom Properties:

```scss
// _sri-vue-variables.scss
$color-azul-principal: #0c4597;
$color-gris-fuerte: #434a54;

:root {
  --color-azul-principal: #{$color-azul-principal};
  --color-gris-fuerte: #{$color-gris-fuerte};
}

// Usa SCSS para cálculos complejos
$espaciado-base: 8px;
$espaciado-doble: $espaciado-base * 2; // 16px

:root {
  --espaciado-base: #{$espaciado-base};
  --espaciado-doble: #{$espaciado-doble};
}
```

## Ejemplo Práctico: Tema Oscuro

Con CSS Custom Properties puedes implementar temas fácilmente:

```typescript
// composables/useTema.ts
import { ref } from 'vue';

export function useTema() {
  const temaOscuro = ref(false);

  function alternarTema() {
    temaOscuro.value = !temaOscuro.value;
    
    if (temaOscuro.value) {
      document.documentElement.style.setProperty('--color-fondo', '#1a1a1a');
      document.documentElement.style.setProperty('--color-texto', '#ffffff');
    } else {
      document.documentElement.style.setProperty('--color-fondo', '#ffffff');
      document.documentElement.style.setProperty('--color-texto', '#434a54');
    }
  }

  return { temaOscuro, alternarTema };
}
```

```vue
<template>
  <button @click="alternarTema">
    {{ temaOscuro ? '☀️ Claro' : '🌙 Oscuro' }}
  </button>
</template>

<script setup lang="ts">
import { useTema } from '@/composables/useTema';
const { temaOscuro, alternarTema } = useTema();
</script>
```

## Recomendación Final

Para este proyecto del SRI:

1. **Corto plazo**: Mantén SCSS (ya está corregido)
2. **Mediano plazo**: Implementa enfoque híbrido
3. **Largo plazo**: Migra completamente a CSS Custom Properties

### Estado Actual del Proyecto
✅ **SCSS funcionando correctamente** con la importación agregada
✅ **Archivo variables.css creado** como referencia para migración futura
✅ **Ambos enfoques disponibles** para que elijas según necesidad

## Recursos Adicionales

- [MDN: CSS Custom Properties](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties)
- [Sass Documentation](https://sass-lang.com/documentation)
- [CSS Variables vs SCSS Variables](https://css-tricks.com/difference-between-types-of-css-variables/)

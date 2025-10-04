# Cómo Cambiar de SCSS a CSS Custom Properties

Este proyecto incluye dos versiones de los estilos:

## 📁 Archivos Disponibles

### Versión SCSS (Actual - Por Defecto)
- `src/assets/css/_sri-vue-variables.scss` - Variables SCSS
- `src/assets/css/_layout.scss` - Layout con SCSS
- `src/assets/css/_inicio.scss` - Vista inicio con SCSS
- `src/main.ts` - Configuración actual
- `src/App.vue` - Componente actual

### Versión CSS Nativo (Alternativa)
- `src/assets/css/variables.css` - Variables CSS Custom Properties
- `src/assets/css/layout.css` - Layout con CSS nativo
- `src/assets/css/inicio.css` - Vista inicio con CSS nativo
- `src/main-css-nativo.ts` - Configuración alternativa
- `src/App-css-nativo.vue` - Componente alternativo

## 🔄 Pasos para Cambiar a CSS Nativo

### Opción 1: Cambio Completo (Recomendado para producción)

1. **Respaldar archivos actuales:**
```bash
# Renombrar archivos SCSS
mv src/main.ts src/main-scss.ts
mv src/App.vue src/App-scss.vue
```

2. **Activar versión CSS nativa:**
```bash
# Renombrar archivos CSS nativos
mv src/main-css-nativo.ts src/main.ts
mv src/App-css-nativo.vue src/App.vue
```

3. **Reiniciar el servidor:**
```bash
npm run dev
```

### Opción 2: Cambio Temporal (Para pruebas)

Simplemente modifica `src/main.ts`:

```typescript
// Comentar importaciones SCSS
// import '@/assets/css/_sri-vue-variables.scss';
// import '@/assets/css/_layout.scss';
// import '@/assets/css/_inicio.scss';

// Descomentar importaciones CSS nativas
import '@/assets/css/variables.css';
import '@/assets/css/layout.css';
import '@/assets/css/inicio.css';
```

### Opción 3: Enfoque Híbrido (Mejor de ambos mundos)

Mantén SCSS pero genera CSS Custom Properties:

**Actualizar `_sri-vue-variables.scss`:**
```scss
// Variables SCSS (para cálculos)
$color-azul-principal: #0c4597;
$espaciado-base: 8px;
$espaciado-doble: $espaciado-base * 2;

// Generar CSS Custom Properties
:root {
  --color-azul-principal: #{$color-azul-principal};
  --espaciado-base: #{$espaciado-base};
  --espaciado-doble: #{$espaciado-doble};
}
```

**Usar en componentes:**
```vue
<style scoped>
.mi-componente {
  /* Usa CSS Custom Properties */
  background: var(--color-azul-principal);
  padding: var(--espaciado-doble);
}
</style>
```

## 📊 Comparación de Rendimiento

### SCSS (Actual)
- ✅ Compilación en build time
- ✅ CSS optimizado y minificado
- ✅ Sin overhead en runtime
- ❌ No se puede cambiar dinámicamente

### CSS Custom Properties
- ✅ Cambios dinámicos en runtime
- ✅ Temas dinámicos fáciles
- ✅ Mejor para personalización
- ⚠️ Ligero overhead en runtime (mínimo)

## 🎨 Ejemplo: Implementar Tema Oscuro

Con CSS Custom Properties es muy fácil:

```typescript
// composables/useTema.ts
export function useTema() {
  function aplicarTemaOscuro() {
    document.documentElement.style.setProperty(
      '--color-azul-principal', 
      '#1e3a8a'
    );
    document.documentElement.style.setProperty(
      '--color-blanco', 
      '#1a1a1a'
    );
    document.documentElement.style.setProperty(
      '--color-gris-fuerte', 
      '#e5e5e5'
    );
  }

  function aplicarTemaClaro() {
    document.documentElement.style.setProperty(
      '--color-azul-principal', 
      '#0c4597'
    );
    document.documentElement.style.setProperty(
      '--color-blanco', 
      '#ffffff'
    );
    document.documentElement.style.setProperty(
      '--color-gris-fuerte', 
      '#434a54'
    );
  }

  return { aplicarTemaOscuro, aplicarTemaClaro };
}
```

## 🔍 Verificar Qué Versión Estás Usando

Abre las DevTools del navegador y ejecuta:

```javascript
// Si devuelve un valor, estás usando CSS Custom Properties
getComputedStyle(document.documentElement)
  .getPropertyValue('--color-azul-principal');

// Si devuelve vacío, estás usando SCSS compilado
```

## 📝 Notas Importantes

1. **`_sri-vue-plantilla.scss` siempre se necesita** porque contiene estilos globales de PrimeVue personalizados que no están en las versiones CSS nativas.

2. **Ambas versiones son funcionalmente idénticas** - la diferencia está en cómo se definen y usan las variables.

3. **Para proyectos grandes**, el enfoque híbrido es ideal:
   - Usa SCSS para cálculos complejos
   - Genera CSS Custom Properties para temas dinámicos
   - Obtén lo mejor de ambos mundos

## 🚀 Recomendación

Para el proyecto SRI:

- **Desarrollo actual**: Mantén SCSS (más rápido, sin cambios)
- **Futuro cercano**: Implementa enfoque híbrido
- **Si necesitas temas**: Cambia a CSS Custom Properties

## 📚 Recursos

- [MDN: CSS Custom Properties](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties)
- [Can I Use: CSS Variables](https://caniuse.com/css-variables)
- [Sass: Interpolation](https://sass-lang.com/documentation/interpolation)

## ✅ Estado Actual del Proyecto

- ✅ SCSS funcionando (por defecto)
- ✅ CSS Custom Properties disponibles
- ✅ Ambas versiones probadas
- ✅ Documentación completa
- ✅ Fácil cambio entre versiones

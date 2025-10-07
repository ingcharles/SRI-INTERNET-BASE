# Sistema de Plantilla Base SRI - Documentación

## Descripción

Sistema de plantilla base responsiva para aplicaciones web del SRI (Servicio de Rentas Internas), desarrollado con Vue 3, TypeScript, Pinia y PrimeVue siguiendo principios SOLID y metodología TDD.

## Características Principales

### 1. Encabezado / Navbar

- Menú tipo hamburguesa para colapsar/expandir el menú lateral
- Logo del SRI (derecha)
- Información del usuario (identificación y nombre completo)
- Iconos de acción (izquierda):
  - Perfil
  - Alertas y avisos
  - Home
  - Iniciar sesión
  - Cerrar sesión
  - Accesibilidad
- En dispositivos pequeños: menú de 3 puntos que agrupa todas las opciones

### 2. Menú Lateral

- Navegación secundaria con secciones y módulos
- Buscador de servicios con filtrado en tiempo real
- Submenús desplegables de n niveles
- Iconos y etiquetas de acceso rápido
- Modo colapsado: solo muestra iconos
- En dispositivos pequeños: se oculta y aparece como overlay

### 3. Contenido Principal

- Área de contenido dinámico
- Breadcrumbs para navegación jerárquica
- Panel principal adaptable
- Vista de inicio con:
  - Carrusel de servicios destacados
  - Tabs de servicios más utilizados
  - Grid de servicios adicionales

### 4. Pie de Página

- Información legal (términos y condiciones, política de privacidad)
- Copyright
- Versión del sistema

## Stack Tecnológico

- **Node**: >=22.12.0 LTS
- **Vite**: 7.1.9
- **Vue**: 3.5.22
- **TypeScript**: 5.9.0
- **Pinia**: 3.0.3
- **PrimeVue**: 4.1.1
- **PrimeIcons**: 7.0.0
- **PrimeFlex**: 3.3.1
- **Vitest**: 3.2.4
- **Vue Test Utils**: 2.4.6
- **Sass**: Para estilos personalizados

## Estructura del Proyecto

```
src/
├── almacenes/              # Pinia stores
│   ├── layout.ts          # Store del layout
│   └── pruebas/           # Tests de stores
│       └── layout.spec.ts
├── componentes/           # Componentes reutilizables
│   └── layout/           # Componentes del layout
│       ├── CabeceraBase.vue
│       ├── MenuNavegacionBase.vue
│       ├── ContenidoPrincipalBase.vue
│       ├── PiePagina.vue
│       └── pruebas/      # Tests de componentes
├── vistas/               # Vistas de la aplicación
│   ├── InicioVista.vue
│   └── pruebas/
│       └── InicioVista.spec.ts
├── interfaces/           # Interfaces TypeScript
│   └── menu.interface.ts
├── assets/              # Recursos estáticos
│   └── css/            # Estilos SCSS
│       ├── _sri-vue-variables.scss
│       ├── _sri-vue-plantilla.scss
│       ├── _layout.scss
│       └── _inicio.scss
├── App.vue             # Componente raíz
└── main.ts            # Punto de entrada
```

## Principios de Desarrollo

### SOLID

- **S**ingle Responsibility: Cada componente tiene una única responsabilidad
- **O**pen/Closed: Componentes abiertos para extensión, cerrados para modificación
- **L**iskov Substitution: Los componentes pueden ser reemplazados por sus variantes
- **I**nterface Segregation: Interfaces específicas y no genéricas
- **D**ependency Inversion: Dependencia de abstracciones, no de implementaciones

### TDD (Test-Driven Development)

- Todas las funcionalidades tienen pruebas unitarias
- 34 tests pasando exitosamente
- Cobertura de:
  - Stores de Pinia
  - Componentes Vue
  - Vistas
  - Lógica de negocio

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar pruebas
npm run test:unit

# Compilar para producción
npm run build

# Verificar tipos TypeScript
npm run type-check

# Linter
npm run lint

# Formatear código
npm run format
```

## Estilos Personalizados

### Variables SCSS

El archivo `_sri-vue-variables.scss` contiene todas las variables de diseño:

- Colores corporativos del SRI
- Tamaños de fuente
- Espaciados
- Breakpoints responsive

### Color Principal

- **Azul Principal**: #0c4597

### Responsive Design

El sistema es completamente responsivo con breakpoints:

- **xs**: 0px
- **sm**: 576px
- **md**: 768px
- **lg**: 992px
- **xl**: 1200px
- **xxl**: 1400px

## Componentes Principales

### CabeceraBase

Encabezado fijo con información del usuario y opciones de navegación.

**Props:**

- `esPantallaPequena?: boolean` - Indica si es pantalla pequeña

**Eventos:**

- `alternar-menu` - Emitido al hacer click en el botón del menú

### MenuNavegacionBase

Menú lateral con navegación y búsqueda.

**Props:**

- `soloIconos?: boolean` - Muestra solo iconos cuando está colapsado

### ContenidoPrincipalBase

Área principal de contenido con breadcrumbs.

**Props:**

- `rutaActual?: string[]` - Ruta actual para breadcrumbs

**Slots:**

- `default` - Contenido principal

### PiePagina

Pie de página con información legal y versión.

## Store de Layout

### Estado

- `menuLateralVisible: boolean` - Visibilidad del menú lateral
- `menuMovilVisible: boolean` - Visibilidad del menú móvil
- `informacionUsuario: InformacionUsuario` - Datos del usuario
- `itemsMenu: ItemMenu[]` - Items del menú

### Acciones

- `alternarMenuLateral()` - Alterna visibilidad del menú lateral
- `alternarMenuMovil()` - Alterna visibilidad del menú móvil
- `cerrarMenuMovil()` - Cierra el menú móvil
- `actualizarInformacionUsuario(info)` - Actualiza información del usuario

### Getters

- `menuFiltrado` - Items del menú visibles

## Accesibilidad

- Todos los botones tienen `aria-label`
- Navegación por teclado soportada
- Contraste WCAG AA cumplido
- Labels asociados a inputs con `for` e `id`

## Seguridad

- No se exponen secretos en el cliente
- Validación de datos en formularios
- Sanitización de contenido HTML
- Security By Design

## Próximos Pasos

1. Implementar sistema de rutas con Vue Router
2. Agregar autenticación y autorización
3. Integrar servicios API
4. Implementar gestión de estado global más compleja
5. Agregar más vistas y funcionalidades
6. Implementar internacionalización (i18n)
7. Agregar modo oscuro
8. Mejorar accesibilidad con ARIA

## Contribución

Para contribuir al proyecto:

1. Seguir los principios SOLID
2. Escribir pruebas antes del código (TDD)
3. Usar TypeScript estricto
4. Seguir la guía de estilos de Vue 3
5. Documentar con JSDoc
6. Mantener código en español
7. Usar Composition API con `<script setup>`

## Licencia

Copyright SRI-2023

## Autor

Planificación TI - LRodriguez

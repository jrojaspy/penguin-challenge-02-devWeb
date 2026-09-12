## [Unreleased]

### Added

- Diseño responsive para móvil, tablet y escritorio.
- Breakpoint móvil hasta 640 px.
- Breakpoint tablet entre 641 px y 900 px.
- Ajustes específicos para pantallas menores a 420 px.
- Targets táctiles ampliados en navegación, botones y filtros.
- Adaptación del listado de proveedores a una columna en móvil.
- Adaptación del listado a dos columnas en tablets.
- Adaptación del detalle del proveedor a una sola columna en móvil.
- Protección frente a desbordes de texto.
- Fallback con Flexbox para navegadores con problemas de Grid.
- Uso de `@supports` para aplicar CSS Grid cuando esté disponible.
- Soporte para `prefers-reduced-motion`.
- Versionado temporal de recursos CSS y JavaScript para evitar caché durante las pruebas móviles.

### Changed

- Navegación reorganizada para pantallas pequeñas.
- Hero ajustado para reducir tamaño y espaciado en móvil.
- Tarjetas de proveedor adaptadas a pantallas táctiles.
- Filtro por categoría reorganizado verticalmente en móvil.
- Botones principales pasan a ancho completo en dispositivos pequeños.
- Contenedor principal ajustado para mejorar compatibilidad en Safari móvil.
- `margin-inline` reemplazado por `margin-left` y `margin-right` en elementos principales.
- `String.replaceAll()` reemplazado por expresiones regulares con `.replace()` para mayor compatibilidad con Safari antiguo.
- La interfaz de proveedores utiliza Flexbox como fallback y Grid como mejora progresiva.

### Fixed

- Problemas de visualización de tarjetas en determinadas tablets.
- Problemas de estilos no actualizados debido a caché móvil.
- Posibles fallos de renderizado en navegadores Safari antiguos.
- Desbordes horizontales en pantallas pequeñas.
- Comportamiento inconsistente del grid en algunos dispositivos.
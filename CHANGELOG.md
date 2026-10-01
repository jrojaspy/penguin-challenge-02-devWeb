# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y [SemVer](https://semver.org/lang/es/).

## [1.1.0]
### Changed
- Se oscureció la paleta principal y se aumentó la diferenciación entre fondo, tarjetas y controles a partir del feedback de P1 y P3.
- Se reforzó la jerarquía del CTA de contacto: **Llamar ahora** pasa a ser la acción principal más visible de cada tarjeta (feedback P4).
- Se mejoró el estado de error con instrucciones más explícitas para comprobar la conexión y volver a intentar (feedback P2).
- Se mejoró el estado sin resultados mostrando el término buscado y ofreciendo **Limpiar filtros** como acción de recuperación (feedback P5).
- Se aumentó la presencia visual de tarjetas y estados mediante bordes y fondos más diferenciados.

### Usability
- Se documentaron pruebas con 5 participantes reales realizadas el 30 de septiembre de 2026.
- Facilidad promedio registrada: **5,4 / 7 (77,1 %)**.
- Todos los participantes completaron la tarea asignada.

## [1.0.0]
### Added
- Configuración de despliegue: GitHub Pages (workflow con tests) y Netlify.
- Plantillas `docs/pruebas-usabilidad.md` y `docs/lighthouse/README.md`.
- README completo.

## [0.5.0]
### Added
- Modo oscuro automático, skeleton de carga y microinteracciones.
- Favicon SVG y `theme-color`.
- Pruebas automáticas (`npm test`): esquema de datos, HTML, filtros y comportamiento del DOM.
### Changed
- `prefers-reduced-motion` desactiva animaciones y transiciones.

## [0.4.0]
### Added
- Página de registro de proveedores con validación accesible y anti-spam (honeypot, tiempo mínimo, límite por minuto).

## [0.3.0]
### Added
- Página Detalle (`detalle.html?id=X`): perfil, botón llamar (`tel:`), enlace a Google Maps, compartir y proveedores relacionados.
- Orden del listado, filtros sincronizados con la URL, favoritos y "Limpiar filtros".

## [0.2.0]
### Added
- `providers.json` (12 proveedores) y capa `api.js` con latencia simulada y modos `?fail`, `?empty`, `?delay=N`.
- Listado con tarjetas dinámicas y los tres estados: cargando, sin resultados y error con reintento.

## [0.1.0]
### Added
- Estructura del proyecto, sistema de diseño (tokens CSS + BEM) y página Inicio.

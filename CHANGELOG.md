# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y [SemVer](https://semver.org/lang/es/).


## [1.1.3]
### Lighthouse
- Se completó la tercera medición de `proveedores.html` después de prerenderizar los skeletons.
- Performance alcanzó **100/100** en las dos ejecuciones finales analizadas.
- Accessibility, Best Practices y SEO se mantienen en **100/100**.
- CLS final de `proveedores.html`: **0.000**.
- Evolución móvil: Performance **90 → 97 → 100** y CLS **0.209 → 0.100 → 0.000**.
- Evolución escritorio: Performance **95 → 97 → 100** y CLS **0.143 → 0.109 → 0.000**.
- Se actualizó `README.md` y `docs/lighthouse/README.md` con la evidencia final.

## [1.1.2]
### Performance
- Se prerenderizaron 12 skeleton cards en `proveedores.html` para reservar el espacio del listado desde el HTML inicial y evitar el primer salto antes de ejecutar JavaScript.
- Se ajustó la altura de los skeletons por breakpoint para aproximar mejor la geometría de las tarjetas finales.
- Se reservó una altura mínima para el contador de resultados y evitar desplazamientos al mostrar la cantidad de proveedores.
- La latencia artificial de `api.js` pasó a **0 ms por defecto**; `?delay=N` queda disponible para demostrar el estado de carga.
- En el manejo de error se limpia `#provider-list` para que no queden skeletons visibles junto al mensaje de error.

### Lighthouse
- Se documentó la segunda medición: Inicio y Registro alcanzaron CLS 0; Proveedores mejoró de 0.209 a 0.100 en móvil y de 0.143 a 0.109 en escritorio.
- Performance de Proveedores mejoró de 90 a 97 en móvil y de 95 a 97 en escritorio.

## [1.1.1]
### Performance
- Se reservó la altura del header y footer generados por JavaScript para reducir desplazamientos de layout (CLS).
- Se reemplazó el skeleton genérico por 12 skeleton cards con una geometría similar a las tarjetas finales.
- Los skeletons se renderizan directamente dentro de `#provider-list`, manteniendo estable el grid durante la carga.
- Se documentó la medición inicial de Lighthouse y se dejó preparada la comparación antes/después.

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

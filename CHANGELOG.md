### Added

- Documentación de auditoría Lighthouse.
- Metadatos adicionales de navegador.
- Renderizado diferido mediante `content-visibility`.
- Reserva mínima de espacio para contenido dinámico.

### Changed

- El texto normalizado utilizado por el buscador se genera una sola vez al cargar los proveedores.
- Los recursos estáticos utilizan versión `v=11` durante la validación del commit.
- Se mantuvo la carga diferida de JavaScript mediante `defer`.

### Performance

- Se redujo el procesamiento repetitivo durante búsquedas.
- Se redujo el trabajo de renderizado inicial de tarjetas fuera del viewport.
- Se minimizan cambios visuales durante la carga del listado.
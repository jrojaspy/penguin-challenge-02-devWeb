### Added

- Estado visual de carga de proveedores.
- Estado vacío cuando no existen proveedores.
- Estado de error ante fallos de carga.
- Acción para reintentar la petición.
- Región `aria-live` para comunicar cambios de estado.
- Compatibilidad con `prefers-reduced-motion`.

### Changed

- La carga de proveedores ahora valida la respuesta HTTP.
- Se valida que la fuente de datos devuelva un arreglo.
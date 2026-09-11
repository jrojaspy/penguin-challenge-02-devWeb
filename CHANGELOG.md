
### Added

- Filtro de proveedores por categoría.
- Generación dinámica de categorías desde la fuente JSON.
- Contador de resultados.
- Estado vacío para filtros sin coincidencias.

### Changed

- El listado mantiene en memoria los proveedores cargados para permitir filtrado sin nuevas peticiones HTTP.
- El filtro se deshabilita mientras los datos no están disponibles.
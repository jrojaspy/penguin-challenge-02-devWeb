# ServiPy — Challenge 02

## Estado actual

Commit 05:

- estructura inicial;
- tres páginas base;
- fuente de datos desacoplada;
- carga mediante `fetch()`;
- renderizado dinámico;
- estados loading / empty / error;
- filtro dinámico por categoría;
- contador de resultados;
- navegación preparada hacia detalle;
- documentación de pruebas de usuario.

Todavía no están implementados:

- detalle dinámico;
- mejoras finales responsive;
- auditoría Lighthouse;
- pruebas de usuario;
- deploy.

## Filtro por categoría

Las categorías no están hardcodeadas en HTML.

Se obtienen dinámicamente a partir de:

`data/providers.json`

mediante un `Set` de JavaScript.

El filtro permite:

- mostrar todos los proveedores;
- filtrar por categoría;
- actualizar el número de resultados;
- mostrar un estado vacío cuando no existen coincidencias.
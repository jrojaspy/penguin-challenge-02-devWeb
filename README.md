# ServiPy — Challenge 02

## Estado actual

Commit 07:

- estructura inicial del proyecto;
- tres páginas funcionales:
  - Inicio;
  - Proveedores;
  - Detalle de proveedor;
- fuente de datos desacoplada en `data/providers.json`;
- carga de datos mediante `fetch()`;
- renderizado dinámico de proveedores;
- estados:
  - loading;
  - success;
  - empty;
  - error;
- acción de reintento ante fallos;
- filtro dinámico por categoría;
- contador de resultados;
- página de detalle dinámica mediante query string;
- contacto funcional mediante enlaces `tel:`;
- diseño responsive para:
  - móvil;
  - tablet;
  - escritorio;
- ajustes de compatibilidad para navegadores móviles;
- fallback visual con Flexbox cuando Grid no está disponible o presenta incompatibilidades.

Todavía quedan pendientes:

- revisión específica de accesibilidad;
- pruebas de usabilidad con cinco evaluadores;
- mejoras derivadas del feedback;
- auditoría Lighthouse;
- documentación final de rendimiento;
- deploy público.

## Estado actual

Commit 07:

- estructura inicial del proyecto;
- tres páginas funcionales:
  - Inicio;
  - Proveedores;
  - Detalle de proveedor;
- fuente de datos desacoplada en `data/providers.json`;
- carga de datos mediante `fetch()`;
- renderizado dinámico de proveedores;
- estados:
  - loading;
  - success;
  - empty;
  - error;
- acción de reintento ante fallos;
- filtro dinámico por categoría;
- contador de resultados;
- página de detalle dinámica mediante query string;
- contacto funcional mediante enlaces `tel:`;
- diseño responsive para:
  - móvil;
  - tablet;
  - escritorio;
- ajustes de compatibilidad para navegadores móviles;
- fallback visual con Flexbox cuando Grid no está disponible o presenta incompatibilidades.

Todavía quedan pendientes:

- revisión específica de accesibilidad;
- pruebas de usabilidad con cinco evaluadores;
- mejoras derivadas del feedback;
- auditoría Lighthouse;
- documentación final de rendimiento;
- deploy público.


También te recomiendo agregar esta sección de ejecución en red local:

## Pruebas desde dispositivos móviles

La aplicación debe ejecutarse mediante HTTP.

Desde la raíz del proyecto:

```bash
python -m http.server 5500 --bind 0.0.0.0
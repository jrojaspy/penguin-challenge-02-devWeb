# ServiPy — Challenge 02

## Estado actual

## Estado actual

Commit 06:

- tres páginas funcionales;
- fuente de datos desacoplada;
- carga mediante `fetch()`;
- listado dinámico;
- estados loading / empty / error;
- filtro dinámico por categoría;
- contador de resultados;
- detalle dinámico del proveedor;
- manejo de proveedor inexistente;
- contacto funcional mediante `tel:`;
- documentación de pruebas de usuario.

Todavía no están completados:

- ajustes finales responsive;
- revisión de accesibilidad;
- Lighthouse;
- pruebas de usabilidad con cinco evaluadores;
- mejoras derivadas del feedback;
- deploy.

## Detalle de proveedor

Cada tarjeta enlaza a:

`detail.html?id=:id`

La página obtiene el identificador mediante `URLSearchParams`, carga la misma fuente `providers.json` y localiza el proveedor correspondiente.

El detalle muestra:

- nombre;
- categoría;
- disponibilidad;
- ubicación;
- descripción;
- rating;
- experiencia;
- contacto.

Los proveedores disponibles muestran un enlace `tel:` para iniciar una llamada desde dispositivos compatibles.
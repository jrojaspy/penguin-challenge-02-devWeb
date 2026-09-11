# ServiPy — Challenge 02

Aplicación web para encontrar proveedores de servicios locales en Asunción.

Proyecto correspondiente al Reto 02 del nivel final del curso.

## Objetivo

Construir una experiencia web clara, responsive y accesible para localizar proveedores de servicios.

## Páginas

La aplicación contiene:

1. Inicio
2. Proveedores
3. Detalle de proveedor

## Arquitectura prevista

```text
HTML
 ↓
JavaScript
 ↓
fetch()
 ↓
providers.json
 ↓
renderizado DOM

## Estado actual

Commit 02:

- estructura inicial;
- tres páginas base;
- estilos iniciales;
- fuente de datos desacoplada en `data/providers.json`;
- modelo de datos de proveedores;
- documentación de pruebas de usuario.

Todavía no están implementados:

- carga dinámica con `fetch()`;
- renderizado dinámico;
- estados loading / empty / error;
- filtros;
- detalle dinámico;
- Lighthouse;
- pruebas de usuario;
- deploy.

## Modelo de proveedor

Cada proveedor contiene:

```json
{
  "id": 1,
  "name": "Carlos Benítez",
  "category": "Plomería",
  "rating": 4.8,
  "phone": "+595981111111",
  "location": "Centro, Asunción",
  "description": "Descripción del servicio.",
  "experience": 9,
  "available": true
}

## Estado actual

Commit 03:

- estructura inicial;
- tres páginas base;
- estilos iniciales;
- fuente de datos desacoplada en `data/providers.json`;
- carga de proveedores mediante `fetch()`;
- renderizado dinámico de tarjetas;
- navegación preparada hacia detalle;
- documentación de pruebas de usuario.

Todavía no están implementados:

- estados visuales loading / empty / error;
- filtros por categoría;
- detalle dinámico;
- Lighthouse;
- pruebas de usuario;
- deploy.

## Estado actual

Commit 03:

- estructura inicial;
- tres páginas base;
- estilos iniciales;
- fuente de datos desacoplada en `data/providers.json`;
- carga de proveedores mediante `fetch()`;
- renderizado dinámico de tarjetas;
- navegación preparada hacia detalle;
- documentación de pruebas de usuario.

Todavía no están implementados:

- estados visuales loading / empty / error;
- filtros por categoría;
- detalle dinámico;
- Lighthouse;
- pruebas de usuario;
- deploy.

## Estado actual

Commit 04:

- estructura inicial;
- tres páginas base;
- fuente de datos desacoplada;
- carga mediante `fetch()`;
- renderizado dinámico de proveedores;
- estado de carga;
- estado vacío;
- estado de error;
- opción para reintentar;
- documentación de pruebas de usuario.

Todavía no están implementados:

- filtros por categoría;
- detalle dinámico;
- mejoras finales responsive;
- auditoría Lighthouse;
- pruebas con usuarios;
- deploy.

## Estados de carga

El listado de proveedores maneja cuatro estados:

### Loading

Se muestra mientras se obtiene `providers.json`.

### Success

Se muestran las tarjetas generadas dinámicamente.

### Empty

Se muestra cuando la fuente devuelve un arreglo vacío.

### Error

Se muestra cuando la petición falla o devuelve una respuesta HTTP no válida.

El estado de error incluye una acción para reintentar la carga.
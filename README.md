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
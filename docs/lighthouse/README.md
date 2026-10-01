# Evidencia Lighthouse

## Medición inicial — 1 de octubre de 2026

Las pruebas se ejecutaron sobre la versión publicada en GitHub Pages, en modo móvil y escritorio.

### Resultados

| Página | Dispositivo | Performance | Accessibility | Best Practices | SEO | CLS |
|---|---|---:|---:|---:|---:|---:|
| Inicio | Móvil | 96 | 100 | 100 | 100 | 0.129 |
| Proveedores | Móvil | 90 | 100 | 100 | 100 | 0.209 |
| Registro | Móvil | 96 | 100 | 100 | 100 | 0.129 |
| Inicio | Escritorio | 99 | 100 | 100 | 100 | 0.064 |
| Proveedores | Escritorio | 95 | 100 | 100 | 100 | 0.143 |
| Registro | Escritorio | 99 | 100 | 100 | 100 | 0.062 |

## Diagnóstico

Lighthouse identificó desplazamientos de layout. Los reportes muestran que el elemento que se desplaza en Inicio y Registro es el `<main>`, mientras que en Proveedores se desplazan el `<main>` y el footer.

La causa técnica identificada es doble:

1. **Header generado por JavaScript:** el HTML inicial contiene un `<header>` vacío. `layout.js` agrega la navegación después del primer render, aumentando la altura del header y desplazando el contenido principal.
2. **Listado dinámico de proveedores:** antes de recibir los datos el listado no reserva el mismo espacio que las 12 tarjetas finales, por lo que el footer cambia notablemente de posición.

## Mejora 1 — Reserva de espacio del layout compartido

Se agregó una altura mínima al header antes de que `layout.js` inserte la navegación:

- escritorio: 69 px;
- móvil: 107 px.

También se reservó la altura mínima del footer. Esto evita que la inserción de header/footer modifique la geometría general después del primer paint.

## Mejora 2 — Skeletons con geometría equivalente a las tarjetas

El estado de carga ahora inserta **12 skeleton cards directamente en el mismo `#provider-list`** utilizado por los proveedores reales. Cada skeleton reproduce la estructura de una tarjeta:

- cabecera;
- favorito;
- metadata;
- rating;
- disponibilidad;
- dos acciones.

El mensaje “Cargando proveedores…” permanece disponible para lectores de pantalla mediante una región visualmente oculta.

De esta forma el grid ocupa desde el inicio un espacio similar al contenido final y el footer no necesita desplazarse de forma brusca.

## Segunda medición

Después de publicar estos cambios se debe volver a ejecutar Lighthouse y completar esta tabla:

| Página | Dispositivo | Performance antes | Performance después | CLS antes | CLS después |
|---|---|---:|---:|---:|---:|
| Inicio | Móvil | 96 | — | 0.129 | — |
| Proveedores | Móvil | 90 | — | 0.209 | — |
| Registro | Móvil | 96 | — | 0.129 | — |
| Inicio | Escritorio | 99 | — | 0.064 | — |
| Proveedores | Escritorio | 95 | — | 0.143 | — |
| Registro | Escritorio | 99 | — | 0.062 | — |

> No completar las columnas “después” hasta realizar una nueva medición sobre la versión desplegada.

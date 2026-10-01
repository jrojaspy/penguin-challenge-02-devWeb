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

## Segunda medición — después de las primeras optimizaciones

Se volvió a ejecutar Lighthouse el **1 de octubre de 2026** sobre la versión desplegada.

| Página | Dispositivo | Performance antes | Performance después | CLS antes | CLS después |
|---|---|---:|---:|---:|---:|
| Inicio | Móvil | 96 | **100** | 0.129 | **0.000** |
| Proveedores | Móvil | 90 | **97** | 0.209 | **0.100** |
| Registro | Móvil | 96 | **100** | 0.129 | **0.000** |
| Inicio | Escritorio | 99 | **100** | 0.064 | **0.000** |
| Proveedores | Escritorio | 95 | **97** | 0.143 | **0.109** |
| Registro | Escritorio | 99 | **100** | 0.062 | **0.000** |

En las seis mediciones, **Accessibility, Best Practices y SEO obtuvieron 100/100**.

### Resultado medible

- El CLS de Inicio y Registro quedó completamente eliminado en móvil y escritorio.
- El CLS de Proveedores móvil bajó aproximadamente **52 %** (`0.209 → 0.100`).
- El CLS de Proveedores escritorio bajó aproximadamente **24 %** (`0.143 → 0.109`).
- Performance de Proveedores móvil mejoró **7 puntos** (`90 → 97`).
- Performance de Proveedores escritorio mejoró **2 puntos** (`95 → 97`).

## Ajuste final a partir de la segunda medición

La segunda medición mostró que el desplazamiento restante de `proveedores.html` seguía asociado principalmente al `footer` y al `#provider-list`. Se identificó una causa adicional: los skeletons se creaban con JavaScript, por lo que el HTML inicial todavía podía pintarse con el listado vacío antes de que el módulo agregara las tarjetas de carga.

Se aplicaron tres ajustes adicionales:

1. **Skeletons prerenderizados en `proveedores.html`:** las 12 tarjetas de carga existen desde el HTML inicial, antes de ejecutar JavaScript. No contienen datos de proveedores y solo reservan geometría.
2. **Alturas de skeleton adaptadas al breakpoint:** 15 rem en móvil y 17,6 rem en escritorio, aproximando la altura observada de las filas finales.
3. **Espacio reservado para el contador de resultados:** `.results-count` mantiene una altura mínima de 1,5 rem para evitar que su aparición desplace el grid.

Además, la latencia artificial por defecto se dejó en **0 ms**. Para demostrar el estado de carga durante una presentación se puede usar, por ejemplo, `?delay=900`.

> Después de publicar este último ajuste conviene ejecutar una tercera medición de `proveedores.html` en móvil y escritorio para comprobar si el CLS baja de forma estable por debajo de 0,1. La evidencia obligatoria del challenge ya queda cubierta por las dos mediciones anteriores y sus mejoras reales.

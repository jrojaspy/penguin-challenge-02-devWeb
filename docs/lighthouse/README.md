# Evidencia Lighthouse

> **Pendiente de completar por ti** sobre el sitio ya desplegado (no en localhost).

## Cómo medir
1. Abre la URL pública en ventana de incógnito (sin extensiones).
2. DevTools → pestaña Lighthouse → modo *Mobile* → todas las categorías → *Analyze page load*.
3. Repite 3 veces por página y anota la mediana.
4. Guarda capturas en esta carpeta: `antes-*.png` y `despues-*.png`.

## Línea base y resultado
| Página | Momento | Perf | A11y | BP | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| Inicio | antes | | | | | | |
| Inicio | después | | | | | | |
| Proveedores | antes | | | | | | |
| Proveedores | después | | | | | | |
| Detalle | antes | | | | | | |
| Detalle | después | | | | | | |

> Para medir rendimiento real usa `?delay=0`: la latencia de 900 ms de `api.js` es simulada y penaliza LCP.

## Mejoras candidatas ya presentes en el código
Mídelas quitando/volviendo a poner cada una para tener un "antes" honesto:
1. Favicon SVG (evita el 404 de `/favicon.ico` en consola, mejora Best Practices).
2. `meta description` y `theme-color` por página (SEO).
3. Sin fuentes web ni dependencias externas: fuentes del sistema (menos peticiones, mejor LCP).
4. Contraste AA en modo claro y oscuro; nombres accesibles en botones (`aria-label`).
5. Layout estable con skeleton de carga (menor CLS).

## Mejoras aplicadas (rellenar)
1. 
2. 

## Resultados Lighthouse

Las auditorías fueron ejecutadas sobre la versión pública de GitHub Pages utilizando Lighthouse 13.4.1, emulación Moto G Power y limitación de red 4G lenta.

### Página de inicio

| Categoría | Resultado |
|---|---:|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Métricas principales:

| Métrica | Resultado |
|---|---:|
| FCP | 0.8 s |
| LCP | 0.8 s |
| TBT | 0 ms |
| CLS | 0 |
| Speed Index | 0.8 s |

### Proveedores

| Categoría | Resultado |
|---|---:|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Métricas principales:

| Métrica | Resultado |
|---|---:|
| FCP | 0.8 s |
| LCP | 0.8 s |
| TBT | 0 ms |
| CLS | 0.005 |
| Speed Index | 0.8 s |

### Detalle del proveedor

| Categoría | Resultado |
|---|---:|
| Performance | 89 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Métricas principales:

| Métrica | Resultado |
|---|---:|
| FCP | 0.8 s |
| LCP | 0.8 s |
| TBT | 0 ms |
| CLS | 0.217 |
| Speed Index | 0.8 s |

El principal problema detectado en la página de detalle fue el desplazamiento acumulado de diseño (CLS).

Lighthouse identificó el footer como principal causante del desplazamiento porque el contenido del proveedor se inserta dinámicamente después de la carga inicial.

Para reducir este movimiento se reservó espacio para el contenido dinámico mediante `.detail-shell` y se estabilizó el layout vertical utilizando Flexbox.
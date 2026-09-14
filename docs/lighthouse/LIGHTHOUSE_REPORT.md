## Resultados finales

Las auditorías fueron realizadas sobre la aplicación publicada
en GitHub Pages mediante Lighthouse 13.4.1.

Configuración:

- dispositivo emulado: Moto G Power;
- navegación móvil;
- carga inicial;
- red 4G lenta;
- Lighthouse 13.4.1.

### Resultados

| Página | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Inicio | 100 | 100 | 100 | 100 |
| Proveedores | 100 | 100 | 100 | 100 |
| Detalle | 100 | 100 | 100 | 100 |

### Métricas principales

| Página | FCP | LCP | TBT | CLS | Speed Index |
|---|---:|---:|---:|---:|---:|
| Inicio | 0.8 s | 0.8 s | 0 ms | 0 | 0.8 s |
| Proveedores | 0.8 s | 0.8 s | 0 ms | 0.003 | 0.8 s |
| Detalle | 0.8 s | 0.8 s | 0 ms | 0 | 0.8 s |

## Mejora comprobada

La primera auditoría de la página de detalle detectó un
Cumulative Layout Shift de 0.217 y una puntuación de
Performance de 89.

El análisis identificó el desplazamiento del footer durante
la carga dinámica de los datos del proveedor.

Para solucionarlo se aplicaron:

- reserva de espacio para el contenido dinámico;
- layout vertical estable mediante Flexbox;
- expansión del elemento `main`;
- estabilización de la sección de detalle.

Después de la modificación:

- Performance pasó de 89 a 100;
- CLS pasó de 0.217 a 0;
- Accessibility se mantuvo en 100;
- Best Practices se mantuvo en 100;
- SEO se mantuvo en 100.

La mejora fue validada nuevamente sobre la aplicación
publicada.
## Lighthouse

La aplicación se evalúa mediante Lighthouse en modo móvil.

Las categorías revisadas son:

- Performance;
- Accessibility;
- Best Practices;
- SEO.

Las optimizaciones implementadas incluyen:

- renderizado diferido de componentes fuera del viewport;
- reducción del procesamiento durante búsquedas;
- reserva de espacio durante carga para reducir cambios visuales;
- uso de JavaScript con `defer`;
- ausencia de frameworks y dependencias externas pesadas.

Los resultados se documentan en:

`docs/lighthouse/LIGHTHOUSE_REPORT.md`

Las puntuaciones se registran únicamente después de ejecutar la auditoría real.

## Estado actual

Commit 11:

- tres páginas funcionales;
- datos desacoplados;
- búsqueda y filtrado;
- contacto telefónico y WhatsApp;
- responsive;
- accesibilidad;
- evaluación UX simulada;
- optimizaciones de rendimiento;
- documentación Lighthouse.

Pendiente:

- completar resultados reales de Lighthouse;
- pruebas formales con cinco usuarios reales;
- documentación final de entrega.
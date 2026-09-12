## Reto 02 — ServiPy

Commit 08:

`fix: improve keyboard navigation and accessibility`

## Objetivo

Mejorar la accesibilidad de la aplicación antes de realizar pruebas de usabilidad y auditorías Lighthouse.

## Navegación por teclado

- [x] Navegación principal mediante Tab.
- [x] Filtro accesible mediante teclado.
- [x] Botones accesibles mediante Enter.
- [x] Enlaces accesibles mediante teclado.
- [x] Acción de contacto accesible.
- [x] Acción de reintento accesible.
- [x] No se utiliza tabindex positivo.

## Skip link

Las páginas incluyen un enlace:

`Saltar al contenido principal`

Este enlace aparece al recibir foco y permite evitar la navegación repetitiva.

## Foco visible

Los elementos interactivos tienen un indicador visible de foco.

Se incluyen reglas para `:focus` y `:focus-visible`.

## Navegación actual

Se utiliza:

`aria-current="page"`

para indicar la página activa en la navegación principal.

## Formularios

El selector de categoría cuenta con:

- label visible;
- texto de ayuda;
- asociación mediante `for`;
- `aria-describedby`.

## Estados dinámicos

Se utilizan regiones:

`aria-live="polite"`

para comunicar:

- cantidad de resultados;
- carga;
- estado vacío;
- errores.

Los contenedores de contenido dinámico utilizan:

`aria-busy`

durante la carga.

## Proveedores

Cada tarjeta presenta:

- nombre;
- categoría;
- disponibilidad textual;
- rating accesible;
- acción identificable por proveedor.

La disponibilidad no depende solamente del color.

## Detalle

El detalle incluye:

- jerarquía de encabezados;
- información estructurada mediante `dl`, `dt` y `dd`;
- estado textual;
- contacto mediante enlace semántico `tel:`.

## Contraste

Se aumentó el contraste del texto secundario mediante:

`--muted: #475569`

## Movimiento

Se respeta:

`prefers-reduced-motion`

para usuarios que soliciten reducir animaciones.

## Responsive

Las mejoras de accesibilidad se verifican en:

- móvil;
- tablet;
- escritorio.

## Pendiente

La verificación automática mediante Lighthouse corresponde a un commit posterior.

Las pruebas con evaluadores también se documentarán por separado.

## Accesibilidad

La aplicación incorpora medidas básicas de accesibilidad:

- navegación completa mediante teclado;
- enlace "Saltar al contenido principal";
- indicadores visibles de foco;
- labels asociados a controles;
- regiones `aria-live` para estados dinámicos;
- uso de `aria-busy` durante cargas;
- `aria-current` para navegación activa;
- mensajes de disponibilidad que no dependen únicamente del color;
- enlaces de contacto semánticos mediante `tel:`;
- contraste reforzado en texto secundario;
- soporte para `prefers-reduced-motion`.

La revisión manual se documenta en:

`docs/accessibility/ACCESSIBILITY_CHECKLIST.md`

La auditoría Lighthouse se realizará en una etapa posterior.

## Estado actual

Commit 08:

- tres páginas funcionales;
- datos desacoplados;
- fetch y estados de carga;
- filtros;
- detalle funcional;
- diseño responsive;
- compatibilidad móvil;
- navegación por teclado;
- mejoras de accesibilidad;
- documentación de accesibilidad.

Pendiente:

- pruebas con cinco evaluadores;
- implementación de feedback;
- Lighthouse;
- deploy.
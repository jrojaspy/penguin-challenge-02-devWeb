# Accessibility Checklist

## Reto 02 — ServiPy

Commit:

`fix: improve keyboard navigation and accessibility`

## Objetivo

Mejorar la accesibilidad de ServiPy antes de las pruebas de usabilidad y de la auditoría Lighthouse.

## Navegación mediante teclado

- [x] Navegación principal accesible mediante Tab.
- [x] Selector de categoría accesible mediante teclado.
- [x] Botones accesibles mediante teclado.
- [x] Enlaces accesibles mediante teclado.
- [x] Acción de contacto accesible.
- [x] Acción de reintento accesible.
- [x] No se utiliza `tabindex` positivo.

## Enlace para saltar navegación

Las tres páginas incluyen:

`Saltar al contenido principal`

El enlace permanece fuera de la vista hasta recibir foco mediante teclado.

Permite saltar directamente al elemento:

`main-content`

## Foco visible

Los controles interactivos presentan un indicador de foco visible.

Se incluyen reglas compatibles con:

- `:focus`;
- `:focus-visible`.

## Página activa

La navegación utiliza:

`aria-current="page"`

para indicar la página actualmente seleccionada.

## Formulario de filtrado

El selector de categoría dispone de:

- label visible;
- asociación mediante `for`;
- texto descriptivo;
- `aria-describedby`.

## Estados dinámicos

Se utilizan regiones con:

`aria-live="polite"`

para comunicar cambios dinámicos.

El contador de resultados utiliza:

`role="status"`

y:

`aria-atomic="true"`

## Estado de carga

Los contenedores dinámicos utilizan:

`aria-busy="true"`

durante las operaciones de carga.

Cuando finaliza la operación cambia a:

`aria-busy="false"`

## Tarjetas de proveedor

Cada tarjeta contiene:

- nombre;
- categoría;
- ubicación;
- descripción;
- disponibilidad;
- calificación;
- experiencia;
- acción de detalle.

Cada `article` queda asociado a su nombre mediante:

`aria-labelledby`

## Disponibilidad

La disponibilidad no se comunica únicamente mediante colores.

Se utilizan también los textos:

- Disponible;
- No disponible.

## Calificación

La estrella visual dispone de una descripción accesible.

Ejemplo:

`Calificación 4.8 de 5`

## Acciones

La acción genérica:

`Ver detalle`

incluye información del proveedor mediante `aria-label`.

Ejemplo:

`Ver detalle de Carlos Benítez`

## Página de detalle

La página utiliza:

- `h1` para el proveedor;
- `h2` para las secciones;
- `dl`;
- `dt`;
- `dd`.

La información del proveedor queda estructurada semánticamente.

## Contacto

La acción de llamada utiliza:

`tel:`

y una etiqueta descriptiva.

Ejemplo:

`Llamar a Carlos Benítez`

## Contraste

El texto secundario utiliza:

`#475569`

para aumentar el contraste respecto de la versión anterior.

## Movimiento

La interfaz respeta:

`prefers-reduced-motion`

reduciendo animaciones y transiciones cuando el sistema lo solicita.

## Responsive y accesibilidad

Las mejoras deben verificarse en:

- móvil;
- tablet;
- escritorio.

## Prueba manual de teclado

Recorrido esperado en Inicio:

`Tab → Saltar al contenido → navegación → CTA`

Recorrido esperado en Proveedores:

`Tab → Saltar al contenido → navegación → filtro → acciones de las tarjetas`

Recorrido esperado en Detalle:

`Tab → Saltar al contenido → navegación → Volver → Llamar`

## Pendiente

La auditoría Lighthouse se realizará en un commit posterior.

Las pruebas de usabilidad con cinco evaluadores se documentarán por separado.
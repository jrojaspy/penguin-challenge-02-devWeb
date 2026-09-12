# Simulated Usability Review

## ServiPy — Reto 02

## Tipo de evaluación

Evaluación simulada mediante cinco perfiles de usuario.

Estos resultados no corresponden a cinco personas reales.

La simulación se utiliza únicamente como herramienta previa de análisis UX y no sustituye las cinco pruebas con usuarios reales exigidas para la entrega.

## Escenario

> Necesitas encontrar un plomero en Asunción. Utiliza la aplicación para encontrar un proveedor, revisar su información y determinar cómo contactarlo.

## Perfil 1

### Tipo

Usuario con experiencia digital habitual.

### Dificultad simulada

2/5

### Comentario simulado

> "El filtro funciona, pero buscaría directamente el nombre o servicio."

### Problema observado

El listado permite filtrar por categoría, pero no realizar una búsqueda directa.

### Cambio propuesto

Agregar búsqueda textual.

### Cambio aplicado

Sí.

---

## Perfil 2

### Tipo

Usuario con poca experiencia web.

### Dificultad simulada

2/5

### Comentario simulado

> "Entendí el filtro, pero después no sabía cómo volver a ver todos."

### Problema observado

La opción "Todas las categorías" existe, pero la acción de restablecer el estado puede no resultar suficientemente explícita.

### Cambio propuesto

Agregar un botón "Limpiar filtros".

### Cambio aplicado

Sí.

---

## Perfil 3

### Tipo

Usuario que utiliza principalmente dispositivos móviles.

### Dificultad simulada

1/5

### Comentario simulado

> "En el teléfono está cómodo, pero prefiero buscar escribiendo."

### Problema observado

El selector puede resultar lento si el número de categorías aumenta.

### Cambio propuesto

Agregar búsqueda textual responsive.

### Cambio aplicado

Sí.

---

## Perfil 4

### Tipo

Usuario orientado a contacto rápido.

### Dificultad simulada

2/5

### Comentario simulado

> "Yo normalmente escribiría por WhatsApp antes de llamar."

### Problema observado

El perfil solo ofrece contacto telefónico.

### Cambio propuesto

Agregar una segunda vía de contacto mediante WhatsApp.

### Cambio aplicado

Sí.

---

## Perfil 5

### Tipo

Usuario enfocado en claridad del lenguaje.

### Dificultad simulada

2/5

### Comentario simulado

> "Ver perfil me resulta más claro que Ver detalle."

### Problema observado

El texto "Ver detalle" puede resultar menos natural que "Ver perfil".

### Cambio propuesto

Cambiar el CTA principal.

### Cambio aplicado

Sí.

---

## Patrones simulados

Los principales patrones identificados fueron:

- preferencia por búsqueda directa;
- necesidad de una acción explícita para restablecer filtros;
- preferencia por contacto mediante mensajería;
- conveniencia de utilizar lenguaje más natural en las acciones.

## Mejoras implementadas

Se implementaron:

- búsqueda por nombre;
- búsqueda por categoría;
- búsqueda por ubicación;
- búsqueda por descripción;
- normalización de términos con y sin acentos;
- botón "Limpiar filtros";
- cambio de "Ver detalle" por "Ver perfil";
- contacto mediante WhatsApp;
- adaptación responsive de los nuevos controles.

## Limitación

Esta evaluación es simulada.

La validación formal del reto requiere cinco participantes reales.

Los resultados de dichas sesiones deben registrarse separadamente en:

`docs/user-testing/TEST_RESULTS.md`

y:

`docs/user-testing/sessions/`
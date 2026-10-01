# Pruebas de usabilidad

## Objetivo

Evaluar si los usuarios pueden utilizar las funciones principales de **Servicios Asunción** de forma clara y sin asistencia.

Las pruebas se realizaron el **30 de septiembre de 2026** con cinco participantes y distintos dispositivos/contextos.

## Tareas utilizadas

| Código | Tarea |
|---|---|
| T1 | Encontrar ayuda para una cañería rota. |
| T3 | Contactar a un proveedor. |
| T4 | Buscar un servicio inexistente, por ejemplo “astronauta”. |
| T6 | Con la red apagada, intentar cargar la lista (`?fail`). |

## Resultados por participante

| Participante / contexto | Tarea | Dificultad | Facilidad | Comentario textual | Cambio aplicado |
|---|---|---|---:|---|---|
| P1 — Computadora | T3 — Contactar a un proveedor | Sí, sin dificultad | 6/7 | “La interfaz”. Recomienda “colores un poco más obscuros”. | Se oscureció la paleta principal y se aumentó la diferenciación entre fondo, tarjetas y controles. |
| P2 — Móvil | T6 — Simular fallo de carga con `?fail` | Sí, pero con dificultad | 4/7 | “Nada”. Ante la recomendación de cambio respondió “Sí”. | Se hizo más explícito el mensaje de error y se reforzó visualmente el botón **Reintentar**. |
| P3 — Lucky, computadora | T1 — Encontrar ayuda para una cañería rota | Sí, sin dificultad | 7/7 | “mejor vista para el usuario.” Recomienda “diferencia de colores.” | Se aumentó el contraste visual entre superficie, fondo, bordes y acciones. |
| P4 — Guille | T3 — Contactar a un proveedor | Sí, pero con dificultad | 4/7 | “La investigación”. Recomienda “Más intuitiva”. | Se dio mayor jerarquía al CTA de contacto, cambiando el texto a **Llamar ahora** y reforzando su presencia visual. |
| P5 — leonshy | T4 — Buscar un servicio inexistente, como “astronauta” | Sí, pero con dificultad | 6/7 | “las risas no faltaron”; “no se pueden solicitar servicios desde cabo cañaveral”. | Se mejoró el estado sin resultados: muestra el término buscado y ofrece **Limpiar filtros**. |

## Métricas

Puntuaciones de facilidad: **6/7, 4/7, 7/7, 4/7 y 6/7**.

**Promedio: 5,4 / 7 (77,1 %).**

- Sin dificultad: **2 de 5 (40 %)**
- Con alguna dificultad: **3 de 5 (60 %)**
- No completaron la tarea: **0 de 5 (0 %)**

## Hallazgos

### 1. Contraste y diferenciación visual
Dos participantes solicitaron explícitamente colores más oscuros o una mayor diferencia entre colores. Se priorizó este punto porque se repitió en más de una prueba.

### 2. Acción de contacto
Dos participantes realizaron la tarea T3. Uno obtuvo 6/7 y otro 4/7. La acción existía, pero se detectó una oportunidad para mejorar su descubribilidad.

### 3. Recuperación ante errores
La prueba móvil del estado de error obtuvo 4/7. El sistema ya ofrecía reintento, pero el mensaje podía explicar mejor qué ocurrió y cuál es el siguiente paso.

### 4. Estado sin resultados
La búsqueda inexistente se completó correctamente, pero se mejoró el estado vacío para que el usuario tenga una acción directa de recuperación.

## Mejora priorizada

**Aumentar el contraste visual y reforzar la jerarquía de las acciones principales.**

Cambios aplicados:

1. paleta principal más oscura;
2. mayor contraste entre fondo y tarjetas;
3. borde de tarjeta más visible;
4. CTA **Llamar ahora** con mayor jerarquía;
5. estado de error más descriptivo;
6. botón **Reintentar** más evidente;
7. estado sin resultados con el término buscado;
8. botón **Limpiar filtros** como acción de recuperación.

## Conclusión

Todos los participantes lograron completar sus tareas. Las principales oportunidades de mejora estuvieron relacionadas con claridad visual, descubribilidad de acciones y recuperación ante estados de error o ausencia de resultados.

Las mejoras anteriores fueron implementadas directamente en la interfaz y se registran también en `CHANGELOG.md`.

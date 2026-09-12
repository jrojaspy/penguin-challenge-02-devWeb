# Lighthouse Report

## ServiPy — Reto 02

Commit:

`perf: apply lighthouse improvements`

## Objetivo

Evaluar la aplicación mediante Lighthouse e implementar mejoras reales de rendimiento y accesibilidad.

## URL evaluada

`https://jrojaspy.github.io/penguin-challenge-02-devWeb/`

## Configuración

- Lighthouse
- Navigation
- Mobile
- Performance
- Accessibility
- Best Practices
- SEO

---

## Auditoría inicial

### Inicio

| Categoría | Resultado |
|---|---:|
| Performance | Pendiente |
| Accessibility | Pendiente |
| Best Practices | Pendiente |
| SEO | Pendiente |

### Proveedores

URL:

`/providers.html`

| Categoría | Resultado |
|---|---:|
| Performance | Pendiente |
| Accessibility | Pendiente |
| Best Practices | Pendiente |
| SEO | Pendiente |

### Detalle

URL:

`/detail.html?id=1`

| Categoría | Resultado |
|---|---:|
| Performance | Pendiente |
| Accessibility | Pendiente |
| Best Practices | Pendiente |
| SEO | Pendiente |

---

## Mejoras aplicadas

### 1. Renderizado diferido

Se incorporó:

`content-visibility: auto`

en componentes que pueden encontrarse fuera del viewport.

Objetivo:

Reducir trabajo inicial de renderizado.

Fallback:

Los navegadores que no soportan esta propiedad continúan mostrando el contenido normalmente.

### 2. Optimización del filtrado

El texto normalizado utilizado para búsquedas ahora se calcula una vez durante la carga de proveedores.

Antes:

Cada pulsación reconstruía y normalizaba nombre, categoría, ubicación y descripción.

Después:

Cada proveedor almacena previamente un texto de búsqueda normalizado.

Objetivo:

Reducir procesamiento durante la interacción.

### 3. Reducción de cambios visuales

El listado reserva espacio durante la carga para reducir movimientos de contenido.

### 4. Scripts no bloqueantes

Los scripts mantienen el atributo:

`defer`

para no bloquear el parseo inicial del HTML.

---

## Auditoría posterior

### Inicio

| Categoría | Resultado |
|---|---:|
| Performance | Pendiente |
| Accessibility | Pendiente |
| Best Practices | Pendiente |
| SEO | Pendiente |

### Proveedores

| Categoría | Resultado |
|---|---:|
| Performance | Pendiente |
| Accessibility | Pendiente |
| Best Practices | Pendiente |
| SEO | Pendiente |

### Detalle

| Categoría | Resultado |
|---|---:|
| Performance | Pendiente |
| Accessibility | Pendiente |
| Best Practices | Pendiente |
| SEO | Pendiente |

---

## Evidencia

Los valores de este documento deben completarse únicamente con resultados obtenidos mediante Lighthouse.

No se utilizan puntuaciones simuladas.
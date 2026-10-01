# 🛠️ Servicios Asunción

App web para encontrar y calificar proveedores de servicios locales en Asunción. Proyecto del challenge CodePRO *La Batalla Final de la App de Servicios*.

🔗 **Sitio desplegado:** _pega aquí tu URL pública_
📦 **Repositorio:** _pega aquí tu URL de GitHub_

## Características
- **4 páginas:** Inicio, Proveedores, Detalle de proveedor y Registro de proveedores.
- **Datos desacoplados:** `data/providers.json` consumido con `fetch` a través de `js/api.js`. Nada de datos en el HTML.
- **Tres estados** en el listado: cargando (con skeleton), sin resultados y error con "Reintentar".
- **Extras:** búsqueda, filtro por categoría, orden, filtros en la URL (compartibles), favoritos, botón `tel:`, enlace a Google Maps, compartir, registro con anti-spam, modo oscuro, microinteracciones que respetan `prefers-reduced-motion`.
- **Accesible:** HTML semántico, skip link, foco visible, teclado, labels, `aria-live`/`role`, contraste AA.
- **Seguro:** el contenido se inserta con `textContent`; sin `innerHTML`.

## Stack
HTML5 · CSS (variables + BEM, una sola estrategia) · JavaScript ES Modules · sin dependencias en producción.

## Cómo ejecutar
`fetch` y los módulos ES **no funcionan con `file://`**; usa un servidor local:
```bash
git clone <tu-repo> && cd app-servicios
npm start            # http://localhost:3000  (o: python3 -m http.server 3000)
npm install && npm test   # opcional: ejecuta las pruebas (Node 20+)
```

### Parámetros de prueba (en la URL de `proveedores.html` o `detalle.html`)
| Parámetro | Efecto |
|---|---|
| `?fail` | Fuerza el estado de **error** |
| `?empty` | Fuerza el estado **sin resultados** |
| `?delay=0` | Quita la latencia simulada (900 ms por defecto) |

## Cómo desplegar
**Netlify:** *Add new site → Import from Git*, build command vacío, publish directory `.`
**GitHub Pages:** *Settings → Pages → Source: GitHub Actions*. El workflow `.github/workflows/pages.yml` corre los tests y publica en cada push a `main`.
Las rutas son relativas, así que funciona tanto en la raíz como en `usuario.github.io/repo/`.

## Estructura
```
index.html · proveedores.html · detalle.html · registro.html
css/   base.css (tokens, reset) · components.css · pages.css
js/    api.js (datos) · ui.js (DOM y estados) · card.js · filters.js (lógica pura)
       favorites.js · storage.js · layout.js · proveedores.js · detalle.js · registro.js
data/  providers.json
scripts/ pruebas (node --test + jsdom)
docs/  requisitos · pruebas de usabilidad · Lighthouse
```

## Decisiones técnicas
- **CSS con variables + BEM** en vez de Tailwind: control total y fundamentos; una sola estrategia en todo el proyecto.
- **Capa `api.js`**: la UI nunca llama a `fetch`; migrar a una API real solo toca ese archivo.
- **Lógica pura en `filters.js`** separada del DOM para poder probarla.
- **Header/footer inyectados por `layout.js`** para mantener la navegación en un solo lugar.
- **Registro local:** los proveedores registrados viven en `localStorage` (demo). Una API real sería el siguiente paso.

## Evidencia Lighthouse
Ver [docs/lighthouse/README.md](docs/lighthouse/README.md) — **pendiente de medir sobre el sitio desplegado**.

## Pruebas de usabilidad
Ver [docs/pruebas-usabilidad.md](docs/pruebas-usabilidad.md) y [CHANGELOG.md](CHANGELOG.md) — **pendiente de ejecutar con 5 personas**.

## Próximos pasos
API real (Supabase/Firebase), reseñas por proveedor, login, mapa embebido.

// Utilidades de DOM seguras: el texto siempre se inserta con textContent (nunca como HTML).
export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

export const clear = (node) => node.replaceChildren();

// ---- Calificación ----
export const stars = (rating) => {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return "★".repeat(full) + "☆".repeat(5 - full);
};

// Las estrellas son decorativas; el dato real va en texto para lectores de pantalla.
export function ratingEl(p) {
  const hasReviews = p.resenas > 0;
  const box = el("p", "rating");
  box.append(el("span", "visually-hidden",
    hasReviews ? `Calificación ${p.rating.toFixed(1)} de 5, ${p.resenas} reseñas` : "Nuevo, aún sin reseñas"));
  const visual = el("span", "rating__stars", hasReviews ? stars(p.rating) : "☆☆☆☆☆");
  const value = el("span", "rating__value", hasReviews ? `${p.rating.toFixed(1)} (${p.resenas})` : "Nuevo");
  visual.setAttribute("aria-hidden", "true");
  value.setAttribute("aria-hidden", "true");
  box.append(visual, value);
  return box;
}

// Solo dígitos y "+": evita inyectar cualquier otra cosa en el href.
export const telHref = (tel) => `tel:${String(tel).replace(/[^\d+]/g, "")}`;

// ---- Estados de la interfaz ----
function createState({ icon, title, text, role, actionLabel, onAction, actionHref }) {
  const box = el("div", "state");
  box.setAttribute("role", role);
  const iconEl = el("div", "state__icon", icon);
  iconEl.setAttribute("aria-hidden", "true");
  box.append(iconEl, el("h2", "state__title", title), el("p", null, text));
  if (actionLabel) {
    const action = el(actionHref ? "a" : "button", "btn btn--primary", actionLabel);
    if (actionHref) action.href = actionHref;
    else { action.type = "button"; action.addEventListener("click", onAction); }
    box.append(action);
  }
  return box;
}

export function loadingState(skeletonCount = 0) {
  const wrap = el("div");
  wrap.append(createState({ icon: "⏳", title: "Cargando proveedores…", text: "Esto tomará un momento.", role: "status" }));
  if (skeletonCount > 0) {
    const grid = el("ul", "grid skeleton-grid");
    grid.setAttribute("aria-hidden", "true");
    for (let i = 0; i < skeletonCount; i++) {
      const card = el("li", "card");
      card.append(el("span", "skeleton skeleton--title"), el("span", "skeleton"), el("span", "skeleton skeleton--short"));
      grid.append(card);
    }
    wrap.append(grid);
  }
  return wrap;
}

export const emptyState = (text = "Prueba con otra búsqueda o categoría.", onClear) =>
  createState({
    icon: "🔍", title: "Sin resultados", text, role: "status",
    actionLabel: onClear ? "Limpiar filtros" : undefined,
    onAction: onClear,
  });

export const errorState = (onRetry) =>
  createState({
    icon: "⚠️", title: "No pudimos cargar los proveedores",
    text: "Comprueba tu conexión a internet y vuelve a intentarlo. Si el problema continúa, espera unos segundos antes de reintentar.",
    role: "alert", actionLabel: "Reintentar", onAction: onRetry,
  });

export const notFoundState = () =>
  createState({
    icon: "🧭", title: "Proveedor no encontrado",
    text: "El enlace puede estar roto o el proveedor ya no está disponible.",
    role: "status", actionLabel: "Ver todos los proveedores", actionHref: "./proveedores.html",
  });

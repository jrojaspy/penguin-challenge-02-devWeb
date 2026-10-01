import { el, ratingEl, telHref } from "./ui.js";
import { isFavorite, toggleFavorite } from "./favorites.js";

const SELECTED_PROVIDER_KEY = "proveedor-seleccionado-v1";

function rememberSelectedProvider(provider) {
  try {
    sessionStorage.setItem(SELECTED_PROVIDER_KEY, JSON.stringify(provider));
  } catch {
    // Si sessionStorage no está disponible, el ID de la URL sigue siendo suficiente.
  }
}

export function createCard(provider, { onFavoriteChange } = {}) {
  const li = el("li", "card");

  const head = el("div", "card__head");
  head.append(el("h2", "card__title", provider.nombre));
  head.append(favoriteButton(provider, onFavoriteChange));

  const meta = el("p", "card__meta");
  meta.append(
    el("span", "badge", provider.categoria),
    ` ${provider.zona}`,
  );

  const actions = el("div", "card__actions");

  // Feedback de usabilidad: la acción de contacto debe ser la más fácil de identificar.
  const call = el("a", "btn btn--primary card__call", "Llamar ahora");
  call.href = telHref(provider.telefono);
  call.setAttribute("aria-label", `Llamar ahora a ${provider.nombre}`);

  const detail = el("a", "btn btn--secondary", "Ver detalle");
  const providerId = String(provider.id ?? "").trim();
  detail.href = `./detalle.html?id=${encodeURIComponent(providerId)}`;
  detail.setAttribute("aria-label", `Ver detalle de ${provider.nombre}`);

  // Respaldo para navegadores/despliegues donde la query pudiera perderse
  // o donde exista una versión cacheada del origen de datos.
  detail.addEventListener("click", () => rememberSelectedProvider(provider));

  actions.append(call, detail);

  li.append(head, meta, ratingEl(provider));

  if (!provider.disponible) {
    const note = el("p");
    note.append(el("span", "badge badge--off", "No disponible"));
    li.append(note);
  }

  li.append(actions);
  return li;
}

function favoriteButton(provider, onChange) {
  const btn = el("button", "fav");
  btn.type = "button";

  const paint = (on) => {
    btn.textContent = on ? "♥" : "♡";
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute(
      "aria-label",
      `${on ? "Quitar" : "Guardar"} a ${provider.nombre} ${on ? "de" : "en"} favoritos`,
    );
  };

  paint(isFavorite(provider.id));

  btn.addEventListener("click", () => {
    paint(toggleFavorite(provider.id));
    onChange?.();
  });

  return btn;
}

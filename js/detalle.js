import { findProviderById, getProviders, normalizeProviderId } from "./api.js";
import {
  clear,
  el,
  ratingEl,
  telHref,
  loadingState,
  errorState,
  notFoundState,
} from "./ui.js";
import { createCard } from "./card.js";

const SELECTED_PROVIDER_KEY = "proveedor-seleccionado-v1";
const $ = (id) => document.getElementById(id);
const region = $("state-region");
const article = $("provider-detail");
const related = $("related");

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(() => {
    toast.hidden = true;
  }, 2500);
}

async function share() {
  try {
    if (navigator.share) {
      await navigator.share({
        title: document.title,
        url: location.href,
      });
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(location.href);
      showToast("Enlace copiado");
      return;
    }

    showToast("Copia la dirección desde la barra del navegador");
  } catch {
    // El usuario canceló o el navegador no permite compartir/copiar.
  }
}

function isProviderLike(value) {
  return Boolean(
    value &&
    typeof value === "object" &&
    normalizeProviderId(value.id) &&
    typeof value.nombre === "string" &&
    typeof value.categoria === "string" &&
    typeof value.zona === "string" &&
    typeof value.telefono === "string" &&
    typeof value.descripcion === "string"
  );
}

function getRememberedProvider() {
  try {
    const raw = sessionStorage.getItem(SELECTED_PROVIDER_KEY);
    if (!raw) return null;
    const provider = JSON.parse(raw);
    return isProviderLike(provider) ? provider : null;
  } catch {
    return null;
  }
}

function fill(provider) {
  document.title = `${provider.nombre} | Servicios Asunción`;
  $("detail-name").textContent = provider.nombre;

  const meta = $("detail-meta");
  meta.replaceChildren(
    el("span", "badge", provider.categoria),
    ` ${provider.zona}`,
  );

  $("detail-rating").replaceChildren(ratingEl(provider));
  $("detail-status").textContent = provider.disponible
    ? "✅ Disponible"
    : "⏸ No disponible por el momento";
  $("detail-description").textContent = provider.descripcion;

  const call = $("detail-call");
  call.href = telHref(provider.telefono);
  call.setAttribute("aria-label", `Llamar a ${provider.nombre}`);

  const query = encodeURIComponent(`${provider.zona}, Paraguay`);
  $("detail-map").href = `https://www.google.com/maps/search/?api=1&query=${query}`;

  article.hidden = false;
}

function fillRelated(current, all) {
  const currentId = normalizeProviderId(current.id);

  const others = all
    .filter(
      (provider) =>
        provider.categoria === current.categoria &&
        normalizeProviderId(provider.id) !== currentId,
    )
    .sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0))
    .slice(0, 3);

  const listEl = $("related-list");
  clear(listEl);

  if (others.length === 0) {
    related.hidden = true;
    return;
  }

  listEl.append(...others.map(createCard));
  related.hidden = false;
}

function getRequestedProviderId() {
  const params = new URLSearchParams(location.search);
  return normalizeProviderId(params.get("id"));
}

function resolveProvider(all, requestedId, remembered) {
  // 1. Fuente principal: ID de la URL contra los datos cargados.
  const byId = findProviderById(all, requestedId);
  if (byId) return byId;

  // 2. Respaldo: proveedor guardado al pulsar "Ver detalle".
  if (remembered) {
    const rememberedId = normalizeProviderId(remembered.id);

    // Si hay ID en la URL, el respaldo solo se usa si corresponde al mismo proveedor.
    if (!requestedId || rememberedId === requestedId) {
      // Preferimos la versión actual de la colección si existe.
      return findProviderById(all, rememberedId) ?? remembered;
    }
  }

  return null;
}

async function init() {
  clear(region);
  article.hidden = true;
  related.hidden = true;

  const requestedId = getRequestedProviderId();
  const remembered = getRememberedProvider();

  // Si no hay ID pero venimos desde una tarjeta, todavía podemos recuperar el perfil.
  if (!requestedId && !remembered) {
    region.append(notFoundState());
    return;
  }

  region.append(loadingState());

  try {
    const all = await getProviders();
    const provider = resolveProvider(all, requestedId, remembered);

    clear(region);

    if (!provider) {
      region.append(notFoundState());
      return;
    }

    fill(provider);
    fillRelated(provider, all);
  } catch (error) {
    console.error("Error al cargar el detalle del proveedor:", error);

    // Si la red falla pero tenemos la tarjeta seleccionada, todavía mostramos
    // el perfil en lugar de degradar a "Proveedor no encontrado".
    if (remembered) {
      clear(region);
      fill(remembered);
      fillRelated(remembered, []);
      return;
    }

    clear(region);
    region.append(errorState(init));
  }
}

$("share").addEventListener("click", share);
init();

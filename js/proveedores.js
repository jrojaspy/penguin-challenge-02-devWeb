import { getProviders } from "./api.js";
import { clear, loadingState, loadingCards, emptyState, errorState } from "./ui.js";
import { createCard } from "./card.js";
import { filterProviders, sortProviders } from "./filters.js";
import { getFavorites } from "./favorites.js";

const $ = (id) => document.getElementById(id);
const list = $("provider-list");
const region = $("state-region");
const count = $("results-count");
const form = $("filters");
const searchInput = $("search");
const categorySelect = $("category");
const sortSelect = $("sort");
const favOnly = $("fav-only");
const resetBtn = $("reset");

const DEFAULT_SORT = "rating";
let all = [];

function fillCategories() {
  categorySelect.replaceChildren(new Option("Todas", ""));
  const categories = [...new Set(all.map((p) => p.categoria))].sort((a, b) => a.localeCompare(b, "es"));
  for (const c of categories) categorySelect.append(new Option(c, c));
}

// Los filtros viven en la URL para poder compartir la búsqueda.
function readURL() {
  const p = new URLSearchParams(location.search);
  searchInput.value = p.get("q") ?? "";
  categorySelect.value = p.get("cat") ?? "";
  sortSelect.value = p.get("sort") ?? DEFAULT_SORT;
  if (sortSelect.value === "") sortSelect.value = DEFAULT_SORT;
  favOnly.checked = p.get("fav") === "1";
}

function writeURL() {
  const p = new URLSearchParams(location.search); // conserva ?fail, ?delay, etc.
  const set = (key, value) => (value ? p.set(key, value) : p.delete(key));
  set("q", searchInput.value.trim());
  set("cat", categorySelect.value);
  set("sort", sortSelect.value !== DEFAULT_SORT ? sortSelect.value : "");
  set("fav", favOnly.checked ? "1" : "");
  const qs = p.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

const hasFilters = () =>
  Boolean(searchInput.value.trim() || categorySelect.value || favOnly.checked || sortSelect.value !== DEFAULT_SORT);

function resetFilters() {
  searchInput.value = "";
  categorySelect.value = "";
  sortSelect.value = DEFAULT_SORT;
  favOnly.checked = false;
  render();
  searchInput.focus();
}

function render() {
  const filtered = filterProviders(all, {
    query: searchInput.value,
    category: categorySelect.value,
    onlyIds: favOnly.checked ? getFavorites() : null,
  });
  const items = sortProviders(filtered, sortSelect.value);

  writeURL();
  resetBtn.hidden = !hasFilters();
  clear(list);
  clear(region);

  if (items.length === 0) {
    count.textContent = "";

    if (all.length === 0) {
      region.append(emptyState("Todavía no hay proveedores disponibles."));
      return;
    }

    const query = searchInput.value.trim();
    const message = query
      ? `No encontramos proveedores para “${query}”. Prueba con otra búsqueda o elimina los filtros.`
      : "No encontramos proveedores con los filtros seleccionados. Puedes limpiar los filtros y volver a intentarlo.";

    region.append(emptyState(message, resetFilters));
    return;
  }
  count.textContent = `${items.length} proveedor${items.length === 1 ? "" : "es"}`;
  list.append(...items.map((p) => createCard(p, { onFavoriteChange: favOnly.checked ? render : undefined })));
}

async function init() {
  clear(region);
  count.textContent = "";
  resetBtn.hidden = true;
  list.setAttribute("aria-busy", "true");

  // El mensaje sigue disponible para tecnologías de asistencia, pero no ocupa
  // espacio visual. Los 12 skeletons reservan el área del listado desde el
  // primer render y evitan que el footer salte al llegar los datos.
  const loading = loadingState(0);
  loading.classList.add("visually-hidden");
  region.append(loading);

  // proveedores.html ya trae skeletons estáticos para reservar espacio antes
  // de que se ejecute JavaScript. Si otro consumidor no los incluye, se
  // generan como fallback sin duplicarlos.
  if (!list.querySelector(".skeleton-card")) {
    list.append(...loadingCards(12));
  }
  try {
    all = await getProviders();
    fillCategories();
    readURL();
    render();
  } catch (error) {
    console.error(error);
    clear(list);
    clear(region);
    region.append(errorState(init));
  } finally {
    list.setAttribute("aria-busy", "false");
  }
}

resetBtn.addEventListener("click", resetFilters);
form.addEventListener("submit", (e) => e.preventDefault());
for (const control of [searchInput, categorySelect, sortSelect, favOnly]) {
  control.addEventListener(control === searchInput ? "input" : "change", render);
}
init();

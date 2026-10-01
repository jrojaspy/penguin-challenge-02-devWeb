// Proveedores registrados desde el formulario. Demo sin backend: se guardan solo en este navegador.
const KEY = "proveedores-registrados-v1";
const LAST_KEY = "ultimo-registro-v1";
export const MIN_INTERVAL_MS = 60_000;

const isValid = (p) =>
  p && Number.isInteger(p.id) && typeof p.nombre === "string" && typeof p.categoria === "string" &&
  typeof p.zona === "string" && typeof p.telefono === "string" && typeof p.descripcion === "string" &&
  typeof p.rating === "number" && Number.isInteger(p.resenas) && typeof p.disponible === "boolean";

export function getStoredProviders() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(value) ? value.filter(isValid) : [];
  } catch {
    return [];
  }
}

export function saveProvider({ nombre, categoria, zona, telefono, descripcion }) {
  const list = getStoredProviders();
  const id = Math.max(999, ...list.map((p) => p.id)) + 1;
  const provider = { id, nombre, categoria, zona, telefono, descripcion, rating: 0, resenas: 0, disponible: true };
  localStorage.setItem(KEY, JSON.stringify([...list, provider]));
  localStorage.setItem(LAST_KEY, String(Date.now()));
  return provider;
}

// Anti-spam simple: un registro por minuto por navegador.
export function secondsUntilNextSubmit(now = Date.now()) {
  try {
    const last = Number(localStorage.getItem(LAST_KEY));
    return last ? Math.max(0, Math.ceil((MIN_INTERVAL_MS - (now - last)) / 1000)) : 0;
  } catch {
    return 0;
  }
}

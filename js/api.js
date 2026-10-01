import { getStoredProviders } from "./storage.js";

// Única capa que conoce de dónde vienen los datos.
// Para pasar a una API real, solo se cambia DATA_URL / request().
const DATA_URL = "./data/providers.json";
const DEFAULT_DELAY_MS = 0; // producción: sin latencia artificial; usa ?delay=900 para demostrar el estado "Cargando"
const TIMEOUT_MS = 8000;

// Parámetros de prueba (solo lectura de la URL):
//   ?fail     -> fuerza un error de carga
//   ?empty    -> devuelve una lista vacía
//   ?delay=0  -> quita la latencia simulada
function flags() {
  const params = new URLSearchParams(globalThis.location?.search ?? "");
  const requestedDelay = params.has("delay")
    ? Number(params.get("delay"))
    : DEFAULT_DELAY_MS;

  return {
    fail: params.has("fail"),
    empty: params.has("empty"),
    delay: Number.isFinite(requestedDelay) && requestedDelay >= 0
      ? requestedDelay
      : DEFAULT_DELAY_MS,
  };
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(url, { fail, delay }) {
  await wait(delay);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(fail ? "./data/no-existe.json" : url, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`No se pudo cargar los datos (HTTP ${response.status})`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("El formato de datos de proveedores no es válido");
    }

    return data;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Convierte cualquier identificador válido a una representación comparable.
 * Esto permite que 1 y "1" representen al mismo proveedor.
 */
export function normalizeProviderId(id) {
  if (id === null || id === undefined) return "";
  return String(id).trim();
}

/**
 * Busca un proveedor sin depender del tipo del ID (number/string).
 */
export function findProviderById(providers, id) {
  const targetId = normalizeProviderId(id);

  if (!targetId || !Array.isArray(providers)) return null;

  return providers.find(
    (provider) => normalizeProviderId(provider?.id) === targetId,
  ) ?? null;
}

export async function getProviders() {
  const f = flags();
  const data = await request(DATA_URL, f);

  if (f.empty) return [];

  return [...data, ...getStoredProviders()];
}

export async function getProviderById(id) {
  const providers = await getProviders();
  return findProviderById(providers, id);
}

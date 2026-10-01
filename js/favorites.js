// Favoritos en localStorage. Tolera datos corruptos o almacenamiento bloqueado.
const KEY = "favoritos-v1";

export function getFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(value) ? value.filter(Number.isInteger) : [];
  } catch {
    return [];
  }
}

export const isFavorite = (id) => getFavorites().includes(id);

export function toggleFavorite(id) {
  const set = new Set(getFavorites());
  set.has(id) ? set.delete(id) : set.add(id);
  try {
    localStorage.setItem(KEY, JSON.stringify([...set]));
  } catch {
    /* sin almacenamiento: el cambio no se persiste */
  }
  return set.has(id);
}

// Lógica pura (sin DOM): fácil de probar.
export const normalize = (s = "") =>
  String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export function filterProviders(list, { query = "", category = "", onlyIds = null } = {}) {
  const q = normalize(query);
  return list.filter(
    (p) =>
      (!category || p.categoria === category) &&
      (!q || normalize(`${p.nombre} ${p.categoria} ${p.zona}`).includes(q)) &&
      (!onlyIds || onlyIds.includes(p.id))
  );
}

export function sortProviders(list, by = "rating") {
  const copy = [...list];
  if (by === "nombre") return copy.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  if (by === "resenas") return copy.sort((a, b) => b.resenas - a.resenas);
  return copy.sort((a, b) => b.rating - a.rating || b.resenas - a.resenas);
}

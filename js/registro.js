import { getProviders } from "./api.js";
import { saveProvider, secondsUntilNextSubmit } from "./storage.js";
import { clear, el } from "./ui.js";

const $ = (id) => document.getElementById(id);
const form = $("register-form");
const region = $("state-region");
const openedAt = Date.now();

const RULES = {
  nombre: (v) => (v.length < 3 ? "Escribe al menos 3 caracteres." : ""),
  categoria: (v) => (v.length < 3 ? "Indica una categoría (mínimo 3 caracteres)." : ""),
  zona: (v) => (v.length < 3 ? "Indica en qué zona trabajas." : ""),
  telefono: (v) => (/^\+?[0-9 ()-]{9,18}$/.test(v) ? "" : "Teléfono inválido. Ejemplo: +595 981 123 456"),
  descripcion: (v) =>
    v.length < 20 ? "Describe tu servicio en al menos 20 caracteres." : v.length > 300 ? "Máximo 300 caracteres." : "",
};

function showError(name, message) {
  const input = $(name);
  const out = $(`${name}-error`);
  out.textContent = message;
  out.hidden = !message;
  if (message) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
}

function validate() {
  const values = {};
  let firstInvalid = null;
  for (const [name, rule] of Object.entries(RULES)) {
    values[name] = $(name).value.trim();
    const message = rule(values[name]);
    showError(name, message);
    if (message && !firstInvalid) firstInvalid = $(name);
  }
  return { values, firstInvalid };
}

function notice(role, title, text, link) {
  clear(region);
  const box = el("div", "state");
  box.setAttribute("role", role);
  box.append(el("h2", "state__title", title), el("p", null, text));
  if (link) {
    const a = el("a", "btn btn--primary", link.label);
    a.href = link.href;
    box.append(a);
  }
  region.append(box);
  box.scrollIntoView?.({ block: "nearest" });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Anti-spam: honeypot, tiempo mínimo y límite de frecuencia.
  if ($("website").value) return notice("status", "¡Listo!", "Tu servicio fue registrado.");
  if (Date.now() - openedAt < 3000) return notice("alert", "Un momento", "Revisa los datos y vuelve a intentarlo en unos segundos.");
  const wait = secondsUntilNextSubmit();
  if (wait > 0) return notice("alert", "Demasiados registros", `Espera ${wait} segundos antes de registrar otro servicio.`);

  const { values, firstInvalid } = validate();
  if (firstInvalid) {
    notice("alert", "Revisa el formulario", "Hay campos con errores. Corrígelos e inténtalo otra vez.");
    firstInvalid.focus();
    return;
  }

  try {
    const provider = saveProvider(values);
    form.reset();
    notice("status", "¡Servicio registrado!", "Ya apareces en el listado (solo en este navegador).",
      { label: "Ver mi perfil", href: `./detalle.html?id=${provider.id}` });
  } catch {
    notice("alert", "No se pudo guardar", "Tu navegador bloqueó el almacenamiento local.");
  }
});

// Validación al salir de cada campo
for (const name of Object.keys(RULES)) {
  $(name).addEventListener("blur", () => showError(name, RULES[name]($(name).value.trim())));
}

// Sugerencias de categoría tomadas de los datos reales
getProviders()
  .then((all) => {
    const options = [...new Set(all.map((p) => p.categoria))].sort((a, b) => a.localeCompare(b, "es"));
    $("categorias").append(...options.map((c) => Object.assign(document.createElement("option"), { value: c })));
  })
  .catch(() => {});

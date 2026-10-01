// Prueba los módulos reales en un DOM simulado (jsdom) con fetch simulado.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

const root = new URL("../", import.meta.url);
const data = JSON.parse(await readFile(new URL("data/providers.json", root), "utf8"));
const define = (k, v) => Object.defineProperty(globalThis, k, { value: v, configurable: true, writable: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let n = 0;

async function mount(page, search = "?delay=0", entry = page) {
  const html = (await readFile(new URL(`${page}.html`, root), "utf8")).replace(/<script[\s\S]*?<\/script>/g, "");
  const w = new JSDOM(html, { url: `http://localhost/${page}.html${search}` }).window;
  for (const k of ["window", "document", "location", "history", "localStorage", "sessionStorage", "Option"]) define(k, k === "window" ? w : w[k]);
  define("navigator", w.navigator);
  define("fetch", async (url) =>
    String(url).includes("no-existe")
      ? { ok: false, status: 404, json: async () => ({}) }
      : { ok: true, status: 200, json: async () => structuredClone(data) });
  await import(`../js/${entry}.js?t=${++n}`);
  return w;
}
const $ = (w, id) => w.document.getElementById(id);
const type = (w, id, value, evt = "input") => { $(w, id).value = value; $(w, id).dispatchEvent(new w.Event(evt, { bubbles: true })); };
const titles = (w) => [...w.document.querySelectorAll("#provider-list .card__title")].map((e) => e.textContent);

test("listado: cargando → éxito", async () => {
  const w = await mount("proveedores", "?delay=80");
  assert.match($(w, "state-region").textContent, /Cargando/);
  assert.equal($(w, "provider-list").getAttribute("aria-busy"), "true");
  assert.equal(w.document.querySelectorAll("#provider-list .skeleton-card").length, 12);
  await sleep(250);
  assert.equal(titles(w).length, data.length);
  assert.equal($(w, "state-region").children.length, 0);
  assert.equal($(w, "provider-list").getAttribute("aria-busy"), "false");
  assert.match($(w, "results-count").textContent, /12 proveedores/);
});

test("listado: filtros, orden y URL", async () => {
  const w = await mount("proveedores");
  await sleep(50);
  type(w, "category", "Plomería", "change");
  assert.deepEqual(titles(w).sort(), ["Carlos Benítez", "Hidro Servicios"]);
  assert.match(w.location.search, /cat=Plomer/);
  assert.equal($(w, "reset").hidden, false);
  type(w, "category", "", "change");
  type(w, "sort", "nombre", "change");
  const expected = data.map((p) => p.nombre).sort((a, b) => a.localeCompare(b, "es"));
  assert.deepEqual(titles(w), expected);
  type(w, "search", "zzzz");
  assert.match($(w, "state-region").textContent, /Sin resultados/);
  assert.match($(w, "state-region").textContent, /zzzz/);
  const clearFilters = $(w, "state-region").querySelector("button");
  assert.equal(clearFilters.textContent, "Limpiar filtros");
  clearFilters.click();
  assert.equal(titles(w).length, 12);
  assert.equal(titles(w)[0], "Rubén Acosta");
});

test("listado: restaura filtros desde la URL", async () => {
  const w = await mount("proveedores", "?delay=0&cat=Pintura&sort=nombre");
  await sleep(50);
  assert.deepEqual(titles(w), ["Pinturas Hernández", "Sofía Martínez"]);
});

test("listado: estado de error con reintento", async () => {
  const w = await mount("proveedores", "?delay=0&fail");
  await sleep(50);
  const box = $(w, "state-region").querySelector("[role=alert]");
  assert.ok(box, "hay role=alert");
  assert.match(box.textContent, /No pudimos cargar/);
  assert.match(box.textContent, /Comprueba tu conexión/);
  const retry = box.querySelector("button");
  assert.equal(retry.textContent, "Reintentar");
  retry.click();
  assert.match($(w, "state-region").textContent, /Cargando/);
  await sleep(50);
  assert.ok($(w, "state-region").querySelector("[role=alert]"), "sigue fallando si persiste el error");
});

test("listado: estado sin resultados (datos vacíos)", async () => {
  const w = await mount("proveedores", "?delay=0&empty");
  await sleep(50);
  assert.match($(w, "state-region").textContent, /Sin resultados/);
  assert.match($(w, "state-region").textContent, /Todavía no hay proveedores/);
  assert.equal(titles(w).length, 0);
});

test("listado: favoritos y XSS en nombres", async () => {
  const w = await mount("proveedores");
  await sleep(50);
  const first = w.document.querySelector(".fav");
  first.click();
  assert.equal(first.getAttribute("aria-pressed"), "true");
  assert.deepEqual(JSON.parse(w.localStorage.getItem("favoritos-v1")), [5]);
  $(w, "fav-only").checked = true;
  $(w, "fav-only").dispatchEvent(new w.Event("change", { bubbles: true }));
  assert.deepEqual(titles(w), ["Rubén Acosta"]);
  w.localStorage.setItem("favoritos-v1", "{{corrupto");
  type(w, "fav-only", "", "change"); // no debe romper con JSON inválido
  assert.ok(titles(w).length === 0);
});

test("detalle: perfil, relacionados y casos borde", async () => {
  let w = await mount("detalle", "?delay=0&id=1");
  await sleep(50);
  assert.equal($(w, "detail-name").textContent, "Carlos Benítez");
  assert.equal($(w, "provider-detail").hidden, false);
  assert.equal($(w, "detail-call").getAttribute("href"), "tel:+595981000001");
  const relatedCall = w.document.querySelector("#related-list .card__call");
  assert.equal(relatedCall?.textContent, "Llamar ahora");
  assert.match(w.document.title, /Carlos Benítez/);
  assert.deepEqual([...w.document.querySelectorAll("#related-list .card__title")].map((e) => e.textContent), ["Hidro Servicios"]);

  // Regresión: el ID de la URL se procesa de forma estable como texto.
  w = await mount("detalle", "?delay=0&id=01");
  await sleep(50);
  assert.match($(w, "state-region").textContent, /Proveedor no encontrado/);

  for (const q of ["?delay=0&id=999", "?delay=0", "?delay=0&id=abc"]) {
    w = await mount("detalle", q);
    await sleep(50);
    assert.match($(w, "state-region").textContent, /Proveedor no encontrado/, q);
    assert.equal($(w, "provider-detail").hidden, true);
  }
  w = await mount("detalle", "?delay=0&id=1&fail");
  await sleep(50);
  assert.ok($(w, "state-region").querySelector("[role=alert]"));
});

test("registro: validación accesible, anti-spam y guardado seguro", async () => {
  const realNow = Date.now;
  const w = await mount("registro");
  const submit = () => $(w, "register-form").dispatchEvent(new w.Event("submit", { cancelable: true, bubbles: true }));
  const fill = (v) => Object.entries(v).forEach(([k, val]) => ($(w, k).value = val));
  const good = { nombre: "<img src=x onerror=alert(1)>", categoria: "Plomería", zona: "Centro",
    telefono: "+595 981 123 456", descripcion: "Reparaciones de cañerías y fugas en el día." };

  fill(good);
  submit(); // demasiado rápido: trampa de tiempo
  assert.equal(w.localStorage.getItem("proveedores-registrados-v1"), null);

  Date.now = () => realNow() + 5000;
  try {
    fill({ ...good, nombre: "", telefono: "12" });
    submit();
    assert.equal($(w, "nombre").getAttribute("aria-invalid"), "true");
    assert.equal($(w, "nombre-error").hidden, false);
    assert.equal(w.document.activeElement.id, "nombre");

    fill({ ...good, website: "bot" });
    submit(); // honeypot: finge éxito pero no guarda
    assert.equal(w.localStorage.getItem("proveedores-registrados-v1"), null);

    fill({ ...good, website: "" });
    submit();
    const stored = JSON.parse(w.localStorage.getItem("proveedores-registrados-v1"));
    assert.equal(stored.length, 1);
    assert.equal(stored[0].id, 1000);
    assert.match($(w, "state-region").textContent, /Servicio registrado/);

    fill(good);
    submit(); // límite de frecuencia
    assert.match($(w, "state-region").textContent, /Espera \d+ segundos/);
    assert.equal(JSON.parse(w.localStorage.getItem("proveedores-registrados-v1")).length, 1);

    // el proveedor guardado aparece en el listado y se muestra como texto (sin ejecutar HTML)
    const saved = w.localStorage.getItem("proveedores-registrados-v1");
    const list = await mount("proveedores");
    list.localStorage.setItem("proveedores-registrados-v1", saved);
    list.localStorage.setItem("favoritos-v1", "[]");
    await sleep(50);
    type(list, "search", "img src");
    assert.equal(titles(list).length, 1);
    assert.equal(list.document.querySelectorAll("#provider-list img").length, 0);
    assert.equal(titles(list)[0], "<img src=x onerror=alert(1)>");
    assert.match(list.document.querySelector(".rating").textContent, /Nuevo/);
  } finally {
    Date.now = realNow;
  }
});

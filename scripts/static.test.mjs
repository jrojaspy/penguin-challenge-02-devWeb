import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, access } from "node:fs/promises";
import { normalize, filterProviders, sortProviders } from "../js/filters.js";

const root = new URL("../", import.meta.url);
const read = (p) => readFile(new URL(p, root), "utf8");
const providers = JSON.parse(await read("data/providers.json"));
const pages = ["index.html", "proveedores.html", "detalle.html", "registro.html"];

test("providers.json cumple el esquema", () => {
  assert.ok(providers.length >= 12, "al menos 12 proveedores");
  assert.equal(new Set(providers.map((p) => p.id)).size, providers.length, "ids únicos");
  assert.ok(new Set(providers.map((p) => p.categoria)).size >= 4, "al menos 4 categorías");
  for (const p of providers) {
    assert.ok(p.nombre && p.categoria && p.zona && p.descripcion, `campos de texto en id ${p.id}`);
    assert.ok(p.rating >= 0 && p.rating <= 5, `rating válido en id ${p.id}`);
    assert.match(p.telefono, /^\+\d{9,15}$/, `teléfono en id ${p.id}`);
    assert.equal(typeof p.disponible, "boolean");
  }
});

for (const page of pages) {
  test(`${page}: HTML básico, accesible y sin datos incrustados`, async () => {
    const html = await read(page);
    assert.match(html, /<html lang="es">/);
    assert.match(html, /<title>[^<]{5,}<\/title>/);
    assert.match(html, /<meta name="description" content="[^"]{20,}"/);
    assert.match(html, /name="viewport"/);
    assert.match(html, /class="skip-link"/);
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, "exactamente un h1");
    for (const p of providers) assert.ok(!html.includes(p.nombre), `"${p.nombre}" no debe estar en el HTML`);
    for (const [, ref] of html.matchAll(/(?:href|src)="(\.\/[^"#?]+)"/g)) {
      await access(new URL(ref.slice(2), root)).catch(() => assert.fail(`${page}: recurso inexistente ${ref}`));
    }
  });
}

test("JS: sin innerHTML y CSS: sin quitar el foco", async () => {
  for (const f of await readdir(new URL("js/", root))) {
    assert.ok(!/innerHTML|outerHTML|insertAdjacentHTML/.test(await read(`js/${f}`)), `${f} usa HTML inseguro`);
  }
  for (const f of await readdir(new URL("css/", root))) {
    assert.ok(!/outline:\s*none/.test(await read(`css/${f}`).then((s) => s.replace(/main:focus[^}]*}/, ""))), `${f} elimina el foco`);
  }
});

test("filters: normalize, filtro y orden", () => {
  assert.equal(normalize("  Plomería "), "plomeria");
  assert.equal(filterProviders(providers, { query: "PLOMERIA" }).length, 2);
  assert.equal(filterProviders(providers, { query: "recoleta" }).length, 1);
  assert.equal(filterProviders(providers, { category: "Pintura" }).length, 2);
  assert.equal(filterProviders(providers, { query: "zzzz" }).length, 0);
  assert.deepEqual(filterProviders(providers, { onlyIds: [1, 2] }).map((p) => p.id), [1, 2]);
  assert.equal(sortProviders(providers, "rating")[0].nombre, "Rubén Acosta");
  assert.equal(sortProviders(providers, "resenas")[0].id, 5);
  const names = sortProviders(providers, "nombre").map((p) => p.nombre);
  assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b, "es")));
});

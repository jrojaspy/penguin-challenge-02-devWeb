// Header y footer compartidos: un solo lugar para mantener la navegación.
import { el } from "./ui.js";

const NAV = [
  ["inicio", "index.html", "Inicio"],
  ["proveedores", "proveedores.html", "Proveedores"],
  ["registro", "registro.html", "Ofrecer mis servicios"],
];

function mountHeader(current) {
  const header = document.getElementById("site-header");
  if (!header) return;

  const brand = el("a", "site-header__brand");
  brand.href = "./index.html";
  brand.append("Servicios", el("span", null, "Asu"));

  const list = el("ul", "nav");
  for (const [key, href, label] of NAV) {
    const link = el("a", "nav__link", label);
    link.href = `./${href}`;
    if (key === current) link.setAttribute("aria-current", "page");
    // En el detalle, la sección "Proveedores" es el contexto, no la página actual
    if (key === "proveedores" && current === "detalle") link.setAttribute("aria-current", "true");
    const item = el("li");
    item.append(link);
    list.append(item);
  }

  const nav = el("nav");
  nav.setAttribute("aria-label", "Principal");
  nav.append(list);

  const inner = el("div", "container site-header__inner");
  inner.append(brand, nav);
  header.append(inner);
}

function mountFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  const inner = el("div", "container");
  inner.append(el("p", null, `© ${new Date().getFullYear()} Servicios Asunción · Proyecto CodePRO`));
  footer.append(inner);
}

mountHeader(document.body.dataset.page);
mountFooter();

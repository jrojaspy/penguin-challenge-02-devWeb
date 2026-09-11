const detailContainer =
  document.querySelector('#provider-detail');

const detailStatus =
  document.querySelector('#detail-status');

async function loadProviderDetail() {
  showLoadingState();

  const providerId =
    getProviderIdFromUrl();

  if (providerId === null) {
    showNotFoundState(
      'No se indicó un proveedor válido.'
    );

    return;
  }

  try {
    const response =
      await fetch('./data/providers.json');

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const providers =
      await response.json();

    if (!Array.isArray(providers)) {
      throw new Error(
        'La fuente de datos no contiene una lista válida.'
      );
    }

    const provider =
      providers.find(
        (item) =>
          Number(item.id) === providerId
      );

    if (!provider) {
      showNotFoundState(
        'El proveedor solicitado no existe.'
      );

      return;
    }

    clearStatus();

    renderProviderDetail(
      provider
    );
  } catch (error) {
    console.error(
      'Error loading provider detail:',
      error
    );

    showErrorState();
  }
}

function getProviderIdFromUrl() {
  const params =
    new URLSearchParams(
      window.location.search
    );

  const rawId =
    params.get('id');

  if (!rawId) {
    return null;
  }

  const id =
    Number(rawId);

  if (
    !Number.isInteger(id) ||
    id <= 0
  ) {
    return null;
  }

  return id;
}

function renderProviderDetail(provider) {
  const name =
    normalizeText(
      provider.name,
      'Proveedor'
    );

  const category =
    normalizeText(
      provider.category,
      'Sin categoría'
    );

  const location =
    normalizeText(
      provider.location,
      'Ubicación no informada'
    );

  const description =
    normalizeText(
      provider.description,
      'Sin descripción disponible.'
    );

  const phone =
    normalizeText(
      provider.phone,
      ''
    );

  const rating =
    normalizeRating(
      provider.rating
    );

  const experience =
    normalizeExperience(
      provider.experience
    );

  const available =
    provider.available === true;

  const availabilityText =
    available
      ? 'Disponible'
      : 'No disponible';

  const availabilityClass =
    available
      ? 'provider-status-available'
      : 'provider-status-unavailable';

  document.title =
    `${name} | ServiPy`;

  detailContainer.innerHTML = `
    <article class="provider-detail-card">
      <header class="provider-detail-header">
        <div>
          <p class="provider-category">
            ${escapeHtml(category)}
          </p>

          <h1>
            ${escapeHtml(name)}
          </h1>

          <p class="provider-detail-location">
            ${escapeHtml(location)}
          </p>
        </div>

        <span
          class="provider-status ${availabilityClass}"
        >
          ${availabilityText}
        </span>
      </header>

      <section
        class="provider-detail-section"
        aria-labelledby="provider-description-title"
      >
        <h2 id="provider-description-title">
          Sobre el servicio
        </h2>

        <p>
          ${escapeHtml(description)}
        </p>
      </section>

      <section
        class="provider-detail-section"
        aria-labelledby="provider-info-title"
      >
        <h2 id="provider-info-title">
          Información
        </h2>

        <dl class="provider-detail-list">
          <div>
            <dt>Calificación</dt>

            <dd
              aria-label="Calificación ${rating.toFixed(1)} de 5"
            >
              ★ ${rating.toFixed(1)} / 5
            </dd>
          </div>

          <div>
            <dt>Experiencia</dt>

            <dd>
              ${escapeHtml(experience)}
            </dd>
          </div>

          <div>
            <dt>Categoría</dt>

            <dd>
              ${escapeHtml(category)}
            </dd>
          </div>

          <div>
            <dt>Ubicación</dt>

            <dd>
              ${escapeHtml(location)}
            </dd>
          </div>
        </dl>
      </section>

      ${renderContactSection({
        phone,
        name,
        available
      })}
    </article>
  `;
}

function renderContactSection({
  phone,
  name,
  available
}) {
  if (!phone) {
    return `
      <section
        class="provider-detail-section"
        aria-labelledby="contact-title"
      >
        <h2 id="contact-title">
          Contacto
        </h2>

        <p>
          El proveedor no tiene un número de contacto disponible.
        </p>
      </section>
    `;
  }

  if (!available) {
    return `
      <section
        class="provider-detail-section"
        aria-labelledby="contact-title"
      >
        <h2 id="contact-title">
          Contacto
        </h2>

        <p>
          Este proveedor no se encuentra disponible en este momento.
        </p>

        <p class="contact-phone">
          ${escapeHtml(
            formatPhone(phone)
          )}
        </p>
      </section>
    `;
  }

  return `
    <section
      class="provider-detail-section contact-section"
      aria-labelledby="contact-title"
    >
      <h2 id="contact-title">
        Contacto
      </h2>

      <p>
        Puedes contactar directamente con
        ${escapeHtml(name)}.
      </p>

      <a
        class="button contact-button"
        href="tel:${escapeHtml(
          normalizePhoneForLink(phone)
        )}"
        aria-label="Llamar a ${escapeHtml(name)}"
      >
        Llamar ahora
      </a>

      <p class="contact-phone">
        ${escapeHtml(
          formatPhone(phone)
        )}
      </p>
    </section>
  `;
}

function showLoadingState() {
  detailContainer.innerHTML = '';

  detailStatus.innerHTML = `
    <div class="state-card state-loading">
      <p class="state-title">
        Cargando proveedor...
      </p>

      <p class="state-description">
        Estamos obteniendo la información del profesional.
      </p>
    </div>
  `;
}

function showNotFoundState(message) {
  detailContainer.innerHTML = '';

  detailStatus.innerHTML = `
    <div
      class="state-card state-empty"
      role="status"
    >
      <h1 class="state-title">
        Proveedor no encontrado
      </h1>

      <p class="state-description">
        ${escapeHtml(message)}
      </p>

      <a
        class="button"
        href="./providers.html"
      >
        Volver a proveedores
      </a>
    </div>
  `;
}

function showErrorState() {
  detailContainer.innerHTML = '';

  detailStatus.innerHTML = `
    <div
      class="state-card state-error"
      role="alert"
    >
      <h1 class="state-title">
        No pudimos cargar el proveedor
      </h1>

      <p class="state-description">
        Ocurrió un problema al obtener
        la información.
      </p>

      <button
        class="button"
        id="retry-detail"
        type="button"
      >
        Reintentar
      </button>
    </div>
  `;

  const retryButton =
    document.querySelector(
      '#retry-detail'
    );

  if (retryButton) {
    retryButton.addEventListener(
      'click',
      loadProviderDetail
    );
  }
}

function clearStatus() {
  detailStatus.innerHTML = '';
}

function normalizeText(
  value,
  fallback
) {
  const normalized =
    String(value ?? '').trim();

  return normalized || fallback;
}

function normalizeRating(value) {
  const rating =
    Number(value);

  if (!Number.isFinite(rating)) {
    return 0;
  }

  return Math.min(
    Math.max(
      rating,
      0
    ),
    5
  );
}

function normalizeExperience(value) {
  const experience =
    Number(value);

  if (
    !Number.isFinite(experience) ||
    experience < 0
  ) {
    return 'Experiencia no informada';
  }

  const years =
    Math.floor(experience);

  return `${years} ${
    years === 1
      ? 'año'
      : 'años'
  }`;
}

function normalizePhoneForLink(phone) {
  return String(phone)
    .replace(/[^\d+]/g, '');
}

function formatPhone(phone) {
  const value =
    String(phone).trim();

  if (
    value.startsWith('+595') &&
    value.length >= 13
  ) {
    const country =
      value.slice(0, 4);

    const operator =
      value.slice(4, 7);

    const firstPart =
      value.slice(7, 10);

    const secondPart =
      value.slice(10);

    return `${country} ${operator} ${firstPart} ${secondPart}`;
  }

  return value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll(
      "'",
      '&#039;'
    );
}

function initDetailPage() {
  if (
    !detailContainer ||
    !detailStatus
  ) {
    console.error(
      'No se encontraron los elementos necesarios para inicializar el detalle.'
    );

    return;
  }

  loadProviderDetail();
}

initDetailPage();
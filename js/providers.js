const providersContainer =
  document.querySelector('#providers-container');

const providersStatus =
  document.querySelector('#providers-status');

async function loadProviders() {
  showLoadingState();

  try {
    const response = await fetch('./data/providers.json');

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const providers = await response.json();

    if (!Array.isArray(providers)) {
      throw new Error(
        'La fuente de datos no contiene una lista válida.'
      );
    }

    if (providers.length === 0) {
      showEmptyState();

      return;
    }

    clearStatus();

    renderProviders(providers);
  } catch (error) {
    console.error(
      'Error loading providers:',
      error
    );

    showErrorState();
  }
}

function showLoadingState() {
  providersContainer.innerHTML = '';

  providersStatus.innerHTML = `
    <div class="state-card state-loading">
      <p class="state-title">
        Cargando proveedores...
      </p>

      <p class="state-description">
        Estamos obteniendo los servicios disponibles.
      </p>
    </div>
  `;
}

function showEmptyState() {
  providersContainer.innerHTML = '';

  providersStatus.innerHTML = `
    <div class="state-card state-empty">
      <h2 class="state-title">
        No hay proveedores disponibles
      </h2>

      <p class="state-description">
        No encontramos proveedores para mostrar en este momento.
      </p>
    </div>
  `;
}

function showErrorState() {
  providersContainer.innerHTML = '';

  providersStatus.innerHTML = `
    <div
      class="state-card state-error"
      role="alert"
    >
      <h2 class="state-title">
        No pudimos cargar los proveedores
      </h2>

      <p class="state-description">
        Ocurrió un problema al obtener la información.
        Puedes intentar nuevamente.
      </p>

      <button
        class="button"
        id="retry-providers"
        type="button"
      >
        Reintentar
      </button>
    </div>
  `;

  const retryButton =
    document.querySelector('#retry-providers');

  retryButton.addEventListener(
    'click',
    loadProviders
  );
}

function clearStatus() {
  providersStatus.innerHTML = '';
}

function renderProviders(providers) {
  providersContainer.innerHTML = '';

  providers.forEach((provider) => {
    const card = createProviderCard(provider);

    providersContainer.appendChild(card);
  });
}

function createProviderCard(provider) {
  const article =
    document.createElement('article');

  article.className =
    'provider-card';

  const statusText =
    provider.available
      ? 'Disponible'
      : 'No disponible';

  const statusClass =
    provider.available
      ? 'provider-status-available'
      : 'provider-status-unavailable';

  const rating =
    Number(provider.rating);

  const safeRating =
    Number.isFinite(rating)
      ? rating
      : 0;

  article.innerHTML = `
    <div class="provider-card-header">
      <div>
        <p class="provider-category">
          ${escapeHtml(provider.category)}
        </p>

        <h2 class="provider-name">
          ${escapeHtml(provider.name)}
        </h2>
      </div>

      <span
        class="provider-status ${statusClass}"
      >
        ${statusText}
      </span>
    </div>

    <p class="provider-location">
      ${escapeHtml(provider.location)}
    </p>

    <p class="provider-description">
      ${escapeHtml(provider.description)}
    </p>

    <div class="provider-meta">
      <span
        class="provider-rating"
        aria-label="Calificación ${safeRating} de 5"
      >
        ★ ${safeRating.toFixed(1)}
      </span>

      <span>
        ${provider.experience}
        ${provider.experience === 1 ? 'año' : 'años'}
        de experiencia
      </span>
    </div>

    <a
      class="button provider-action"
      href="./detail.html?id=${encodeURIComponent(provider.id)}"
    >
      Ver detalle
    </a>
  `;

  return article;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

loadProviders();
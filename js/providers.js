const providersContainer =
  document.querySelector('#providers-container');

async function loadProviders() {
  try {
    const response = await fetch('./data/providers.json');

    if (!response.ok) {
      throw new Error(
        `No se pudieron cargar los proveedores. HTTP ${response.status}`
      );
    }

    const providers = await response.json();

    renderProviders(providers);
  } catch (error) {
    console.error(
      'Error loading providers:',
      error
    );
  }
}

function renderProviders(providers) {
  providersContainer.innerHTML = '';

  providers.forEach((provider) => {
    const card = createProviderCard(provider);

    providersContainer.appendChild(card);
  });
}

function createProviderCard(provider) {
  const article = document.createElement('article');

  article.className = 'provider-card';

  const statusText =
    provider.available
      ? 'Disponible'
      : 'No disponible';

  const statusClass =
    provider.available
      ? 'provider-status-available'
      : 'provider-status-unavailable';

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
        aria-label="Calificación ${provider.rating} de 5"
      >
        ★ ${provider.rating.toFixed(1)}
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
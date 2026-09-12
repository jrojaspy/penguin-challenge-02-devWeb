const providersContainer =
  document.querySelector('#providers-container');

const providersStatus =
  document.querySelector('#providers-status');

const categoryFilter =
  document.querySelector('#category-filter');

const resultsCount =
  document.querySelector('#results-count');

let allProviders = [];

async function loadProviders() {
  showLoadingState();

  try {
    const response =
      await fetch('./data/providers.json');

    if (!response.ok) {
      throw new Error(
        'Error HTTP ' + response.status
      );
    }

    const providers =
      await response.json();

    if (!Array.isArray(providers)) {
      throw new Error(
        'La fuente de datos no contiene una lista válida.'
      );
    }

    allProviders = providers;

    populateCategoryFilter(
      allProviders
    );

    if (allProviders.length === 0) {
      showEmptyState();

      updateResultsCount(0);

      return;
    }

    categoryFilter.disabled = false;

    providersContainer.setAttribute(
      'aria-busy',
      'false'
    );

    clearStatus();

    renderProviders(
      allProviders
    );

    updateResultsCount(
      allProviders.length
    );
  } catch (error) {
    console.error(
      'Error loading providers:',
      error
    );

    allProviders = [];

    categoryFilter.disabled = true;

    updateResultsCount(0);

    showErrorState();
  }
}

function populateCategoryFilter(providers) {
  const currentValue =
    categoryFilter.value;

  const categories = [];

  providers.forEach(function (provider) {
    const category =
      normalizeText(
        provider.category,
        ''
      );

    if (
      category &&
      categories.indexOf(category) === -1
    ) {
      categories.push(category);
    }
  });

  categories.sort(function (a, b) {
    return a.localeCompare(
      b,
      'es'
    );
  });

  categoryFilter.innerHTML = '';

  const allOption =
    document.createElement('option');

  allOption.value = 'all';

  allOption.textContent =
    'Todas las categorías';

  categoryFilter.appendChild(
    allOption
  );

  categories.forEach(function (category) {
    const option =
      document.createElement('option');

    option.value = category;

    option.textContent = category;

    categoryFilter.appendChild(
      option
    );
  });

  if (
    currentValue &&
    (
      currentValue === 'all' ||
      categories.indexOf(
        currentValue
      ) !== -1
    )
  ) {
    categoryFilter.value =
      currentValue;
  } else {
    categoryFilter.value =
      'all';
  }
}

function filterProvidersByCategory(
  category
) {
  if (category === 'all') {
    return allProviders;
  }

  return allProviders.filter(
    function (provider) {
      return (
        provider.category ===
        category
      );
    }
  );
}

function handleCategoryChange(event) {
  const selectedCategory =
    event.target.value;

  const filteredProviders =
    filterProvidersByCategory(
      selectedCategory
    );

  providersContainer.setAttribute(
    'aria-busy',
    'false'
  );

  if (
    filteredProviders.length === 0
  ) {
    providersContainer.innerHTML = '';

    showFilteredEmptyState(
      selectedCategory
    );

    updateResultsCount(0);

    return;
  }

  clearStatus();

  renderProviders(
    filteredProviders
  );

  updateResultsCount(
    filteredProviders.length
  );
}

function showLoadingState() {
  categoryFilter.disabled = true;

  providersContainer.setAttribute(
    'aria-busy',
    'true'
  );

  providersContainer.innerHTML = '';

  resultsCount.textContent = '';

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
  categoryFilter.disabled = true;

  providersContainer.setAttribute(
    'aria-busy',
    'false'
  );

  providersContainer.innerHTML = '';

  providersStatus.innerHTML = `
    <div class="state-card state-empty">
      <h2 class="state-title">
        No hay proveedores disponibles
      </h2>

      <p class="state-description">
        No encontramos proveedores
        para mostrar en este momento.
      </p>
    </div>
  `;
}

function showFilteredEmptyState(
  category
) {
  providersStatus.innerHTML = `
    <div class="state-card state-empty">
      <h2 class="state-title">
        No encontramos proveedores
      </h2>

      <p class="state-description">
        No hay proveedores disponibles
        para la categoría
        "${escapeHtml(category)}".
      </p>
    </div>
  `;
}

function showErrorState() {
  categoryFilter.disabled = true;

  providersContainer.setAttribute(
    'aria-busy',
    'false'
  );

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
        Ocurrió un problema al obtener
        la información.
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
    document.querySelector(
      '#retry-providers'
    );

  if (retryButton) {
    retryButton.addEventListener(
      'click',
      loadProviders
    );
  }
}

function clearStatus() {
  providersStatus.innerHTML = '';
}

function updateResultsCount(count) {
  if (count === 0) {
    resultsCount.textContent =
      '0 proveedores encontrados';

    return;
  }

  if (count === 1) {
    resultsCount.textContent =
      '1 proveedor encontrado';

    return;
  }

  resultsCount.textContent =
    count + ' proveedores encontrados';
}

function renderProviders(providers) {
  providersContainer.innerHTML = '';

  const fragment =
    document.createDocumentFragment();

  providers.forEach(function (provider) {
    const card =
      createProviderCard(
        provider
      );

    fragment.appendChild(card);
  });

  providersContainer.appendChild(
    fragment
  );
}

function createProviderCard(provider) {
  const article =
    document.createElement(
      'article'
    );

  article.className =
    'provider-card';

  const rawProviderId =
    String(provider.id);

  const providerId =
    encodeURIComponent(
      rawProviderId
    );

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

  const experience =
    normalizeExperience(
      provider.experience
    );

  const rating =
    normalizeRating(
      provider.rating
    );

  const available =
    provider.available === true;

  const statusText =
    available
      ? 'Disponible'
      : 'No disponible';

  const statusClass =
    available
      ? 'provider-status-available'
      : 'provider-status-unavailable';

  article.setAttribute(
    'aria-labelledby',
    'provider-name-' + rawProviderId
  );

  article.innerHTML = `
    <div class="provider-card-header">
      <div>
        <p class="provider-category">
          ${escapeHtml(category)}
        </p>

        <h2
          class="provider-name"
          id="provider-name-${escapeHtml(rawProviderId)}"
        >
          ${escapeHtml(name)}
        </h2>
      </div>

      <span
        class="provider-status ${statusClass}"
        aria-label="Estado del proveedor: ${statusText}"
      >
        ${statusText}
      </span>
    </div>

    <p class="provider-location">
      ${escapeHtml(location)}
    </p>

    <p class="provider-description">
      ${escapeHtml(description)}
    </p>

    <div class="provider-meta">
      <span
        class="provider-rating"
        aria-label="Calificación ${rating.toFixed(1)} de 5"
      >
        ★ ${rating.toFixed(1)}
      </span>

      <span>
        ${escapeHtml(experience)}
      </span>
    </div>

    <a
      class="button provider-action"
      href="./detail.html?id=${providerId}"
      aria-label="Ver detalle de ${escapeHtml(name)}"
    >
      Ver detalle
    </a>
  `;

  return article;
}

function normalizeText(
  value,
  fallback
) {
  const normalized =
    String(
      value == null
        ? ''
        : value
    ).trim();

  return normalized || fallback;
}

function normalizeRating(value) {
  const rating =
    Number(value);

  if (!isFinite(rating)) {
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
    !isFinite(experience) ||
    experience < 0
  ) {
    return 'Experiencia no informada';
  }

  const years =
    Math.floor(experience);

  return (
    years +
    ' ' +
    (
      years === 1
        ? 'año'
        : 'años'
    ) +
    ' de experiencia'
  );
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function initProvidersPage() {
  if (
    !providersContainer ||
    !providersStatus ||
    !categoryFilter ||
    !resultsCount
  ) {
    console.error(
      'No se encontraron los elementos necesarios para inicializar la página de proveedores.'
    );

    return;
  }

  categoryFilter.addEventListener(
    'change',
    handleCategoryChange
  );

  loadProviders();
}

initProvidersPage();
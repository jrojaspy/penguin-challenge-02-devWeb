const providersContainer =
  document.querySelector('#providers-container');

const providersStatus =
  document.querySelector('#providers-status');

const categoryFilter =
  document.querySelector('#category-filter');

const resultsCount =
  document.querySelector('#results-count');

let allProviders = [];

/**
 * Carga los proveedores desde la fuente JSON.
 */
async function loadProviders() {
  showLoadingState();

  try {
    const response =
      await fetch('./data/providers.json');

    if (!response.ok) {
      throw new Error(
        `Error HTTP ${response.status}`
      );
    }

    const providers =
      await response.json();

    if (!Array.isArray(providers)) {
      throw new Error(
        'La fuente de datos no contiene una lista válida de proveedores.'
      );
    }

    allProviders = providers;

    populateCategoryFilter(
      allProviders
    );

    if (allProviders.length === 0) {
      showEmptyState();
      updateResultsCount(0);

      categoryFilter.disabled = true;

      return;
    }

    categoryFilter.disabled = false;

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

/**
 * Genera dinámicamente las categorías
 * a partir de los proveedores cargados.
 */
function populateCategoryFilter(providers) {
  const currentValue =
    categoryFilter.value;

  const categories = [
    ...new Set(
      providers
        .map(
          (provider) =>
            provider.category
        )
        .filter(Boolean)
    )
  ].sort(
    (a, b) =>
      a.localeCompare(
        b,
        'es'
      )
  );

  categoryFilter.innerHTML = '';

  const allOption =
    document.createElement('option');

  allOption.value = 'all';
  allOption.textContent =
    'Todas las categorías';

  categoryFilter.appendChild(
    allOption
  );

  categories.forEach(
    (category) => {
      const option =
        document.createElement(
          'option'
        );

      option.value = category;
      option.textContent = category;

      categoryFilter.appendChild(
        option
      );
    }
  );

  if (
    currentValue &&
    (
      currentValue === 'all' ||
      categories.includes(
        currentValue
      )
    )
  ) {
    categoryFilter.value =
      currentValue;
  } else {
    categoryFilter.value =
      'all';
  }
}

/**
 * Devuelve proveedores filtrados
 * por categoría.
 */
function filterProvidersByCategory(
  category
) {
  if (category === 'all') {
    return allProviders;
  }

  return allProviders.filter(
    (provider) =>
      provider.category === category
  );
}

/**
 * Procesa el cambio del selector
 * de categoría.
 */
function handleCategoryChange(event) {
  const selectedCategory =
    event.target.value;

  const filteredProviders =
    filterProvidersByCategory(
      selectedCategory
    );

  if (
    filteredProviders.length === 0
  ) {
    providersContainer.innerHTML =
      '';

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

/**
 * Muestra el estado de carga.
 */
function showLoadingState() {
  categoryFilter.disabled = true;

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

/**
 * Muestra el estado vacío general.
 */
function showEmptyState() {
  categoryFilter.disabled = true;

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

/**
 * Muestra estado vacío para
 * un filtro específico.
 */
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

/**
 * Muestra el estado de error
 * y permite reintentar.
 */
function showErrorState() {
  categoryFilter.disabled = true;

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

/**
 * Limpia mensajes de estado.
 */
function clearStatus() {
  providersStatus.innerHTML = '';
}

/**
 * Actualiza el contador
 * de proveedores visibles.
 */
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
    `${count} proveedores encontrados`;
}

/**
 * Renderiza una colección
 * de proveedores.
 */
function renderProviders(providers) {
  providersContainer.innerHTML = '';

  const fragment =
    document.createDocumentFragment();

  providers.forEach(
    (provider) => {
      const card =
        createProviderCard(
          provider
        );

      fragment.appendChild(
        card
      );
    }
  );

  providersContainer.appendChild(
    fragment
  );
}

/**
 * Crea una tarjeta individual.
 */
function createProviderCard(provider) {
  const article =
    document.createElement(
      'article'
    );

  article.className =
    'provider-card';

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

  const providerId =
    encodeURIComponent(
      String(provider.id)
    );

  article.innerHTML = `
    <div class="provider-card-header">
      <div>
        <p class="provider-category">
          ${escapeHtml(category)}
        </p>

        <h2 class="provider-name">
          ${escapeHtml(name)}
        </h2>
      </div>

      <span
        class="provider-status ${statusClass}"
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
        ${experience}
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

/**
 * Normaliza valores de texto.
 */
function normalizeText(
  value,
  fallback
) {
  const normalized =
    String(value ?? '').trim();

  return normalized || fallback;
}

/**
 * Normaliza rating entre 0 y 5.
 */
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

/**
 * Normaliza la experiencia.
 */
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
  } de experiencia`;
}

/**
 * Evita interpretar datos como HTML.
 */
function escapeHtml(value) {
  return String(value)
    .replaceAll(
      '&',
      '&amp;'
    )
    .replaceAll(
      '<',
      '&lt;'
    )
    .replaceAll(
      '>',
      '&gt;'
    )
    .replaceAll(
      '"',
      '&quot;'
    )
    .replaceAll(
      "'",
      '&#039;'
    );
}

/**
 * Inicialización.
 */
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
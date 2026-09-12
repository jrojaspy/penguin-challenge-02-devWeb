const providersContainer =
  document.getElementById(
    'providers-container'
  );

const providersStatus =
  document.getElementById(
    'providers-status'
  );

const categoryFilter =
  document.getElementById(
    'category-filter'
  );

const resultsCount =
  document.getElementById(
    'results-count'
  );

const providerSearch =
  document.getElementById(
    'provider-search'
  );

const clearFiltersButton =
  document.getElementById(
    'clear-filters'
  );

let allProviders = [];

function loadProviders() {
  showLoadingState();

  fetch('./data/providers.json')
    .then(function (response) {
      if (!response.ok) {
        throw new Error(
          'HTTP ' + response.status
        );
      }

      return response.json();
    })
    .then(function (providers) {
      if (!Array.isArray(providers)) {
        throw new Error(
          'La fuente de datos no contiene una lista válida.'
        );
      }

      allProviders = providers;

      populateCategoryFilter(
        allProviders
      );

      if (
        allProviders.length === 0
      ) {
        showEmptyState();

        updateResultsCount(0);

        return;
      }

      categoryFilter.disabled = false;
      providerSearch.disabled = false;
      clearFiltersButton.disabled = false;

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
    })
    .catch(function (error) {
      console.error(
        'Error loading providers:',
        error
      );

      allProviders = [];

      categoryFilter.disabled = true;
      providerSearch.disabled = true;
      clearFiltersButton.disabled = true;

      updateResultsCount(0);

      showErrorState();
    });
}

function populateCategoryFilter(
  providers
) {
  const categories = [];

  providers.forEach(function (provider) {
    const category =
      normalizeText(
        provider.category,
        ''
      );

    if (
      category &&
      categories.indexOf(
        category
      ) === -1
    ) {
      categories.push(
        category
      );
    }
  });

  categories.sort(
    function (a, b) {
      return a.localeCompare(
        b,
        'es'
      );
    }
  );

  categoryFilter.innerHTML = '';

  const allOption =
    document.createElement(
      'option'
    );

  allOption.value = 'all';

  allOption.textContent =
    'Todas las categorías';

  categoryFilter.appendChild(
    allOption
  );

  categories.forEach(
    function (category) {
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
}

function applyFilters() {
  const selectedCategory =
    categoryFilter.value;

  const searchTerm =
    normalizeSearchText(
      providerSearch.value
    );

  const filteredProviders =
    allProviders.filter(
      function (provider) {
        const matchesCategory =
          selectedCategory === 'all' ||
          provider.category ===
            selectedCategory;

        const searchableText =
          normalizeSearchText(
            [
              provider.name,
              provider.category,
              provider.location,
              provider.description
            ].join(' ')
          );

        const matchesSearch =
          searchTerm === '' ||
          searchableText.indexOf(
            searchTerm
          ) !== -1;

        return (
          matchesCategory &&
          matchesSearch
        );
      }
    );

  providersContainer.setAttribute(
    'aria-busy',
    'false'
  );

  if (
    filteredProviders.length === 0
  ) {
    providersContainer.innerHTML = '';

    showSearchEmptyState();

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

function clearFilters() {
  categoryFilter.value = 'all';

  providerSearch.value = '';

  clearStatus();

  renderProviders(
    allProviders
  );

  updateResultsCount(
    allProviders.length
  );

  providerSearch.focus();
}

function normalizeSearchText(value) {
  let normalized =
    String(value || '')
      .toLowerCase();

  if (
    typeof normalized.normalize ===
    'function'
  ) {
    normalized =
      normalized.normalize('NFD')
        .replace(
          /[\u0300-\u036f]/g,
          ''
        );
  }

  return normalized.trim();
}

function showLoadingState() {
  categoryFilter.disabled = true;
  providerSearch.disabled = true;
  clearFiltersButton.disabled = true;

  providersContainer.setAttribute(
    'aria-busy',
    'true'
  );

  providersContainer.innerHTML = '';

  resultsCount.textContent = '';

  providersStatus.innerHTML =
    '<div class="state-card state-loading">' +
      '<p class="state-title">' +
        'Cargando proveedores...' +
      '</p>' +

      '<p class="state-description">' +
        'Estamos obteniendo los servicios disponibles.' +
      '</p>' +
    '</div>';
}

function showEmptyState() {
  categoryFilter.disabled = true;
  providerSearch.disabled = true;
  clearFiltersButton.disabled = true;

  providersContainer.setAttribute(
    'aria-busy',
    'false'
  );

  providersContainer.innerHTML = '';

  providersStatus.innerHTML =
    '<div class="state-card state-empty">' +
      '<h2 class="state-title">' +
        'No hay proveedores disponibles' +
      '</h2>' +

      '<p class="state-description">' +
        'No encontramos proveedores para mostrar en este momento.' +
      '</p>' +
    '</div>';
}

function showSearchEmptyState() {
  providersStatus.innerHTML =
    '<div class="state-card state-empty">' +
      '<h2 class="state-title">' +
        'No encontramos coincidencias' +
      '</h2>' +

      '<p class="state-description">' +
        'Prueba con otro nombre, servicio o categoría.' +
      '</p>' +
    '</div>';
}

function showErrorState() {
  categoryFilter.disabled = true;
  providerSearch.disabled = true;
  clearFiltersButton.disabled = true;

  providersContainer.setAttribute(
    'aria-busy',
    'false'
  );

  providersContainer.innerHTML = '';

  providersStatus.innerHTML =
    '<div ' +
      'class="state-card state-error" ' +
      'role="alert">' +

      '<h2 class="state-title">' +
        'No pudimos cargar los proveedores' +
      '</h2>' +

      '<p class="state-description">' +
        'Ocurrió un problema al obtener la información. ' +
        'Puedes intentar nuevamente.' +
      '</p>' +

      '<button ' +
        'class="button" ' +
        'id="retry-providers" ' +
        'type="button">' +
        'Reintentar' +
      '</button>' +

    '</div>';

  const retryButton =
    document.getElementById(
      'retry-providers'
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
    count +
    ' proveedores encontrados';
}

function renderProviders(providers) {
  providersContainer.innerHTML = '';

  const fragment =
    document.createDocumentFragment();

  providers.forEach(
    function (provider) {
      fragment.appendChild(
        createProviderCard(
          provider
        )
      );
    }
  );

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
    'provider-name-' +
      rawProviderId
  );

  article.innerHTML =
    '<div class="provider-card-header">' +

      '<div>' +

        '<p class="provider-category">' +
          escapeHtml(category) +
        '</p>' +

        '<h2 ' +
          'class="provider-name" ' +
          'id="provider-name-' +
          escapeHtml(rawProviderId) +
          '">' +
          escapeHtml(name) +
        '</h2>' +

      '</div>' +

      '<span ' +
        'class="provider-status ' +
        statusClass +
        '" ' +
        'aria-label="Estado del proveedor: ' +
        escapeHtml(statusText) +
        '">' +
        escapeHtml(statusText) +
      '</span>' +

    '</div>' +

    '<p class="provider-location">' +
      escapeHtml(location) +
    '</p>' +

    '<p class="provider-description">' +
      escapeHtml(description) +
    '</p>' +

    '<div class="provider-meta">' +

      '<span ' +
        'class="provider-rating" ' +
        'aria-label="Calificación ' +
        rating.toFixed(1) +
        ' de 5">' +
        '★ ' +
        rating.toFixed(1) +
      '</span>' +

      '<span>' +
        escapeHtml(experience) +
      '</span>' +

    '</div>' +

    '<a ' +
      'class="button provider-action" ' +
      'href="./detail.html?id=' +
      providerId +
      '" ' +
      'aria-label="Ver perfil de ' +
      escapeHtml(name) +
      '">' +
      'Ver perfil' +
    '</a>';

  return article;
}

function normalizeText(
  value,
  fallback
) {
  let normalized = '';

  if (
    value !== null &&
    value !== undefined
  ) {
    normalized =
      String(value).trim();
  }

  return normalized || fallback;
}

function normalizeRating(value) {
  const rating =
    Number(value);

  if (isNaN(rating)) {
    return 0;
  }

  if (rating < 0) {
    return 0;
  }

  if (rating > 5) {
    return 5;
  }

  return rating;
}

function normalizeExperience(value) {
  const experience =
    Number(value);

  if (
    isNaN(experience) ||
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
    !resultsCount ||
    !providerSearch ||
    !clearFiltersButton
  ) {
    console.error(
      'No se encontraron los elementos necesarios para inicializar proveedores.'
    );

    return;
  }

  categoryFilter.addEventListener(
    'change',
    applyFilters
  );

  providerSearch.addEventListener(
    'input',
    applyFilters
  );

  clearFiltersButton.addEventListener(
    'click',
    clearFilters
  );

  loadProviders();
}

initProvidersPage();
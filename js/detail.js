const detailContainer =
  document.getElementById('provider-detail');

const detailStatus =
  document.getElementById('detail-status');

function loadProviderDetail() {
  showLoadingState();

  const providerId =
    getProviderIdFromUrl();

  if (providerId === null) {
    showNotFoundState(
      'No se indicó un proveedor válido.'
    );

    return;
  }

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

      const provider =
        findProviderById(
          providers,
          providerId
        );

      if (!provider) {
        showNotFoundState(
          'El proveedor solicitado no existe.'
        );

        return;
      }

      detailContainer.setAttribute(
        'aria-busy',
        'false'
      );

      clearStatus();

      renderProviderDetail(
        provider
      );
    })
    .catch(function (error) {
      console.error(
        'Error loading provider detail:',
        error
      );

      showErrorState();
    });
}

function getProviderIdFromUrl() {
  const query =
    window.location.search;

  if (!query) {
    return null;
  }

  const parameters =
    query.substring(1).split('&');

  let rawId = null;

  for (
    let i = 0;
    i < parameters.length;
    i += 1
  ) {
    const pair =
      parameters[i].split('=');

    const key =
      decodeURIComponent(
        pair[0] || ''
      );

    if (key === 'id') {
      rawId =
        decodeURIComponent(
          pair[1] || ''
        );

      break;
    }
  }

  if (!rawId) {
    return null;
  }

  const id =
    parseInt(
      rawId,
      10
    );

  if (
    isNaN(id) ||
    id <= 0
  ) {
    return null;
  }

  return id;
}

function findProviderById(
  providers,
  providerId
) {
  for (
    let i = 0;
    i < providers.length;
    i += 1
  ) {
    if (
      Number(providers[i].id) ===
      providerId
    ) {
      return providers[i];
    }
  }

  return null;
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
    name + ' | ServiPy';

  detailContainer.innerHTML =
    '<article class="provider-detail-card">' +

      '<header class="provider-detail-header">' +

        '<div>' +

          '<p class="provider-category">' +
            escapeHtml(category) +
          '</p>' +

          '<h1>' +
            escapeHtml(name) +
          '</h1>' +

          '<p class="provider-detail-location">' +
            escapeHtml(location) +
          '</p>' +

        '</div>' +

        '<span ' +
          'class="provider-status ' +
          availabilityClass +
          '" ' +
          'aria-label="Estado del proveedor: ' +
          escapeHtml(
            availabilityText
          ) +
          '">' +

          escapeHtml(
            availabilityText
          ) +

        '</span>' +

      '</header>' +

      '<section ' +
        'class="provider-detail-section" ' +
        'aria-labelledby="provider-description-title">' +

        '<h2 id="provider-description-title">' +
          'Sobre el servicio' +
        '</h2>' +

        '<p>' +
          escapeHtml(description) +
        '</p>' +

      '</section>' +

      '<section ' +
        'class="provider-detail-section" ' +
        'aria-labelledby="provider-info-title">' +

        '<h2 id="provider-info-title">' +
          'Información' +
        '</h2>' +

        '<dl class="provider-detail-list">' +

          '<div>' +
            '<dt>Calificación</dt>' +

            '<dd aria-label="Calificación ' +
              rating.toFixed(1) +
              ' de 5">' +

              '★ ' +
              rating.toFixed(1) +
              ' / 5' +

            '</dd>' +
          '</div>' +

          '<div>' +
            '<dt>Experiencia</dt>' +

            '<dd>' +
              escapeHtml(experience) +
            '</dd>' +
          '</div>' +

          '<div>' +
            '<dt>Categoría</dt>' +

            '<dd>' +
              escapeHtml(category) +
            '</dd>' +
          '</div>' +

          '<div>' +
            '<dt>Ubicación</dt>' +

            '<dd>' +
              escapeHtml(location) +
            '</dd>' +
          '</div>' +

        '</dl>' +

      '</section>' +

      renderContactSection(
        phone,
        name,
        available
      ) +

    '</article>';
}

function renderContactSection(
  phone,
  name,
  available
) {
  if (!phone) {
    return (
      '<section ' +
        'class="provider-detail-section" ' +
        'aria-labelledby="contact-title">' +

        '<h2 id="contact-title">' +
          'Contacto' +
        '</h2>' +

        '<p>' +
          'El proveedor no tiene un número ' +
          'de contacto disponible.' +
        '</p>' +

      '</section>'
    );
  }

  if (!available) {
    return (
      '<section ' +
        'class="provider-detail-section" ' +
        'aria-labelledby="contact-title">' +

        '<h2 id="contact-title">' +
          'Contacto' +
        '</h2>' +

        '<p>' +
          'Este proveedor no se encuentra ' +
          'disponible en este momento.' +
        '</p>' +

        '<p class="contact-phone">' +
          escapeHtml(
            formatPhone(phone)
          ) +
        '</p>' +

      '</section>'
    );
  }

  return (
    '<section ' +
      'class="provider-detail-section contact-section" ' +
      'aria-labelledby="contact-title">' +

      '<h2 id="contact-title">' +
        'Contacto' +
      '</h2>' +

      '<p>' +
        'Puedes contactar directamente con ' +
        escapeHtml(name) +
        '.' +
      '</p>' +

      '<a ' +
        'class="button contact-button" ' +
        'href="tel:' +
        escapeHtml(
          normalizePhoneForLink(phone)
        ) +
        '" ' +
        'aria-label="Llamar a ' +
        escapeHtml(name) +
        '">' +

        'Llamar ahora' +

      '</a>' +

      '<p class="contact-phone">' +
        escapeHtml(
          formatPhone(phone)
        ) +
      '</p>' +

    '</section>'
  );
}

function showLoadingState() {
  detailContainer.setAttribute(
    'aria-busy',
    'true'
  );

  detailContainer.innerHTML = '';

  detailStatus.innerHTML =
    '<div class="state-card state-loading">' +

      '<p class="state-title">' +
        'Cargando proveedor...' +
      '</p>' +

      '<p class="state-description">' +
        'Estamos obteniendo la información ' +
        'del profesional.' +
      '</p>' +

    '</div>';
}

function showNotFoundState(message) {
  detailContainer.setAttribute(
    'aria-busy',
    'false'
  );

  detailContainer.innerHTML = '';

  detailStatus.innerHTML =
    '<div class="state-card state-empty">' +

      '<h1 class="state-title">' +
        'Proveedor no encontrado' +
      '</h1>' +

      '<p class="state-description">' +
        escapeHtml(message) +
      '</p>' +

      '<a ' +
        'class="button" ' +
        'href="./providers.html">' +

        'Volver a proveedores' +

      '</a>' +

    '</div>';
}

function showErrorState() {
  detailContainer.setAttribute(
    'aria-busy',
    'false'
  );

  detailContainer.innerHTML = '';

  detailStatus.innerHTML =
    '<div ' +
      'class="state-card state-error" ' +
      'role="alert">' +

      '<h1 class="state-title">' +
        'No pudimos cargar el proveedor' +
      '</h1>' +

      '<p class="state-description">' +
        'Ocurrió un problema al obtener ' +
        'la información.' +
      '</p>' +

      '<button ' +
        'class="button" ' +
        'id="retry-detail" ' +
        'type="button">' +

        'Reintentar' +

      '</button>' +

    '</div>';

  const retryButton =
    document.getElementById(
      'retry-detail'
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

  if (years === 1) {
    return '1 año';
  }

  return (
    years +
    ' años'
  );
}

function normalizePhoneForLink(phone) {
  return String(phone)
    .replace(/[^\d+]/g, '');
}

function formatPhone(phone) {
  const value =
    String(phone).trim();

  if (
    value.indexOf('+595') === 0 &&
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

    return (
      country +
      ' ' +
      operator +
      ' ' +
      firstPart +
      ' ' +
      secondPart
    );
  }

  return value;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function initDetailPage() {
  if (
    !detailContainer ||
    !detailStatus
  ) {
    console.error(
      'ServiPy: no se encontraron los contenedores de detalle.'
    );

    return;
  }

  loadProviderDetail();
}

initDetailPage();
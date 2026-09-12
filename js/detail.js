var detailContainer =
  document.getElementById('provider-detail');

var detailStatus =
  document.getElementById('detail-status');

function initDetailPage() {
  if (!detailContainer || !detailStatus) {
    console.error(
      'ServiPy: no se encontraron los contenedores del detalle.'
    );

    return;
  }

  loadProviderDetail();
}

function loadProviderDetail() {
  showLoadingState();

  var providerId =
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
          'El archivo de proveedores no contiene una lista válida.'
        );
      }

      var provider =
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

      clearStatus();

      detailContainer.setAttribute(
        'aria-busy',
        'false'
      );

      renderProviderDetail(
        provider
      );
    })
    .catch(function (error) {
      console.error(
        'ServiPy detail error:',
        error
      );

      showErrorState();
    });
}

/* =========================
   Obtener ID
   ========================= */

function getProviderIdFromUrl() {
  var query =
    window.location.search;

  if (!query) {
    return null;
  }

  var parameters =
    query.substring(1).split('&');

  var rawId = null;

  for (
    var i = 0;
    i < parameters.length;
    i++
  ) {
    var pair =
      parameters[i].split('=');

    var key =
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

  var id =
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

/* =========================
   Buscar proveedor
   ========================= */

function findProviderById(
  providers,
  providerId
) {
  for (
    var i = 0;
    i < providers.length;
    i++
  ) {
    if (
      Number(providers[i].id) ===
      Number(providerId)
    ) {
      return providers[i];
    }
  }

  return null;
}

/* =========================
   Render principal
   ========================= */

function renderProviderDetail(provider) {
  var name =
    normalizeText(
      provider.name,
      'Proveedor'
    );

  var category =
    normalizeText(
      provider.category,
      'Sin categoría'
    );

  var location =
    normalizeText(
      provider.location,
      'Ubicación no informada'
    );

  var description =
    normalizeText(
      provider.description,
      'Sin descripción disponible.'
    );

  var phone =
    normalizeText(
      provider.phone,
      ''
    );

  var rating =
    normalizeRating(
      provider.rating
    );

  var experience =
    normalizeExperience(
      provider.experience
    );

  var available =
    provider.available === true;

  var availabilityText =
    available
      ? 'Disponible'
      : 'No disponible';

  var availabilityClass =
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
        'aria-labelledby="service-title">' +

        '<h2 id="service-title">' +
          'Sobre el servicio' +
        '</h2>' +

        '<p>' +
          escapeHtml(
            description
          ) +
        '</p>' +

      '</section>' +

      '<section ' +
        'class="provider-detail-section" ' +
        'aria-labelledby="info-title">' +

        '<h2 id="info-title">' +
          'Información del proveedor' +
        '</h2>' +

        '<dl class="provider-detail-list">' +

          '<div>' +
            '<dt>Calificación</dt>' +
            '<dd>' +
              '★ ' +
              rating.toFixed(1) +
              ' / 5' +
            '</dd>' +
          '</div>' +

          '<div>' +
            '<dt>Experiencia</dt>' +
            '<dd>' +
              escapeHtml(
                experience
              ) +
            '</dd>' +
          '</div>' +

          '<div>' +
            '<dt>Categoría</dt>' +
            '<dd>' +
              escapeHtml(
                category
              ) +
            '</dd>' +
          '</div>' +

          '<div>' +
            '<dt>Ubicación</dt>' +
            '<dd>' +
              escapeHtml(
                location
              ) +
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

/* =========================
   Contacto
   ========================= */

function renderContactSection(
  phone,
  name,
  available
) {
  if (!phone) {
    return (
      '<section ' +
        'class="provider-detail-section">' +

        '<h2>Contacto</h2>' +

        '<p>' +
          'No hay información de contacto disponible.' +
        '</p>' +

      '</section>'
    );
  }

  var normalizedPhone =
    normalizePhoneForLink(
      phone
    );

  var whatsappPhone =
    normalizedPhone.replace(
      '+',
      ''
    );

  if (!available) {
    return (
      '<section ' +
        'class="provider-detail-section">' +

        '<h2>Contacto</h2>' +

        '<p>' +
          'Este proveedor no se encuentra disponible en este momento.' +
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
      'class="provider-detail-section contact-section">' +

      '<h2>Contacto</h2>' +

      '<p>' +
        'Puedes contactar directamente con ' +
        escapeHtml(name) +
        '.' +
      '</p>' +

      '<div class="contact-actions">' +

        '<a ' +
          'class="button contact-button" ' +
          'href="tel:' +
          escapeHtml(
            normalizedPhone
          ) +
          '" ' +
          'aria-label="Llamar a ' +
          escapeHtml(name) +
          '">' +

          'Llamar ahora' +

        '</a>' +

        '<a ' +
          'class="button button-secondary contact-button" ' +
          'href="https://wa.me/' +
          escapeHtml(
            whatsappPhone
          ) +
          '" ' +
          'target="_blank" ' +
          'rel="noopener noreferrer" ' +
          'aria-label="Contactar por WhatsApp a ' +
          escapeHtml(name) +
          '">' +

          'WhatsApp' +

        '</a>' +

      '</div>' +

      '<p class="contact-phone">' +
        escapeHtml(
          formatPhone(phone)
        ) +
      '</p>' +

    '</section>'
  );
}

/* =========================
   Estados
   ========================= */

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
        'Estamos obteniendo la información del servicio.' +
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
        'Ocurrió un problema al obtener los detalles del servicio.' +
      '</p>' +

      '<button ' +
        'class="button" ' +
        'id="retry-detail" ' +
        'type="button">' +

        'Reintentar' +

      '</button>' +

    '</div>';

  var retryButton =
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

/* =========================
   Normalización
   ========================= */

function normalizeText(
  value,
  fallback
) {
  if (
    value === null ||
    value === undefined
  ) {
    return fallback;
  }

  var normalized =
    String(value).trim();

  return (
    normalized ||
    fallback
  );
}

function normalizeRating(value) {
  var rating =
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
  var experience =
    Number(value);

  if (
    isNaN(experience) ||
    experience < 0
  ) {
    return 'Experiencia no informada';
  }

  var years =
    Math.floor(
      experience
    );

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
    .replace(
      /[^\d+]/g,
      ''
    );
}

function formatPhone(phone) {
  var value =
    String(phone).trim();

  if (
    value.indexOf('+595') === 0 &&
    value.length >= 13
  ) {
    var country =
      value.slice(0, 4);

    var operator =
      value.slice(4, 7);

    var firstPart =
      value.slice(7, 10);

    var secondPart =
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
    .replace(
      /&/g,
      '&amp;'
    )
    .replace(
      /</g,
      '&lt;'
    )
    .replace(
      />/g,
      '&gt;'
    )
    .replace(
      /"/g,
      '&quot;'
    )
    .replace(
      /'/g,
      '&#039;'
    );
}

/* =========================
   Inicio
   ========================= */

initDetailPage();
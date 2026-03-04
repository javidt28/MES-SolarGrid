/**
 * Modern Electrical Solutions — Solar Performance Portal
 * Renders system cards from systems.js and handles slug generation
 */

(function () {
  'use strict';

  if (typeof systems === 'undefined') {
    console.error('systems.js must load before app.js');
    return;
  }

  /**
   * Generate URL slug from system name: lowercase, spaces/special to hyphen
   * @param {string} name - System name
   * @returns {string} slug
   */
  function slugFromName(name) {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  var grid = document.getElementById('systems-grid');
  if (!grid) return;

  systems.forEach(function (system) {
    var slug = slugFromName(system.name);
    var href = 'systems/' + slug + '.html';

    var card = document.createElement('article');
    card.className = 'system-card';
    card.setAttribute('role', 'listitem');

    card.innerHTML =
      '<h3 class="card-name">' + escapeHtml(system.name) + '</h3>' +
      '<p class="card-type">' + escapeHtml(system.type) + '</p>' +
      '<a href="' + escapeAttr(href) + '" class="card-cta">View dashboard</a>';

    grid.appendChild(card);
  });

  // Fade-in on scroll: when section enters viewport, reveal title and cards with stagger
  var section = grid.closest('.portfolio-section');
  if (section && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          var cards = grid.querySelectorAll('.system-card');
          for (var i = 0; i < cards.length; i++) cards[i].classList.add('is-visible');
        }
      });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.05 });
    observer.observe(section);
  } else {
    if (section) section.classList.add('is-visible');
    [].forEach.call(grid.querySelectorAll('.system-card'), function (card) {
      card.classList.add('is-visible');
    });
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function escapeAttr(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
})();

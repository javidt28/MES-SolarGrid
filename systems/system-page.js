/**
 * System detail page: reads slug, finds system, fills heading, iframe, and Open in VRM button
 */
(function () {
  'use strict';

  if (typeof systems === 'undefined') return;

  function slugFromName(name) {
    return String(name)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  var slug = (document.body && document.body.dataset && document.body.dataset.slug) || window.SYSTEM_SLUG || '';
  var system = systems.filter(function (s) { return slugFromName(s.name) === slug; })[0];

  var titleEl = document.getElementById('system-name');
  var detailsSection = document.getElementById('system-details');
  var detailsList = document.getElementById('system-details-list');
  var iframeEl = document.getElementById('vrm-iframe');
  var placeholderEl = document.getElementById('placeholder');
  var openBtn = document.getElementById('vrm-open-btn');

  var detailLabels = {
    name: 'Installation',
    type: 'System type',
    location: 'Location',
    capacity: 'Capacity',
    installDate: 'Install date',
    notes: 'Notes'
  };

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  if (system && titleEl) {
    titleEl.textContent = system.name;
    document.title = system.name + ' — Modern Electrical Solutions';

    if (detailsSection && detailsList) {
      var rows = [
        { key: 'name', value: system.name },
        { key: 'type', value: system.type },
        { key: 'location', value: system.location },
        { key: 'capacity', value: system.capacity },
        { key: 'installDate', value: system.installDate },
        { key: 'notes', value: system.notes }
      ];
      detailsList.innerHTML = '';
      rows.forEach(function (row) {
        if (!row.value) return;
        var dt = document.createElement('dt');
        dt.className = 'system-details-term';
        dt.textContent = detailLabels[row.key] || row.key;
        var dd = document.createElement('dd');
        dd.className = 'system-details-value';
        dd.textContent = row.value;
        detailsList.appendChild(dt);
        detailsList.appendChild(dd);
      });
      detailsSection.style.display = detailsList.children.length ? 'block' : 'none';
    }

    var shareUrl = system.vrm && system.vrm !== '#' ? system.vrm : '';
    var embedUrl = system.embed || shareUrl;

    if (embedUrl) {
      iframeEl.src = embedUrl;
      iframeEl.style.display = 'block';
    } else {
      placeholderEl.style.display = 'block';
    }

    if (openBtn && shareUrl) {
      openBtn.href = shareUrl;
      openBtn.style.display = 'inline-flex';
    } else if (openBtn) {
      openBtn.style.display = 'none';
    }
  } else if (titleEl) {
    titleEl.textContent = 'System not found';
    placeholderEl.style.display = 'block';
    if (openBtn) openBtn.style.display = 'none';
  }
})();

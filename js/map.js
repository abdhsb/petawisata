// Map initialization and marker management
let map;
let markersLayer;
let allDestinations = [];

// Category colors
const CATEGORY_COLORS = {
  'Pantai': '#2980b9',
  'Gunung': '#27ae60',
  'Sejarah': '#8e44ad',
  'Budaya': '#e67e22',
  'Bahari': '#16a085',
  'default': '#7f8c8d'
};

function initMap() {
  // Center on Maluku Utara
  map = L.map('map').setView([0.8, 127.8], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);

  markersLayer = L.layerGroup().addTo(map);
}

function getMarkerColor(kategoriNama) {
  return CATEGORY_COLORS[kategoriNama] || CATEGORY_COLORS['default'];
}

function createMarkerIcon(color) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 28px;
      height: 28px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30]
  });
}

function renderMarkers(destinations) {
  markersLayer.clearLayers();

  destinations.forEach(dest => {
    if (!dest.latitude || !dest.longitude) return;

    const color = getMarkerColor(dest.kategori_wisata?.nama);
    const icon = createMarkerIcon(color);

    const marker = L.marker([dest.latitude, dest.longitude], { icon })
      .addTo(markersLayer);

    marker.bindPopup(`
      <div class="popup-content">
        <h3>${dest.nama}</h3>
        <p><strong>Lokasi:</strong> ${dest.lokasi || '-'}</p>
        <p><strong>Kategori:</strong> ${dest.kategori_wisata?.nama || '-'}</p>
        <p>${dest.deskripsi ? dest.deskripsi.substring(0, 100) + '...' : ''}</p>
        <button class="btn-detail" onclick="showDetail(${dest.id})">Lihat Detail</button>
      </div>
    `);

    marker._destinasiId = dest.id;
  });
}

function flyToDestination(lat, lng) {
  map.flyTo([lat, lng], 13, { duration: 1.2 });
}

// Main application logic
let destinations = [];
let categories = [];
let currentFilter = '';
let currentSearch = '';

async function loadKategori() {
  const { data, error } = await supabase
    .from('kategori_wisata')
    .select('*')
    .order('nama');

  if (error) {
    console.error('Error loading kategori:', error);
    return;
  }

  categories = data;
  const select = document.getElementById('kategori-filter');
  data.forEach(kat => {
    const option = document.createElement('option');
    option.value = kat.id;
    option.textContent = kat.nama;
    select.appendChild(option);
  });
}

async function loadDestinasi() {
  const list = document.getElementById('destination-list');
  list.innerHTML = '<div class="loading">Memuat data...</div>';

  let query = supabase
    .from('destinasi_wisata')
    .select('*, kategori_wisata(id, nama, warna)')
    .order('nama');

  if (currentFilter) {
    query = query.eq('kategori_id', currentFilter);
  }

  if (currentSearch) {
    query = query.ilike('nama', '%' + currentSearch + '%');
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error loading destinasi:', error);
    list.innerHTML = '<div class="no-results">Gagal memuat data</div>';
    return;
  }

  destinations = data;
  renderMarkers(data);
  renderDestinationList(data);
}

function renderDestinationList(data) {
  const list = document.getElementById('destination-list');

  if (data.length === 0) {
    list.innerHTML = '<div class="no-results">Tidak ada destinasi ditemukan</div>';
    return;
  }

  list.innerHTML = '';
  data.forEach(dest => {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.dataset.id = dest.id;

    const color = dest.kategori_wisata?.warna || '#7f8c8d';
    card.innerHTML = `
      <h3>${dest.nama}</h3>
      <span class="kategori-badge" style="background: ${color}">${dest.kategori_wisata?.nama || 'Umum'}</span>
      <p class="lokasi">${dest.lokasi || '-'}</p>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.destination-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      if (dest.latitude && dest.longitude) {
        flyToDestination(dest.latitude, dest.longitude);
      }
    });

    list.appendChild(card);
  });
}

function showDetail(id) {
  const dest = destinations.find(d => d.id === id);
  if (!dest) return;

  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');

  body.innerHTML = `
    <h2>${dest.nama}</h2>
    <div class="detail-row">
      <span class="detail-label">Kategori</span>
      <span class="detail-value">${dest.kategori_wisata?.nama || '-'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Lokasi</span>
      <span class="detail-value">${dest.lokasi || '-'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Kabupaten</span>
      <span class="detail-value">${dest.kabupaten || '-'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Deskripsi</span>
      <span class="detail-value">${dest.deskripsi || '-'}</span>
    </div>
    ${dest.jam_buka ? `<div class="detail-row">
      <span class="detail-label">Jam Buka</span>
      <span class="detail-value">${dest.jam_buka}</span>
    </div>` : ''}
    ${dest.harga_tiket ? `<div class="detail-row">
      <span class="detail-label">Harga Tiket</span>
      <span class="detail-value">Rp ${Number(dest.harga_tiket).toLocaleString('id-ID')}</span>
    </div>` : ''}
  `;

  modal.classList.remove('hidden');
}

// Event listeners
document.getElementById('kategori-filter').addEventListener('change', (e) => {
  currentFilter = e.target.value;
  loadDestinasi();
});

document.getElementById('search-input').addEventListener('input', (e) => {
  currentSearch = e.target.value;
  loadDestinasi();
});

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal')) {
    document.getElementById('modal').classList.add('hidden');
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  initMap();
  await loadKategori();
  await loadDestinasi();
});

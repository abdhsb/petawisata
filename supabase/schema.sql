-- Schema for Peta Wisata Maluku Utara

-- Table: kategori_wisata
CREATE TABLE IF NOT EXISTS kategori_wisata (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  ikon VARCHAR(50),
  warna VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: destinasi_wisata
CREATE TABLE IF NOT EXISTS destinasi_wisata (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(200) NOT NULL,
  deskripsi TEXT,
  lokasi VARCHAR(200),
  kabupaten VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  kategori_id INTEGER REFERENCES kategori_wisata(id),
  jam_buka VARCHAR(100),
  harga_tiket DECIMAL(12, 2),
  foto_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed: kategori_wisata (5 rows)
INSERT INTO kategori_wisata (nama, ikon, warna) VALUES
  ('Pantai', 'beach', '#2980b9'),
  ('Gunung', 'mountain', '#27ae60'),
  ('Sejarah', 'castle', '#8e44ad'),
  ('Budaya', 'culture', '#e67e22'),
  ('Bahari', 'diving', '#16a085')
ON CONFLICT DO NOTHING;

-- Seed: destinasi_wisata (16 rows)
INSERT INTO destinasi_wisata (nama, deskripsi, lokasi, kabupaten, latitude, longitude, kategori_id, harga_tiket) VALUES
  ('Pantai Sulamadaha', 'Pantai dengan air jernih kehijauan dan pemandangan Pulau Hiri yang menakjubkan.', 'Sulamadaha', 'Ternate', 0.7875, 127.3172, 1, 10000),
  ('Pantai Jikomalamo', 'Pantai tersembunyi dengan pasir putih dan air biru yang tenang, cocok untuk snorkeling.', 'Jikomalamo', 'Ternate', 0.8243, 127.3589, 1, 5000),
  ('Gunung Gamalama', 'Gunung berapi aktif yang menjadi ikon Pulau Ternate dengan ketinggian 1715 mdpl.', 'Ternate Utara', 'Ternate', 0.8167, 127.3333, 2, 20000),
  ('Benteng Oranje', 'Benteng peninggalan Belanda yang dibangun tahun 1607, menjadi saksi sejarah perdagangan rempah.', 'Ternate Tengah', 'Ternate', 0.7956, 127.3844, 3, 15000),
  ('Benteng Tolukko', 'Benteng sejarah abad ke-16 dengan pemandangan laut yang indah dari ketinggian.', 'Tolukko', 'Ternate', 0.8356, 127.3972, 3, 10000),
  ('Danau Laguna', 'Danau vulkanik berwarna biru toska yang terbentuk di kawah bekas letusan Gunung Gamalama.', 'Ngade', 'Ternate', 0.7619, 127.3556, 2, 10000),
  ('Pantai Bobane Ici', 'Pantai berpasir hitam vulkanik yang unik dengan ombak tenang dan pemandangan senja yang indah.', 'Halmahera Barat', 'Halmahera Barat', 0.9012, 127.5234, 1, 5000),
  ('Pulau Maitara', 'Pulau kecil yang terkenal sebagai gambar latar uang Rp 1000, dengan pantai berpasir putih.', 'Selat Ternate-Tidore', 'Tidore Kepulauan', 0.7234, 127.4012, 5, 25000),
  ('Kedaton Sultan Ternate', 'Istana kesultanan yang menyimpan koleksi benda pusaka dan sejarah kesultanan Ternate.', 'Ternate Tengah', 'Ternate', 0.7989, 127.3801, 3, 20000),
  ('Pantai Matinta', 'Pantai dengan pasir putih bersih dan air jernih, populer untuk wisata keluarga.', 'Morotai Selatan', 'Pulau Morotai', 2.3456, 128.2567, 1, 5000),
  ('Situs PD II Morotai', 'Peninggalan Perang Dunia II berupa senjata, pesawat, dan bunker yang terendam air.', 'Daruba', 'Pulau Morotai', 2.3178, 128.2901, 3, 30000),
  ('Taman Nasional Aketajawe', 'Kawasan hutan hujan tropis yang kaya biodiversitas dengan berbagai spesies endemik Halmahera.', 'Halmahera Tengah', 'Halmahera Tengah', 0.5623, 128.0234, 2, 25000),
  ('Pantai Dodola', 'Dua pulau yang terhubung saat air surut dengan pantai berpasir putih yang eksotis di Morotai.', 'Morotai', 'Pulau Morotai', 2.4012, 128.3456, 1, 15000),
  ('Keraton Tidore', 'Istana kesultanan Tidore yang menyimpan sejarah panjang rempah-rempah dan kolonialisme.', 'Tidore', 'Tidore Kepulauan', 0.6934, 127.4256, 3, 15000),
  ('Gunung Tidore', 'Gunung berapi di Pulau Tidore dengan jalur pendakian menantang dan pemandangan Ternate.', 'Tidore', 'Tidore Kepulauan', 0.6845, 127.4123, 2, 20000),
  ('Pulau Widi', 'Kepulauan terpencil di Halmahera Selatan dengan terumbu karang yang masih alami dan jernih.', 'Halmahera Selatan', 'Halmahera Selatan', -0.8945, 128.1567, 5, 50000)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE kategori_wisata ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinasi_wisata ENABLE ROW LEVEL SECURITY;

-- Policy: allow public read
CREATE POLICY "Public read kategori" ON kategori_wisata FOR SELECT USING (true);
CREATE POLICY "Public read destinasi" ON destinasi_wisata FOR SELECT USING (true);

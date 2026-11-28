[v1.0.0] - Sprint 4 (P12)
Ditambahkan
Penyimpanan aman (Safe Storage) menggunakan kunci berversi (cumalator:data:v1 dan cumalator:history:v1) yang dilindungi blok try/catch.
Fitur Ekspor JSON untuk mengunduh cadangan daftar mata kuliah dan riwayat perhitungan IPK.
Dokumentasi teknis lengkap (docs/MODULE_MAP.md, docs/DEBUG_LOG.md, docs/ROADMAP.md, dan README.md).
Kit demo (demo-kit.js): panel Isi contoh / Reset, pengatur waktu, dan banner kesalahan. Aktif hanya jika alamat berakhiran ?demo=1. Berkas disalin dari lampiran modul Demo Akhir TB033109.
Diubah & Diperbaiki
Saat penyimpanan kosong, aplikasi kini dimulai dari satu baris mata kuliah kosong (sebelumnya terisi 3 mata kuliah contoh).
Menyelaraskan seluruh selector DOM di src/main.js dengan elemen antarmuka pada index.html.
Merombak render baris tabel dan riwayat di src/ui.js menggunakan document.createElement dan textContent untuk mencegah potensi kerentanan XSS (innerHTML).
Menghapus berkas skrip monolitik lama (src/script.js) setelah seluruh fitur berhasil dimigrasikan ke arsitektur ES6 Modules.
[v0.3.0] - Sprint 3 (P11)
Diubah
Memecah kode aplikasi menjadi arsitektur modular ES6 (src/state.js, src/ui.js, dan src/main.js).
[v0.2.0] - Sprint 2 (P10)
Diperbaiki
Perbaikan tata letak responsif input SKS dan pilihan nilai pada layar 400px (BUG-PROJ-01).
Penambahan aset identitas visual assets/logo-cumalator.svg dan favicon pada halaman utama (BUG-PROJ-02).
[v0.1.0] - Sprint 1 (P09)
Ditambahkan
Inisialisasi repositori, Project Charter, Roadmap, dan integrasi antarmuka Bootstrap 5.3.3.
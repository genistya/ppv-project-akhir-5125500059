# Peta Modul (MODULE_MAP) — CUMALATOR

## 1. Struktur Impor & Hierarki
- `index.html` -> memuat `src/main.js` sebagai satu-satunya *entry point* (`type="module"`)
- `src/main.js` -> mengimpor `src/state.js` dan `src/ui.js`
- `src/ui.js` -> mengimpor konstanta `BOBOT_NILAI` dari `src/state.js` (fokus pada manipulasi DOM aman)
- `src/state.js` -> murni logika data, perhitungan IPK, dan *Safe Storage* (bebas dependensi DOM)

## 2. Tanggung Jawab Modul (*Single Responsibility*)
- **`src/main.js`**: Titik masuk utama aplikasi; menangani *event listener* form, navigasi antar-tampilan (*Kalkulator / Panduan Nilai / Tentang*), efek suara (*Web Audio API*), serta koordinasi antara `state` dan `ui`.
- **`src/state.js`**: Mengelola konstanta `BOBOT_NILAI`, validasi serta kalkulasi rumus IPK/SKS, dan penyimpanan aman (`simpanAman` / `muatAman` dengan kunci berversi `v1` dan blok `try/catch`).
- **`src/ui.js`**: Membuat komponen DOM secara aman menggunakan `document.createElement` dan `textContent` (`buatBarisMatkul` dan `renderDaftarRiwayat`), mengatur *tooltip* bobot nilai, serta menangani animasi antarmuka.
- **`src/ui-pustaka.js`**: Pembungkus fungsi pembantu (*helper*) untuk komponen modal Bootstrap 5.3.3.

## 3. Aset Statis di Luar Modul ES6
- **`src/style.css`**: Berkas gaya kustom pelengkap Bootstrap 5.3.3 yang dimuat langsung melalui tag `<link rel="stylesheet">` di `index.html`.
- **`assets/logo-cumalator.svg` & `assets/manifest.json`**: Aset identitas visual dan konfigurasi *web manifest*.
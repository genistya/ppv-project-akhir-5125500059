# CUMALATOR

Aplikasi kalkulator IPK berbasis web untuk membantu mahasiswa menghitung dan memantau hasil akademik secara cepat, akurat, dan terstruktur.

## Masalah
Mahasiswa sering kesulitan menghitung perkiraan IPK secara cepat dan akurat apabila harus mencatat serta menghitung bobot SKS secara manual.

## Fitur Utama
- **Perhitungan IPK Otomatis**: Menghitung IPK berdasarkan jumlah SKS dan skala nilai huruf (`A` hingga `E`).
- **Penyimpanan Lokal Aman (*Safe Storage*)**: Data mata kuliah dan riwayat perhitungan tersimpan otomatis di `localStorage` dengan kunci berversi (`v1`) serta penanganan error (`try/catch`).
- **Riwayat Perhitungan IPK**: Menyimpan hingga 20 riwayat perhitungan terakhir lengkap dengan waktu dan total SKS.
- **Antarmuka Multi-Tampilan (*Single Page View*)**: Navigasi cepat antara halaman *Kalkulator*, *Panduan Nilai*, dan *Tentang*.
- **Interaktivitas & Aksesibilitas**: Dilengkapi *tooltip* bobot nilai saat kursor diarahkan, efek suara (*Web Audio API*), validasi input, dan animasi yang menghormati pengaturan `prefers-reduced-motion`.

## Cara Menjalankan
Karena proyek ini menggunakan **ES6 Modules**, jalankan melalui server lokal agar tidak terkena pembatasan CORS browser:
1. Unduh atau *clone* repositori ini.
2. Buka folder proyek menggunakan **Visual Studio Code**.
3. Klik kanan pada `index.html` lalu pilih **Open with Live Server** (atau jalankan `python -m http.server` di terminal).
4. Buka alamat lokal yang muncul di browser (misalnya `http://127.0.0.1:5500`).

## Dokumentasi
- [Project Charter](docs/CHARTER.md)
- [Roadmap Pengembangan](docs/ROADMAP.md)
- [Peta Modul (Module Map)](docs/MODULE_MAP.md)
- [Catatan Debugging (Debug Log)](docs/DEBUG_LOG.md)
- [Daftar Dependensi](DEPENDENCIES.md)

## Struktur Folder
- `index.html` — Struktur utama halaman web dan navigasi tampilan
- `src/` — Kode sumber modular aplikasi:
  - `main.js` — Pengendali utama (*entry point*), navigasi, dan *event listener*
  - `state.js` — Manajemen data, logika perhitungan IPK, dan *Safe Storage*
  - `ui.js` — Pembuatan komponen DOM secara aman (`createElement` & `textContent`), animasi, dan *tooltip*
  - `style.css` — Gaya kustom pelengkap Bootstrap 5
- `assets/` — Logo aplikasi (`logo-cumalator.svg`) dan `manifest.json`
- `docs/` — Dokumentasi perencanaan, arsitektur modul, dan catatan *debugging*

## Catatan Penggunaan AI
Asisten AI (Gemini) digunakan sebagai rekan diskusi dan pembimbing selama proses pengembangan untuk membantu:
- Audit struktur proyek dan sinkronisasi ID antara `index.html` dengan modul JavaScript.
- Pemisahan (*refactoring*) kode ke dalam arsitektur ES6 Modules (`main.js`, `state.js`, `ui.js`), penerapan *Safe Storage* (`try/catch`), serta render DOM aman tanpa `innerHTML`.
- Penyusunan dan penyelarasan dokumentasi teknis proyek untuk Sprint 4.
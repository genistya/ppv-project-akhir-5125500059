CUMALATOR

Aplikasi kalkulator IPK berbasis web untuk membantu mahasiswa menghitung dan memantau hasil akademik secara cepat, akurat, dan terstruktur.

Masalah

Mahasiswa sering kesulitan menghitung perkiraan IPK secara cepat dan akurat apabila harus mencatat serta menghitung bobot SKS secara manual.

Fitur Utama
Perhitungan IPK Otomatis: Menghitung IPK berdasarkan jumlah SKS dan skala nilai huruf (A, A-, B+, B, B-, C+, C, D, E).
Penyimpanan Lokal Aman (Safe Storage): Data mata kuliah dan riwayat perhitungan tersimpan otomatis di localStorage dengan kunci berversi (v1) serta penanganan error (try/catch).
Riwayat Perhitungan IPK: Menyimpan hingga 20 riwayat perhitungan terakhir lengkap dengan waktu dan total SKS.
Antarmuka Multi-Tampilan (Single Page View): Navigasi cepat antara halaman Kalkulator, Panduan Nilai, dan Tentang.
Interaktivitas & Aksesibilitas: Dilengkapi tooltip bobot nilai saat kursor diarahkan, efek suara (Web Audio API), validasi input, dan animasi yang menghormati pengaturan prefers-reduced-motion.
Cara Menjalankan

Karena proyek ini menggunakan ES6 Modules, jalankan melalui server lokal agar tidak terkena pembatasan CORS browser:

Unduh atau clone repositori ini.
Buka folder proyek menggunakan Visual Studio Code.
Klik kanan pada index.html lalu pilih Open with Live Server (atau jalankan python -m http.server di terminal).
Buka alamat lokal yang muncul di browser (misalnya http://127.0.0.1:5500).
Mode Demo

Buka aplikasi dengan alamat berakhiran ?demo=1 (misalnya http://127.0.0.1:5500/index.html?demo=1). Panel di pojok kanan atas menyediakan pengatur waktu (oranye di menit ke-5, merah di menit ke-7), tombol Isi contoh (6 mata kuliah, IPK 3,67), dan tombol Reset. Kesalahan di aplikasi tampil sebagai banner dengan tombol Muat ulang. Tanpa ?demo=1 panel tidak muncul.

Dokumentasi
Project Charter
Roadmap Pengembangan
Konsep Produk (Tugas 7)
Peta Modul (Module Map)
Catatan Debugging (Debug Log)
Daftar Dependensi
Struktur Folder
index.html — Struktur utama halaman web dan navigasi tampilan
src/ — Kode sumber modular aplikasi:
main.js — Pengendali utama (entry point), navigasi, dan event listener
state.js — Manajemen data, logika perhitungan IPK, dan Safe Storage
ui.js — Pembuatan komponen DOM secara aman (createElement & textContent), animasi, dan tooltip
style.css — Gaya kustom pelengkap Bootstrap 5
demo-kit.js — Kit demo (panel, pengatur waktu, penangkap kesalahan); dimuat sebagai skrip biasa sebelum main.js
assets/ — Logo aplikasi (logo-cumalator.svg) dan manifest.json
docs/ — Dokumentasi perencanaan, arsitektur modul, dan catatan debugging
Kode dari Sumber Lain
demo-kit.js: disalin dari lampiran modul Demo Akhir — Presentasi Prototipe sebagai Produk Digital (TB033109, dosen pengampu Aji Sapta Pramulen, S.T., M.T.). Isinya tidak diubah; hanya diformat ulang. Konfigurasi window.DEMO_KIT (kunci penyimpanan dan isiContoh) ditulis sendiri di index.html.
Bootstrap 5.3.3: dimuat dari CDN jsDelivr (lihat DEPENDENCIES.md).
Catatan Penggunaan AI

Asisten AI (Gemini) digunakan sebagai rekan diskusi dan pembimbing selama proses pengembangan untuk membantu:

Audit struktur proyek dan sinkronisasi ID antara index.html dengan modul JavaScript.
Pemisahan (refactoring) kode ke dalam arsitektur ES6 Modules (main.js, state.js, ui.js), penerapan Safe Storage (try/catch), serta render DOM aman tanpa innerHTML.
Penyusunan dan penyelarasan dokumentasi teknis proyek untuk Sprint 4.

Asisten AI (Claude) digunakan pada tahap demo akhir untuk memasang demo-kit.js dan DEMO_KIT.isiContoh di index.html, mengubah init() di src/main.js agar dimulai dari satu baris kosong, serta merapikan README.md, CHANGELOG.md, dan docs/ROADMAP.md.

Kontrak Komponen dan Penyimpanan
state.js › STORAGE_KEY & HISTORY_KEY: Kunci berversi 'cumalator:data:v1' dan 'cumalator:history:v1'.
state.js › muatDaftarMatkul() & muatRiwayat(): Membaca localStorage dalam blok try/catch, menyaring elemen yang tidak valid, dan mengembalikan array kosong jika data rusak atau penyimpanan diblokir.
state.js › simpanDaftarMatkul(data) & tambahRiwayat(ipk, totalSks): Menyimpan data JSON ke localStorage dengan try/catch tanpa melempar galat saat kuota penuh.
ui.js › buatBarisMatkul({ nama, sks, nilai, onSimpan, onTambahBaris, tooltipEl }): Mengembalikan elemen <tr> (HTMLElement) berisi input mata kuliah, SKS, pilihan nilai, dan tombol hapus; seluruh nilai teks pengguna diatur melalui .value dan .textContent (bebas dari innerHTML).
ui.js › renderDaftarRiwayat(riwayat, containerEl): Merender daftar riwayat perhitungan menggunakan document.createElement dan textContent.
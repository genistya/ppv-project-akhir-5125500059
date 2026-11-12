# DEBUG LOG - CUMALATOR

## SPRINT 2

### BUG-PROJ-01: Teks Input SKS dan Pilihan Nilai Terpotong pada Tampilan Layar HP (400px)
- **Gejala:** Waktu diuji di layar HP (lebar 400px), angka SKS yang diketik tidak terlihat dan dropdown pilihan Nilai gepeng sampai teks nilainya terpotong.
- **Langkah Reproduksi:** Buka DevTools, aktifkan mode layar mobile (400px), tambah mata kuliah, lalu ketik angka SKS dan pilih Nilai.
- **Hipotesis 1:** Warna font input sama dengan warna background. (GUGUR - warna teks tetap gelap)
- **Hipotesis 2:** Elemen `<input type="number">` dan `<select>` tidak memiliki batas `min-width` di CSS, jadi menyusut karena terdesak kolom nama mata kuliah di grid mobile. (TERBUKTI)
- **Bukti DevTools:** Inspeksi elemen di tab Elements menunjukkan lebar computed input SKS mengecil sampai di bawah 30px sehingga teks terdorong keluar.
- **Perbaikan:** Edit `src/style.css` dengan menambahkan batas `min-width: 70px` pada input SKS dan `min-width: 95px` pada select nilai, serta memastikan tabel terbungkus `.table-responsive`.
- **Uji Ulang:** Tampilan mobile diuji lagi pada lebar 400px, angka SKS dan pilihan nilai sekarang sudah kelihatan jelas dan bisa dibaca.

### BUG-PROJ-02: Aset Logo dan Favicon Belum Tampil di Header Aplikasi
- **Gejala:** Tab browser dan bagian header navbar tidak menampilkan logo CUMALATOR (hanya teks polos dan ikon dokumen standar browser).
- **Langkah Reproduksi:** Buka aplikasi di browser, cek tab browser bagian atas dan area header.
- **Hipotesis 1:** Tag `<link rel="icon">` sudah ada tapi path filenya salah. (GUGUR - tag belum ada di HTML)
- **Hipotesis 2:** File gambar logo belum dibuat di folder `assets/` dan belum dihubungkan ke `index.html`. (TERBUKTI)
- **Bukti DevTools:** Tab Network menunjukkan tidak ada request pemanggilan aset gambar logo saat halaman di-load.
- **Perbaikan:** Buat file `assets/logo-cumalator.svg`, lalu hubungkan di `index.html` pada bagian `<head>` dan elemen `<header>`.
- **Uji Ulang:** Refresh halaman, logo CUMALATOR muncul di navbar dan favicon otomatis tampil di tab browser tanpa error 404.

---

## SPRINT 4

### BUG-PROJ-03: Ketidaksesuaian ID Elemen HTML dengan Modul JavaScript (`main.js`) Setelah Refactoring
- **Gejala:** Setelah pemecahan modul ke `src/main.js`, tombol **+ Tambah Matkul**, **Hitung IPK**, **Reset Data**, serta navigasi tab tidak merespons saat diklik.
- **Langkah Reproduksi:** Buka `index.html` via Live Server, lalu klik tombol **+ Tambah Matkul** atau **Hitung IPK**.
- **Hipotesis 1:** File `src/main.js` gagal dimuat karena kesalahan path relatif. (GUGUR - file termuat di tab Network dengan status 200)
- **Hipotesis 2:** `src/main.js` masih mereferensikan ID lama (`form-matkul`, `tbody-matkul`) sedangkan `index.html` menggunakan `ipkForm` dan `tableBody`, serta logika utama masih tertinggal di `src/script.js`. (TERBUKTI)
- **Bukti DevTools:** Evaluasi `document.getElementById('form-matkul')` di Console menghasilkan `null`.
- **Perbaikan:** Menyelaraskan selector DOM di `src/main.js` dengan `index.html`, memindahkan seluruh logika ke arsitektur ES6 Modules (`state.js`, `ui.js`, `main.js`), serta menghapus berkas lama `src/script.js`.
- **Uji Ulang:** Seluruh tombol aksi, kalkulasi IPK, penyimpanan otomatis, dan perpindahan tab berfungsi normal tanpa error di Console.

### BUG-PROJ-04: Potensi Kerentanan XSS pada Render Tabel Menggunakan `innerHTML`
- **Gejala:** Input nama mata kuliah yang mengandung karakter khusus HTML dirender menggunakan *template string* ke `innerHTML` di `src/ui.js`, berisiko mengeksekusi tag HTML berbahaya.
- **Langkah Reproduksi:** Masukkan string `<img src=x onerror=alert(1)>` pada kolom nama mata kuliah lalu simpan/render ulang.
- **Hipotesis 1:** Bootstrap otomatis melakukan sanitasi pada elemen input di dalam tabel. (GUGUR - Bootstrap tidak men-sanitasi string yang disisipkan lewat `innerHTML`)
- **Hipotesis 2:** Penggunaan `innerHTML` mem-parsing string mentah dari pengguna sebagai node HTML. (TERBUKTI)
- **Bukti DevTools:** Tab Elements menampilkan tag `<input>` dan baris tabel disisipkan sebagai HTML mentah alih-alih properti nilai teks aman.
- **Perbaikan:** Mengubah komponen `buatBarisMatkul` dan `renderDaftarRiwayat` di `src/ui.js` agar membangun elemen sepenuhnya melalui `document.createElement` dan `textContent` / `.value`.
- **Uji Ulang:** Input berisi tag HTML diperlakukan murni sebagai teks biasa dan tidak dieksekusi oleh browser.
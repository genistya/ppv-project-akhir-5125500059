# DEBUG LOG - CUMALATOR (SPRINT 2)

## BUG-PROJ-01: Teks Input SKS dan Pilihan Nilai Terpotong pada Tampilan Layar HP (400px)
- **Gejala:** Waktu diuji di layar HP (lebar 400px), angka SKS yang diketik tidak terlihat dan dropdown pilihan Nilai gepeng sampai teks nilainya terpotong.
- **Langkah Reproduksi:** Buka DevTools, aktifkan mode layar mobile (400px), tambah mata kuliah, lalu ketik angka SKS dan pilih Nilai.
- **Hipotesis 1:** Warna font input sama dengan warna background. (GUGUR - warna teks tetap gelap)
- **Hipotesis 2:** Elemen `<input type="number">` dan `<select>` tidak memiliki batas `min-width` di CSS, jadi menyusut karena terdesak kolom nama mata kuliah di grid mobile. (TERBUKTI)
- **Bukti DevTools:** Inspeksi elemen di tab Elements menunjukkan lebar computed input SKS mengecil sampai di bawah 30px sehingga teks terdorong keluar.
- **Perbaikan:** Edit `src/style.css` dengan menambahkan batas `min-width: 70px` pada input SKS dan `min-width: 95px` pada select nilai, serta memastikan tabel terbungkus `.table-responsive`.
- **Uji Ulang:** Tampilan mobile diuji lagi pada lebar 400px, angka SKS dan pilihan nilai sekarang sudah kelihatan jelas dan bisa dibaca.

## BUG-PROJ-02: Aset Logo dan Favicon Belum Tampil di Header Aplikasi
- **Gejala:** Tab browser dan bagian header navbar tidak menampilkan logo CUMALATOR (hanya teks polos dan ikon dokumen standar browser).
- **Langkah Reproduksi:** Buka aplikasi di browser, cek tab browser bagian atas dan area header.
- **Hipotesis 1:** Tag `<link rel="icon">` sudah ada tapi path filenya salah. (GUGUR - tag belum ada di HTML)
- **Hipotesis 2:** File gambar logo belum dibuat di folder `assets/` dan belum dihubungkan ke `index.html`. (TERBUKTI)
- **Bukti DevTools:** Tab Network menunjukkan tidak ada request pemanggilan aset gambar logo saat halaman di-load.
- **Perbaikan:** Buat file `assets/logo-cumalator.svg`, lalu hubungkan di `index.html` pada bagian `<head>` dan elemen `<header>`.
- **Uji Ulang:** Refresh halaman, logo CUMALATOR muncul di navbar dan favicon otomatis tampil di tab browser tanpa error 404.
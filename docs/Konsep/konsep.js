const KONSEP = {
  nama: 'CUMALATOR',
  tagline: 'Hitung dan pantau IPK-mu dalam hitungan menit, tanpa rumus manual.',

  persona: {
    nama: 'Tari, 20 tahun',
    siapa: 'Mahasiswa semester 3 D3 Multimedia dan Broadcasting dengan jadwal praktikum padat.',
    keseharian: 'Mengelola nilai mata kuliah di sela-sela pengerjaan tugas proyek media, sering dari laptop atau ponsel saat jeda antar praktikum.',
    masalah: 'Ribet menghitung IPK dengan kalkulator biasa atau membuat rumus spreadsheet dari nol setiap kali ingin mensimulasikan nilai.',
  },

  masalah: 'Tari harus menghitung IPK secara manual dengan kalkulator biasa atau membuat rumus spreadsheet dari nol setiap kali ingin mensimulasikan nilai. Setiap mata kuliah punya SKS dan bobot huruf berbeda, sehingga hitungan mudah salah. Akibatnya ia sulit memperkirakan IPK sebelum semester berakhir dan salah menentukan strategi perbaikan nilai.',

  solusi: 'CUMALATOR menghitung IPK otomatis dari SKS dan nilai huruf setiap mata kuliah di satu halaman web. Data dan riwayat perhitungan tersimpan di peramban, sehingga bisa dilanjutkan tanpa membuat akun. Pengguna juga bisa mengunduh cadangan datanya dalam bentuk JSON.',

  fitur: [
    { nama: 'Input SKS dan nilai huruf per mata kuliah', prioritas: 'wajib', alasan: 'Data dasar untuk hitungan; tanpa ini Tari kembali ke rumus manual. Sudah jadi: commit b5d0716.' },
    { nama: 'Hitung IPK otomatis', prioritas: 'wajib', alasan: 'Menjawab masalah inti: IPK = total (SKS × bobot) ÷ total SKS. Sudah jadi: commit b5d0716, dipecah ke modul state.js di 53f0e28.' },
    { nama: 'Tambah dan hapus baris mata kuliah', prioritas: 'wajib', alasan: 'Jumlah mata kuliah tiap semester berbeda dan Tari perlu mencoba skenario nilai. Sudah jadi: commit b5d0716, komponen buatBarisMatkul di 8effc6a.' },

    { nama: 'Simpan otomatis di peramban (localStorage berversi v1)', prioritas: 'sebaiknya', alasan: 'Tari tidak perlu mengetik ulang, tetapi hitungan tetap bisa dipakai tanpa fitur ini. Sudah jadi: commit 8effc6a.' },
    { nama: 'Riwayat 20 perhitungan terakhir', prioritas: 'sebaiknya', alasan: 'Membantu membandingkan simulasi, bukan syarat untuk mendapat IPK. Sudah jadi: commit 8effc6a.' },
    { nama: 'Ekspor data ke JSON', prioritas: 'sebaiknya', alasan: 'Antisipasi data hilang saat cache dibersihkan (risiko 1 di charter). Sudah jadi: commit 8effc6a.' },
    { nama: 'Panduan bobot nilai', prioritas: 'sebaiknya', alasan: 'Membantu Tari memahami angka yang dipakai (Could Have di charter). Sudah jadi: commit b5d0716.' },

    { nama: 'Login dan basis data server', prioritas: 'belum', alasan: 'Tidak menguji nilai utama dan menambah hambatan pendaftaran; tetap Won\'t seperti di charter P09.' },
    { nama: 'Simulasi target IPK (nilai yang dibutuhkan semester depan)', prioritas: 'belum', alasan: 'Fitur menarik dan relevan dengan strategi perbaikan nilai, tetapi sengaja ditunda agar hitung IPK dulu terbukti dipakai.' },
  ],

  pembanding: [
    {
      nama: 'Kalkulator IPK — howmanywords.app',
      kelebihan: 'Gratis, tanpa akun, daftar mata kuliah tersimpan di peramban, ada perencana target IPK dan mode 4.0 maupun 5.0.',
      kekurangan: 'Pilihan nilai gaya AS (A+, C-, D+, F) dan mode honors/AP; halaman tidak menyebut riwayat perhitungan maupun ekspor data.',
    },
    {
      nama: 'Kalkulator Nilai Rata-rata IPK — MiniWebtool',
      kelebihan: 'Mendukung banyak sistem nilai (AS, Kanada, Australia, India, Inggris) dan menampilkan perhitungan langkah demi langkah.',
      kekurangan: 'Dibiayai iklan; halaman tidak menyebut penyimpanan data, riwayat, atau ekspor; skala disesuaikan negara lain, bukan skala kampus Indonesia.',
    },
  ],

  pembeda: 'Skala nilai dan panduan bobot mengikuti skala kampus (A sampai E), seluruhnya berbahasa Indonesia, tanpa iklan dan tanpa akun, dan menyimpan riwayat perhitungan serta cadangan JSON yang tidak disebutkan pada kedua pembanding.',
};
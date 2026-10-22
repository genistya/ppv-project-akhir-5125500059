# PROJECT CHARTER — CUMALATOR

## 1. Masalah yang Diselesaikan
Mahasiswa sering kesulitan memprediksi dan memantau perolehan IPK secara cepat dan efisien sebelum semester berakhir, sehingga sering salah memperkirakan strategi perbaikan nilai.

## 2. Pengguna Sasaran & Persona
- **Nama Persona**: Tari (20 tahun)
- **Profil**: Mahasiswa semester 3 D3 Multimedia dan Broadcasting dengan jadwal praktikum padat.
- **Keseharian**: Sering mengelola nilai mata kuliah di sela-sela pengerjaan tugas proyek media.
- **Masalah Utama**: Merasa ribet jika harus menghitung IPK secara manual memakai kalkulator biasa atau membuat rumus spreadsheet dari nol setiap kali ingin simulasi nilai.

## 3. Fitur MVP (MoSCoW)
- **Must Have**:
  - Input jumlah SKS dan pilihan nilai huruf untuk setiap mata kuliah.
  - Perhitungan otomatis total SKS, total bobot, dan hasil akhir IPK.
  - Tambah dan hapus baris mata kuliah secara dinamis.
- **Should Have**:
  - Penyimpanan otomatis data input dan riwayat hasil perhitungan di penyimpanan lokal browser (`localStorage`).
- **Could Have**:
  - Tampilan tabel panduan bobot nilai akademik dan transisi halaman interaktif.
- **Won't Have (Sengaja Tidak Dibuat di MVP)**:
  - Fitur login/autentikasi pengguna dan integrasi server basis data (fokus utama adalah alat kalkulator cepat tanpa hambatan pendaftaran akun).

## 4. Kriteria Sukses Terukur
- Pengguna baru dapat memasukkan minimal 5 mata kuliah dan melihat hasil perhitungan IPK dalam waktu **≤ 1,5 menit** tanpa membutuhkan panduan/bantuan.

## 5. Analisis Risiko & Antisipasi
1. **Risiko**: Data input atau riwayat hilang ketika pengguna membersihkan *cache/cookies* browser.
   - *Antisipasi*: Memberikan opsi ekspor data JSON atau peringatan di indikator simpan.
2. **Risiko**: Pengguna salah memasukkan format input SKS (misal: SKS bernilai negatif atau nol).
   - *Antisipasi*: Menggunakan atribut validasi HTML (`type="number"`, `min="1"`, `max="6"`).
3. **Risiko**: Tampilan tabel acak-acakan saat dibuka di layar HP yang sempit.
   - *Antisipasi*: Membungkus tabel dengan komponen `table-responsive` dari Bootstrap.
# Project Charter — CUMALATOR

## Masalah
Setelah nilai semester keluar di portal kampus, mahasiswa menghitung IPK
sendiri dengan kalkulator atau kertas. Perhitungan manual itu sering salah
(bobot nilai tertukar, SKS terlewat), dan kesalahannya baru ketahuan belakangan.

## Pengguna sasaran
Amoy, mahasiswa D3 semester 3. Setiap nilai semester keluar, ia membuka
portal kampus lalu menghitung IPK-nya sendiri di kalkulator HP: mengalikan
SKS dengan bobot tiap nilai satu per satu. Ia sering lupa bobot nilai
tertentu dan salah menjumlah, sehingga ragu apakah angkanya benar. Ia
membutuhkan IPK yang pasti sebelum mengurus syarat beasiswa dan KRS.

## Fitur MVP (MoSCoW)
| Fitur | Prioritas |
|---|---|
| Hitung IPK dari SKS dan nilai tiap mata kuliah | Must |
| Tambah dan ubah daftar mata kuliah | Must |
| Simpan data otomatis di browser | Should |
| Riwayat perhitungan IPK | Should |
| Halaman panduan bobot nilai | Could |
| Login dan tarik nilai otomatis dari portal kampus | **Won't** (belum menguji nilai utama) |

## Kriteria sukses
- Pengguna baru menghitung IPK 5 mata kuliah dalam ≤ 2 menit tanpa bantuan.
- Hasil aplikasi sama dengan hitungan manual pada 5 dari 5 contoh uji.
- Seluruh alur utama bisa dipakai di layar ±400 px.

## Risiko dan antisipasi
| Risiko | Antisipasi |
|---|---|
## Risiko dan antisipasi
| Risiko | Antisipasi |
|---|---|
| Skala nilai aplikasi (ada B-, C+; A- = 3,7; B+ = 3,3) berbeda dengan kampus (ada AB, BC; A- = 3,75; B+ = 3,25), sehingga IPK tidak sama dengan portal | Sesuaikan daftar nilai dan bobot dengan aturan kampus (Sprint P10) |
| Data hilang saat cache browser dibersihkan | Tambah ekspor data (Sprint P12) |
| Input tidak valid (SKS kosong atau nama mengandung karakter aneh) | Perketat validasi dan escape input (Sprint P10) |